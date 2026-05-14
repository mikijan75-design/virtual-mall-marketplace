import { useCallback, useEffect, useRef, useState } from "react";
import originalPacmanMap from "./data/map";

/**
 * Pacman game for the virtual mall (store 1.2.0).
 * Uses the original platzhersh/pacman-canvas map data and movement rules:
 * 18x13 board, tunnel row, ghost-house door, original spawn points and speeds.
 */

type CellType = "wall" | "pill" | "powerpill" | "door" | "null";
type DirectionName = "up" | "left" | "down" | "right" | "none";

type Direction = {
  name: DirectionName;
  angle1: number;
  angle2: number;
  x: number;
  y: number;
};

type MapCell = {
  col: number;
  type: CellType;
};

type MapRow = {
  row: number;
  posX: MapCell[];
};

type GameMap = {
  posY: MapRow[];
};

type PacmanEntity = {
  x: number;
  y: number;
  dir: Direction;
  next: Direction | null;
  speed: number;
  mouth: number;
  mouthDir: 1 | -1;
  beastTicks: number;
};

type GhostName = "pinky" | "inky" | "blinky" | "clyde";

type GhostEntity = {
  name: GhostName;
  x: number;
  y: number;
  startX: number;
  startY: number;
  baseX: number;
  baseY: number;
  dir: Direction;
  next: Direction | null;
  speed: number;
  color: string;
  ghostHouse: boolean;
  scared: boolean;
  dead: boolean;
  stopped: boolean;
};

interface PacmanGameProps {
  onGameEnd?: (score: number) => void;
}

const CELL = 30;
const RADIUS = 15;
const COLS = 18;
const ROWS = 13;
const W = COLS * CELL;
const H = ROWS * CELL;
const FRAME_MS = 33;
const PILL_POINTS = 10;
const POWERPILL_POINTS = 50;
const GHOST_POINTS = 100;

const UP: Direction = { name: "up", angle1: 1.75, angle2: 1.25, x: 0, y: -1 };
const LEFT: Direction = { name: "left", angle1: 1.25, angle2: 0.75, x: -1, y: 0 };
const DOWN: Direction = { name: "down", angle1: 0.75, angle2: 0.25, x: 0, y: 1 };
const RIGHT: Direction = { name: "right", angle1: 0.25, angle2: 1.75, x: 1, y: 0 };
const NONE: Direction = { name: "none", angle1: 0.25, angle2: 1.75, x: 0, y: 0 };
const DIRECTIONS = [UP, DOWN, RIGHT, LEFT];

const cloneMap = (): GameMap => JSON.parse(JSON.stringify(originalPacmanMap));

const mod = (value: number, max: number) => ((value % max) + max) % max;
const atGrid = (value: number) => Math.abs(value % CELL) < 0.001 || Math.abs((value % CELL) - CELL) < 0.001;
const inGrid = (entity: { x: number; y: number }) => atGrid(entity.x) && atGrid(entity.y);
const gridX = (entity: { x: number }) => mod(Math.floor((entity.x - (entity.x % CELL)) / CELL), COLS);
const gridY = (entity: { y: number }) => mod(Math.floor((entity.y - (entity.y % CELL)) / CELL), ROWS);
const opposite = (dir: Direction) => {
  if (dir.name === "up") return DOWN;
  if (dir.name === "down") return UP;
  if (dir.name === "left") return RIGHT;
  if (dir.name === "right") return LEFT;
  return NONE;
};

const getMapContent = (map: GameMap, x: number, y: number): CellType => {
  return map.posY[mod(y, ROWS)]?.posX[mod(x, COLS)]?.type ?? "wall";
};

const setMapContent = (map: GameMap, x: number, y: number, type: CellType) => {
  const row = map.posY[mod(y, ROWS)];
  const cell = row?.posX[mod(x, COLS)];
  if (cell) cell.type = type;
};

const countFood = (map: GameMap) =>
  map.posY.reduce(
    (total, row) => total + row.posX.filter((cell) => cell.type === "pill" || cell.type === "powerpill").length,
    0,
  );

const canEnter = (type: CellType, entity: "pacman" | "ghost", dead = false) => {
  if (type === "wall") return false;
  if (type === "door") return entity === "ghost" && dead;
  return true;
};

