import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Pacman game for the virtual mall (store 1.2.0).
 * Inspired by https://github.com/platzhersh/pacman-canvas (MIT).
 * Self-contained React + HTML5 canvas implementation.
 */

// 0 = empty, 1 = wall, 2 = dot, 3 = power pellet, 4 = ghost spawn, 5 = pacman spawn
const RAW_MAZE = [
  "1111111111111111111111",
  "1322222222112222222231",
  "1211112112112112111121",
  "1211112112112112111121",
  "1222222222222222222221",
  "1211211111111111121121",
  "1222112222112222112221",
  "1112112112002112112111",
  "0002112222442222112000",
  "1111112110000112111111",
  "0000002104440012000000",
  "1111112110000112111111",
  "0002112222552222112000",
  "1112112112112112112111",
  "1222112222112222112221",
  "1211211111111111121121",
  "1222222222222222222221",
  "1211112112112112111121",
  "1211112112112112111121",
  "1322222222222222222231",
  "1111111111111111111111",
];

const ROWS = RAW_MAZE.length;
const COLS = RAW_MAZE[0].length;
const CELL = 22;
const W = COLS * CELL;
const H = ROWS * CELL;

type Dir = { x: number; y: number };
const DIRS: Record<string, Dir> = {
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  none: { x: 0, y: 0 },
};

interface Entity {
  x: number;
  y: number;
  dir: Dir;
  next: Dir;
  speed: number;
  color?: string;
  scared?: boolean;
  home?: { x: number; y: number };
}

function buildGrid() {
  return RAW_MAZE.map((row) => row.split("").map((c) => parseInt(c, 10)));
}

function findSpawn(grid: number[][], val: number) {
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) if (grid[r][c] === val) return { x: c, y: r };
  return { x: 1, y: 1 };
}

interface PacmanGameProps {
  onGameEnd?: (score: number) => void;
}