const makeGhost = (
  name: GhostName,
  gridPosX: number,
  gridPosY: number,
  color: string,
  baseX: number,
  baseY: number,
): GhostEntity => ({
  name,
  x: gridPosX * CELL,
  y: gridPosY * CELL,
  startX: gridPosX * CELL,
  startY: gridPosY * CELL,
  baseX,
  baseY,
  dir: RIGHT,
  next: null,
  speed: 2,
  color,
  ghostHouse: true,
  scared: false,
  dead: false,
  stopped: false,
});

const PacmanGame = ({ onGameEnd }: PacmanGameProps = {}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statusRef = useRef<"ready" | "playing" | "win" | "lose">("ready");
  const lastScoreStatusRef = useRef<string>("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [status, setStatusState] = useState<"ready" | "playing" | "win" | "lose">("ready");
  const [overlayVisible, setOverlayVisible] = useState(true);

  const stateRef = useRef({
    map: cloneMap(),
    pac: null as PacmanEntity | null,
    ghosts: [] as GhostEntity[],
    food: 0,
    frame: 0,
    score: 0,
    lives: 3,
    ghostMode: 0,
    ghostModeTimer: 200,
  });

  const setStatus = useCallback((next: "ready" | "playing" | "win" | "lose") => {
    statusRef.current = next;
    setStatusState(next);
    setOverlayVisible(next !== "playing");
  }, []);

  const resetPositions = useCallback(() => {
    const s = stateRef.current;
    s.pac = {
      x: 0,
      y: 6 * CELL,
      dir: RIGHT,
      next: null,
      speed: 5,
      mouth: 0,
      mouthDir: 1,
      beastTicks: 0,
    };
    s.ghosts = [
      makeGhost("pinky", 7, 5, "#ff9ec7", 2, 2),
      makeGhost("inky", 8, 5, "#06d6f7", 13, 11),
      makeGhost("blinky", 9, 5, "#ff3b30", 13, 0),
      makeGhost("clyde", 10, 5, "#ffb142", 2, 11),
    ];
  }, []);

  const reset = useCallback(() => {
    const map = cloneMap();
    stateRef.current.map = map;
    stateRef.current.food = countFood(map);
    stateRef.current.frame = 0;
    stateRef.current.score = 0;
    stateRef.current.lives = 3;
    stateRef.current.ghostMode = 0;
    stateRef.current.ghostModeTimer = 200;
    resetPositions();
    setScore(0);
    setLives(3);
    setStatus("ready");
    lastScoreStatusRef.current = "";
  }, [resetPositions, setStatus]);

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if ((status === "win" || status === "lose") && onGameEnd) {
      const key = `${status}:${stateRef.current.score}`;
      if (lastScoreStatusRef.current !== key) {
        lastScoreStatusRef.current = key;
        onGameEnd(stateRef.current.score);
      }
    }
  }, [status, onGameEnd]);

  const startPlaying = useCallback(() => {
    const pac = stateRef.current.pac;
    if (pac && pac.dir.name === "none") pac.dir = RIGHT;
    if (statusRef.current === "ready") setStatus("playing");
  }, [setStatus]);

  const queuePacmanDirection = useCallback(
    (dir: Direction) => {
      const pac = stateRef.current.pac;
      if (pac) pac.next = dir;
      startPlaying();
    },
    [startPlaying],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Direction> = {
        ArrowLeft: LEFT,
        ArrowRight: RIGHT,
        ArrowUp: UP,
        ArrowDown: DOWN,
        a: LEFT,
        d: RIGHT,
        w: UP,
        s: DOWN,
      };
      const dir = map[e.key];
      if (!dir) return;
      e.preventDefault();
      queuePacmanDirection(dir);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [queuePacmanDirection]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let lastTick = 0;

    const addScore = (points: number) => {
      const s = stateRef.current;
      s.score += points;
      setScore(s.score);
    };

    const snapToGrid = (entity: { x: number; y: number }) => {
      entity.x = Math.round(entity.x / CELL) * CELL;
      entity.y = Math.round(entity.y / CELL) * CELL;
    };

    const nextTileIsOpen = (entity: { x: number; y: number }, dir: Direction, kind: "pacman" | "ghost", dead = false) => {
      const x = gridX(entity) + dir.x;
      const y = gridY(entity) + dir.y;
      return canEnter(getMapContent(stateRef.current.map, x, y), kind, dead);
    };

    const movePacman = (pac: PacmanEntity) => {
      if (pac.next && inGrid(pac) && nextTileIsOpen(pac, pac.next, "pacman")) {
        snapToGrid(pac);
        pac.dir = pac.next;
        pac.next = null;
      }

      if (inGrid(pac) && !nextTileIsOpen(pac, pac.dir, "pacman")) {
        snapToGrid(pac);
        return;
      }

      pac.x += pac.speed * pac.dir.x;
      pac.y += pac.speed * pac.dir.y;

      if (pac.x >= W - RADIUS) pac.x = -RADIUS + pac.speed;
      if (pac.x <= -RADIUS) pac.x = W - RADIUS - pac.speed;
      if (pac.y >= H - RADIUS) pac.y = -RADIUS + pac.speed;
      if (pac.y <= -RADIUS) pac.y = H - RADIUS - pac.speed;
    };

    const eatFood = (pac: PacmanEntity) => {
      const x = gridX(pac);
      const y = gridY(pac);
      const type = getMapContent(stateRef.current.map, x, y);
      if (type !== "pill" && type !== "powerpill") return;

      setMapContent(stateRef.current.map, x, y, "null");
      stateRef.current.food--;

      if (type === "powerpill") {
        pac.beastTicks = 240;
        stateRef.current.ghosts.forEach((ghost) => {
          if (!ghost.dead) {
            ghost.scared = true;
            ghost.speed = 2;
          }
        });
        addScore(POWERPILL_POINTS);
      } else {
        addScore(PILL_POINTS);
      }
    };

    const targetForGhost = (ghost: GhostEntity) => {
      const pac = stateRef.current.pac!;
      const px = gridX(pac);
      const py = gridY(pac);
      const gx = gridX(ghost);
      const gy = gridY(ghost);

      if (ghost.dead) return { x: ghost.startX / CELL, y: ghost.startY / CELL };
      if (ghost.scared) return { x: ghost.baseX, y: ghost.baseY };
      if (stateRef.current.ghostMode === 0) return { x: ghost.baseX, y: ghost.baseY };

      if (ghost.name === "pinky") return { x: px + pac.dir.x * 4 - pac.dir.y * 4, y: py + pac.dir.y * 4 - pac.dir.x * 4 };
      if (ghost.name === "inky") {
        const blinky = stateRef.current.ghosts.find((g) => g.name === "blinky") ?? ghost;
        const leadX = px + pac.dir.x * 2;
        const leadY = py + pac.dir.y * 2;
        return { x: gridX(blinky) + (leadX - gridX(blinky)) * 2, y: gridY(blinky) + (leadY - gridY(blinky)) * 2 };
      }
      if (ghost.name === "clyde") {
        const dist = Math.hypot(gx - px, gy - py);
        if (dist < 5) return { x: ghost.baseX, y: ghost.baseY };
      }
      return { x: px, y: py };
    };

    const chooseGhostDirection = (ghost: GhostEntity) => {
      if (!inGrid(ghost)) return;
      snapToGrid(ghost);

      if (ghost.ghostHouse) {
        const gx = gridX(ghost);
        const gy = gridY(ghost);
        if (gy === 5) {
          if (gx === 7) ghost.dir = RIGHT;
          if (gx === 8 || gx === 9) ghost.dir = UP;
          if (gx === 10) ghost.dir = LEFT;
        }
        if (gy === 4 && (gx === 8 || gx === 9)) ghost.ghostHouse = false;
        return;
      }

      const target = targetForGhost(ghost);
      const reverse = opposite(ghost.dir);
      const choices = DIRECTIONS.filter((dir) => {
        if (dir.name === reverse.name && !ghost.dead) return false;
        return nextTileIsOpen(ghost, dir, "ghost", ghost.dead);
      });
      const fallback = choices.length ? choices : DIRECTIONS.filter((dir) => nextTileIsOpen(ghost, dir, "ghost", ghost.dead));
      if (!fallback.length) return;

      fallback.sort((a, b) => {
        const ax = gridX(ghost) + a.x;
        const ay = gridY(ghost) + a.y;
        const bx = gridX(ghost) + b.x;
        const by = gridY(ghost) + b.y;
        const da = Math.hypot(ax - target.x, ay - target.y);
        const db = Math.hypot(bx - target.x, by - target.y);
        return ghost.scared ? db - da : da - db;
      });
      ghost.dir = fallback[0];
    };

    const moveGhost = (ghost: GhostEntity) => {
      chooseGhostDirection(ghost);
      if (ghost.stopped) return;

      ghost.x += ghost.speed * ghost.dir.x;
      ghost.y += ghost.speed * ghost.dir.y;

      if (ghost.x >= W - RADIUS) ghost.x = ghost.speed - RADIUS;
      if (ghost.x <= -RADIUS) ghost.x = W - ghost.speed - RADIUS;
      if (ghost.y >= H - RADIUS) ghost.y = ghost.speed - RADIUS;
      if (ghost.y <= -RADIUS) ghost.y = H - ghost.speed - RADIUS;

      if (ghost.dead && gridX(ghost) === ghost.startX / CELL && gridY(ghost) === ghost.startY / CELL && inGrid(ghost)) {
        ghost.dead = false;
        ghost.scared = false;
        ghost.ghostHouse = true;
        ghost.speed = 2;
      }
    };

    const loseLife = () => {
      const s = stateRef.current;
      s.lives--;
      setLives(s.lives);
      if (s.lives <= 0) {
        setStatus("lose");
        return;
      }
      resetPositions();
      setStatus("ready");
    };

    const checkGhostCollision = () => {
      const s = stateRef.current;
      const pac = s.pac;
      if (!pac) return;

      for (const ghost of s.ghosts) {
        if (Math.hypot(ghost.x - pac.x, ghost.y - pac.y) > 18) continue;
        if (ghost.scared || ghost.dead) {
          if (!ghost.dead) addScore(GHOST_POINTS);
          ghost.dead = true;
          ghost.scared = false;
          ghost.speed = 2;
        } else {
          loseLife();
          break;
        }
      }
    };

    const update = () => {
      const s = stateRef.current;
      if (statusRef.current !== "playing" || !s.pac) return;

      s.frame++;
      s.ghostModeTimer--;
      if (s.ghostModeTimer <= 0) {
        s.ghostMode = s.ghostMode === 0 ? 1 : 0;
        s.ghostModeTimer = 200 + s.ghostMode * 450;
        s.ghosts.forEach((ghost) => {
          if (!ghost.ghostHouse) ghost.dir = opposite(ghost.dir);
        });
      }

      movePacman(s.pac);
      eatFood(s.pac);

      if (s.pac.beastTicks > 0) {
        s.pac.beastTicks--;
        if (s.pac.beastTicks === 0) {
          s.ghosts.forEach((ghost) => {
            ghost.scared = false;
          });
        }
      }

      s.ghosts.forEach(moveGhost);
      checkGhostCollision();

      if (s.food <= 0 && statusRef.current === "playing") setStatus("win");
    };

    const drawWalls = () => {
      const s = stateRef.current;
      for (const row of s.map.posY) {
        for (const cell of row.posX) {
          const x = (cell.col - 1) * CELL;
          const y = (row.row - 1) * CELL;

          if (cell.type === "wall") {
            ctx.fillStyle = s.ghostMode === 0 ? "#1438c4" : "#c41435";
            ctx.fillRect(x + 4, y + 4, CELL - 8, CELL - 8);
            ctx.strokeStyle = s.ghostMode === 0 ? "#5b8bff" : "#ff6b83";
            ctx.lineWidth = 2;
            ctx.strokeRect(x + 5, y + 5, CELL - 10, CELL - 10);
          }

          if (cell.type === "door") {
            ctx.strokeStyle = "#ffd6ff";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x + 2, y + CELL / 2);
            ctx.lineTo(x + CELL - 2, y + CELL / 2);
            ctx.stroke();
          }
        }
      }
    };

    const drawFood = () => {
      const s = stateRef.current;
      ctx.fillStyle = "#fff7c2";
      for (const row of s.map.posY) {
        for (const cell of row.posX) {
          const x = (cell.col - 1) * CELL + RADIUS;
          const y = (row.row - 1) * CELL + RADIUS;
          if (cell.type === "pill") {
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
          }
          if (cell.type === "powerpill") {
            ctx.beginPath();
            ctx.arc(x, y, 5 + Math.sin(s.frame / 4) * 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    const drawPacman = () => {
      const pac = stateRef.current.pac;
      if (!pac) return;

      pac.mouth += pac.mouthDir * 0.07;
      if (pac.mouth > 0.22) pac.mouthDir = -1;
      if (pac.mouth < 0.02) pac.mouthDir = 1;

      const cx = pac.x + RADIUS;
      const cy = pac.y + RADIUS;
      ctx.fillStyle = "#ffd400";
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, RADIUS, (pac.dir.angle1 - pac.mouth) * Math.PI, (pac.dir.angle2 + pac.mouth) * Math.PI, true);
      ctx.closePath();
      ctx.fill();
    };

    const drawGhost = (ghost: GhostEntity) => {
      const cx = ghost.x + RADIUS;
      const cy = ghost.y + RADIUS;
      const flash = ghost.scared && stateRef.current.pac && stateRef.current.pac.beastTicks < 50 && stateRef.current.pac.beastTicks % 8 > 1;
      ctx.fillStyle = ghost.dead ? "#f8fbff" : ghost.scared ? (flash ? "#f8fbff" : "#1f3bff") : ghost.color;
      ctx.beginPath();
      ctx.arc(cx, cy - 1, RADIUS - 2, Math.PI, 0);
      ctx.lineTo(cx + RADIUS - 2, cy + RADIUS - 2);
      ctx.lineTo(cx + 8, cy + 10);
      ctx.lineTo(cx + 3, cy + RADIUS - 2);
      ctx.lineTo(cx - 3, cy + 10);
      ctx.lineTo(cx - 8, cy + RADIUS - 2);
      ctx.lineTo(cx - RADIUS + 2, cy + RADIUS - 2);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(cx - 5, cy - 2, 4, 0, Math.PI * 2);
      ctx.arc(cx + 5, cy - 2, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#06101f";
      ctx.beginPath();
      ctx.arc(cx - 5 + ghost.dir.x * 2, cy - 2 + ghost.dir.y * 2, 2, 0, Math.PI * 2);
      ctx.arc(cx + 5 + ghost.dir.x * 2, cy - 2 + ghost.dir.y * 2, 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = () => {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      drawWalls();
      drawFood();
      stateRef.current.ghosts.forEach(drawGhost);
      drawPacman();
    };

    const loop = (time: number) => {
      if (!lastTick) lastTick = time;
      while (time - lastTick >= FRAME_MS) {
        update();
        lastTick += FRAME_MS;
      }
      draw();
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [resetPositions, setStatus]);

  return (
    <div className="w-full flex flex-col items-center gap-4 py-6" dir="rtl">
      <div className="flex items-center justify-between w-full max-w-[540px] px-2 font-mono text-yellow-300">
        <div>
          ניקוד: <span className="font-bold">{score}</span>
        </div>
        <div className="text-2xl tracking-widest">{"●".repeat(Math.max(0, lives))}</div>
      </div>
      <div className="relative rounded-lg overflow-hidden shadow-[0_0_40px_rgba(20,56,196,0.6)] border-2 border-blue-700/60">
        <canvas ref={canvasRef} width={W} height={H} className="block bg-black max-w-full h-auto" />
        {overlayVisible && (
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
                queuePacmanDirection(RIGHT);
              }}
              className="rounded-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-2 font-mono"
            >
              {status === "ready" ? "התחל" : "שחק שוב"}
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 mt-2 select-none md:hidden">
        <div />
        <button onPointerDown={() => queuePacmanDirection(UP)} className="h-12 w-12 rounded-md bg-blue-700 text-white text-xl">
          ▲
        </button>
        <div />
        <button onPointerDown={() => queuePacmanDirection(LEFT)} className="h-12 w-12 rounded-md bg-blue-700 text-white text-xl">
          ◀
        </button>
        <button onPointerDown={() => queuePacmanDirection(DOWN)} className="h-12 w-12 rounded-md bg-blue-700 text-white text-xl">
          ▼
        </button>
        <button onPointerDown={() => queuePacmanDirection(RIGHT)} className="h-12 w-12 rounded-md bg-blue-700 text-white text-xl">
          ▶
        </button>
      </div>
      <p className="text-xs text-muted-foreground font-mono mt-1">בהשראת platzhersh/pacman-canvas · מפת המקור נטענה</p>
    </div>
  );
};

export default PacmanGame;