const PacmanGame = ({ onGameEnd }: PacmanGameProps = {}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [status, setStatus] = useState<"ready" | "playing" | "win" | "lose">("ready");

  const stateRef = useRef({
    grid: buildGrid(),
    pac: null as Entity | null,
    ghosts: [] as Entity[],
    dots: 0,
    frame: 0,
    powerTicks: 0,
    score: 0,
    lives: 3,
    running: false,
  });

  const reset = useCallback(() => {
    const grid = buildGrid();
    let dots = 0;
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) if (grid[r][c] === 2 || grid[r][c] === 3) dots++;
    const ps = findSpawn(grid, 5);
    const gs = findSpawn(grid, 4);
    const ghostColors = ["#ff3b30", "#ff9ec7", "#06d6f7", "#ffb142"];
    stateRef.current.grid = grid;
    stateRef.current.dots = dots;
    stateRef.current.pac = {
      x: ps.x + 0.5,
      y: ps.y + 0.5,
      dir: DIRS.none,
      next: DIRS.none,
      speed: 0.12,
    };
    stateRef.current.ghosts = ghostColors.map((color, i) => ({
      x: gs.x + 0.5,
      y: gs.y + 0.5 - i * 0.01, // tiny stagger to avoid identical positions
      dir: DIRS.up,
      next: DIRS.up,
      speed: 0.09,
      color,
      scared: false,
      home: { x: gs.x + 0.5, y: gs.y + 0.5 },
    }));
    stateRef.current.frame = 0;
    stateRef.current.powerTicks = 0;
    stateRef.current.score = 0;
    stateRef.current.lives = 3;
    setScore(0);
    setLives(3);
    setStatus("ready");
  }, []);

  useEffect(() => {
    reset();
  }, [reset]);

  // Notify parent on end
  const lastEndRef = useRef<string>("");
  useEffect(() => {
    if ((status === "win" || status === "lose") && onGameEnd) {
      const key = `${status}:${stateRef.current.score}:${Date.now()}`;
      if (lastEndRef.current !== key) {
        lastEndRef.current = key;
        onGameEnd(stateRef.current.score);
      }
    }
  }, [status, onGameEnd]);

  // Input
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowLeft: DIRS.left,
        ArrowRight: DIRS.right,
        ArrowUp: DIRS.up,
        ArrowDown: DIRS.down,
        a: DIRS.left,
        d: DIRS.right,
        w: DIRS.up,
        s: DIRS.down,
      };
      const d = map[e.key];
      if (d) {
        e.preventDefault();
        if (stateRef.current.pac) stateRef.current.pac.next = d;
        if (status === "ready") setStatus("playing");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status]);

  const setDir = (d: Dir) => {
    if (stateRef.current.pac) stateRef.current.pac.next = d;
    if (status === "ready") setStatus("playing");
  };

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    const isWall = (cx: number, cy: number) => {
      if (cy < 0 || cy >= ROWS) return true;
      if (cx < 0 || cx >= COLS) return false; // tunnels
      return stateRef.current.grid[cy][cx] === 1;
    };

    const canMove = (e: Entity, d: Dir) => {
      if (d.x === 0 && d.y === 0) return true;
      const nx = e.x + d.x * 0.51;
      const ny = e.y + d.y * 0.51;
      return !isWall(Math.floor(nx), Math.floor(ny));
    };

    const tryTurn = (e: Entity) => {
      const cx = e.x - Math.floor(e.x);
      const cy = e.y - Math.floor(e.y);
      // Don't turn to a "none" direction (would freeze the entity)
      if (e.next.x === 0 && e.next.y === 0) return;
      // Only turn at cell centers (with tolerance)
      if (Math.abs(cx - 0.5) < 0.15 && Math.abs(cy - 0.5) < 0.15 && canMove(e, e.next)) {
        e.x = Math.floor(e.x) + 0.5;
        e.y = Math.floor(e.y) + 0.5;
        e.dir = e.next;
      }
    };

    const moveEntity = (e: Entity) => {
      tryTurn(e);
      if (!canMove(e, e.dir)) {
        // snap to center
        e.x = Math.floor(e.x) + 0.5;
        e.y = Math.floor(e.y) + 0.5;
        return;
      }
      e.x += e.dir.x * e.speed;
      e.y += e.dir.y * e.speed;
      // tunnel wrap
      if (e.x < -0.5) e.x = COLS - 0.5;
      if (e.x > COLS - 0.5) e.x = -0.5;
    };

    const ghostAI = (g: Entity) => {
      const cx = g.x - Math.floor(g.x);
      const cy = g.y - Math.floor(g.y);
      if (Math.abs(cx - 0.5) < 0.15 && Math.abs(cy - 0.5) < 0.15) {
        // snap to center to keep grid alignment
        g.x = Math.floor(g.x) + 0.5;
        g.y = Math.floor(g.y) + 0.5;
        const opts = (Object.values(DIRS) as Dir[]).filter(
          (d) => (d.x !== 0 || d.y !== 0) && canMove(g, d) && !(d.x === -g.dir.x && d.y === -g.dir.y),
        );
        const choices =
          opts.length > 0
            ? opts
            : [{ x: -g.dir.x, y: -g.dir.y } as Dir].filter((d) => canMove(g, d));
        if (choices.length === 0) return;
        // Bias toward / away from pacman
        const pac = stateRef.current.pac!;
        const scored = choices.map((d) => {
          const dx = pac.x - (g.x + d.x);
          const dy = pac.y - (g.y + d.y);
          const dist = Math.sqrt(dx * dx + dy * dy);
          const bias = g.scared ? -dist : dist;
          return { d, score: bias + Math.random() * 3 };
        });
        scored.sort((a, b) => a.score - b.score);
        g.dir = scored[0].d;
        g.next = g.dir;
      }
    };

    const tick = () => {
      const s = stateRef.current;
      if (status === "playing" && s.pac) {
        s.frame++;
        moveEntity(s.pac);
        // Eat
        const gx = Math.floor(s.pac.x);
        const gy = Math.floor(s.pac.y);
        if (gy >= 0 && gy < ROWS && gx >= 0 && gx < COLS) {
          const cell = s.grid[gy][gx];
          if (cell === 2) {
            s.grid[gy][gx] = 0;
            s.dots--;
            s.score += 10;
            setScore(s.score);
          } else if (cell === 3) {
            s.grid[gy][gx] = 0;
            s.dots--;
            s.score += 50;
            s.powerTicks = 360;
            s.ghosts.forEach((g) => (g.scared = true));
            setScore(s.score);
          }
        }
        if (s.powerTicks > 0) {
          s.powerTicks--;
          if (s.powerTicks === 0) s.ghosts.forEach((g) => (g.scared = false));
        }
        if (s.dots <= 0) {
          setStatus("win");
        }
        s.ghosts.forEach((g) => {
          ghostAI(g);
          moveEntity(g);
          // collision
          const dx = g.x - s.pac!.x;
          const dy = g.y - s.pac!.y;
          if (dx * dx + dy * dy < 0.3) {
            if (g.scared && g.home) {
              g.x = g.home.x;
              g.y = g.home.y;
              g.scared = false;
              s.score += 200;
              setScore(s.score);
            } else {
              s.lives--;
              setLives(s.lives);
              if (s.lives <= 0) {
                setStatus("lose");
              } else {
                // reset positions
                const ps = findSpawn(s.grid, 5);
                s.pac!.x = ps.x + 0.5;
                s.pac!.y = ps.y + 0.5;
                s.pac!.dir = DIRS.none;
                s.pac!.next = DIRS.none;
                s.ghosts.forEach((gh, i) => {
                  gh.x = gh.home!.x + (i - 1.5) * 0.6;
                  gh.y = gh.home!.y;
                });
                setStatus("ready");
              }
            }
          }
        });
      }

      // Draw
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      // Maze
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const v = s.grid[r][c];
          const x = c * CELL;
          const y = r * CELL;
          if (v === 1) {
            ctx.fillStyle = "#1438c4";
            ctx.fillRect(x + 1, y + 1, CELL - 2, CELL - 2);
            ctx.strokeStyle = "#5b8bff";
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 1.5, y + 1.5, CELL - 3, CELL - 3);
          } else if (v === 2) {
            ctx.fillStyle = "#fff7c2";
            ctx.beginPath();
            ctx.arc(x + CELL / 2, y + CELL / 2, 2, 0, Math.PI * 2);
            ctx.fill();
          } else if (v === 3) {
            ctx.fillStyle = "#fff7c2";
            ctx.beginPath();
            ctx.arc(x + CELL / 2, y + CELL / 2, 5 + Math.sin(s.frame / 8) * 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      // Pacman
      if (s.pac) {
        const px = s.pac.x * CELL;
        const py = s.pac.y * CELL;
        const r = CELL / 2 - 2;
        const mouth = (Math.sin(s.frame / 3) + 1) / 2 * 0.6 + 0.05;
        let angle = 0;
        if (s.pac.dir === DIRS.right) angle = 0;
        else if (s.pac.dir === DIRS.down) angle = Math.PI / 2;
        else if (s.pac.dir === DIRS.left) angle = Math.PI;
        else if (s.pac.dir === DIRS.up) angle = -Math.PI / 2;
        ctx.fillStyle = "#ffd400";
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.arc(px, py, r, angle + mouth, angle - mouth + Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      // Ghosts
      s.ghosts.forEach((g) => {
        const gx = g.x * CELL;
        const gy = g.y * CELL;
        const r = CELL / 2 - 2;
        ctx.fillStyle = g.scared ? (s.powerTicks < 90 && s.powerTicks % 20 < 10 ? "#fff" : "#1f3bff") : g.color!;
        ctx.beginPath();
        ctx.arc(gx, gy - 1, r, Math.PI, 0);
        ctx.lineTo(gx + r, gy + r);
        ctx.lineTo(gx + r * 0.6, gy + r - 3);
        ctx.lineTo(gx + r * 0.2, gy + r);
        ctx.lineTo(gx - r * 0.2, gy + r - 3);
        ctx.lineTo(gx - r * 0.6, gy + r);
        ctx.lineTo(gx - r, gy + r);
        ctx.closePath();
        ctx.fill();
        // eyes
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(gx - 4, gy - 2, 3, 0, Math.PI * 2);
        ctx.arc(gx + 4, gy - 2, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(gx - 4 + g.dir.x * 1.2, gy - 2 + g.dir.y * 1.2, 1.5, 0, Math.PI * 2);
        ctx.arc(gx + 4 + g.dir.x * 1.2, gy - 2 + g.dir.y * 1.2, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [status]);

  return (
    <div className="w-full flex flex-col items-center gap-4 py-6" dir="rtl">
      <div className="flex items-center justify-between w-full max-w-[520px] px-2 font-mono text-yellow-300">
        <div>ניקוד: <span className="font-bold">{score}</span></div>
        <div className="text-2xl tracking-widest">{"●".repeat(Math.max(0, lives))}</div>
      </div>
      <div className="relative rounded-lg overflow-hidden shadow-[0_0_40px_rgba(20,56,196,0.6)] border-2 border-blue-700/60">
        <canvas ref={canvasRef} width={W} height={H} className="block bg-black max-w-full h-auto" />
        {status !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-center px-4">
            <div className="text-yellow-300 font-mono text-3xl md:text-4xl font-bold mb-3">
              {status === "ready" && "PAC-MAN"}
              {status === "win" && "ניצחת! 🎉"}
              {status === "lose" && "המשחק הסתיים"}
            </div>
            <div className="text-white/80 font-heebo text-sm md:text-base mb-4 max-w-xs">
              נווט עם מקשי החיצים או הכפתורים למטה. אכול את כל הכדורים והימנע מהרוחות.
            </div>
            <button
              type="button"
              onClick={() => {
                if (status !== "ready") reset();
                setStatus("playing");
              }}
              className="rounded-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-2 font-mono"
            >
              {status === "ready" ? "התחל" : "שחק שוב"}
            </button>
          </div>
        )}
      </div>
      {/* Touch controls */}
      <div className="grid grid-cols-3 gap-2 mt-2 select-none md:hidden">
        <div />
        <button onPointerDown={() => setDir(DIRS.up)} className="h-12 w-12 rounded-md bg-blue-700 text-white text-xl">▲</button>
        <div />
        <button onPointerDown={() => setDir(DIRS.left)} className="h-12 w-12 rounded-md bg-blue-700 text-white text-xl">◀</button>
        <button onPointerDown={() => setDir(DIRS.down)} className="h-12 w-12 rounded-md bg-blue-700 text-white text-xl">▼</button>
        <button onPointerDown={() => setDir(DIRS.right)} className="h-12 w-12 rounded-md bg-blue-700 text-white text-xl">▶</button>
      </div>
      <p className="text-xs text-muted-foreground font-mono mt-1">
        בהשראת platzhersh/pacman-canvas
      </p>
    </div>
  );
};

export default PacmanGame;