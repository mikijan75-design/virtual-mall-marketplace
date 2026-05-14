import { useCallback, useEffect, useState } from "react";
import PacmanGame from "@/games/pacman/PacmanGame";

interface ScoreEntry {
  name: string;
  score: number;
  date: string;
}

const STORAGE_KEY = "pacman_high_scores_v1";
const MAX_SCORES = 10;

function loadScores(): ScoreEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((e) => typeof e?.score === "number").slice(0, MAX_SCORES);
  } catch {
    return [];
  }
}

function saveScores(list: ScoreEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

const PacmanArcadePage = () => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [pendingScore, setPendingScore] = useState<number | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    setScores(loadScores());
  }, []);

  const qualifies = useCallback((score: number, list: ScoreEntry[]) => {
    if (score <= 0) return false;
    if (list.length < MAX_SCORES) return true;
    return score > list[list.length - 1].score;
  }, []);

  const handleGameEnd = useCallback(
    (score: number) => {
      const current = loadScores();
      if (qualifies(score, current)) {
        setPendingScore(score);
        setName("");
      }
    },
    [qualifies],
  );

  const confirmScore = () => {
    if (pendingScore == null) return;
    const entry: ScoreEntry = {
      name: (name.trim() || "אנונימי").slice(0, 16),
      score: pendingScore,
      date: new Date().toLocaleDateString("he-IL"),
    };
    const next = [...loadScores(), entry]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_SCORES);
    saveScores(next);
    setScores(next);
    setPendingScore(null);
    setName("");
  };

  const cancelScore = () => {
    setPendingScore(null);
    setName("");
  };

  return (
    <main className="min-h-[calc(100vh-9rem)] bg-gradient-to-b from-[#05060f] via-[#0a0d2e] to-[#05060f]">
      <header className="text-center pt-10 pb-4 px-4" dir="rtl">
        <h1
          className="font-mono font-black text-4xl md:text-6xl tracking-[0.25em] text-yellow-300"
          style={{ textShadow: "0 0 12px rgba(255,212,0,0.55)" }}
        >
          PAC-MAN
        </h1>
        <p className="mt-3 text-white/80 font-heebo text-base md:text-lg">
          חנות 1.2.0 · גלריית הארקייד של הקניון
        </p>
      </header>
      <PacmanGame onGameEnd={handleGameEnd} />

      {/* High scores table */}
      <section dir="rtl" className="max-w-[520px] mx-auto px-4 pb-12 mt-2">
        <div className="rounded-xl border-2 border-blue-700/60 bg-black/60 backdrop-blur p-4 shadow-[0_0_30px_rgba(20,56,196,0.4)]">
          <h2 className="font-mono text-yellow-300 text-xl md:text-2xl tracking-[0.2em] text-center mb-3"
            style={{ textShadow: "0 0 8px rgba(255,212,0,0.5)" }}
          >
            לוח שיאים · TOP 10
          </h2>
          {scores.length === 0 ? (
            <p className="text-center text-white/60 font-heebo py-6">
              עדיין אין שיאים — היה הראשון לקבוע!
            </p>
          ) : (
            <ol className="divide-y divide-blue-900/60">
              {scores.map((s, i) => (
                <li
                  key={`${s.name}-${i}`}
                  className="flex items-center justify-between py-2 font-mono text-sm md:text-base"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                        i === 0
                          ? "bg-yellow-400 text-black"
                          : i === 1
                          ? "bg-blue-400/80 text-black"
                          : i === 2
                          ? "bg-pink-400/80 text-black"
                          : "bg-blue-900/70 text-yellow-200"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-white/90">{s.name}</span>
                  </span>
                  <span className="flex items-center gap-3 text-white/60">
                    <span className="text-[11px]">{s.date}</span>
                    <span className="text-yellow-300 font-bold">{s.score}</span>
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      {/* New high score modal */}
      {pendingScore != null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          dir="rtl"
          onClick={cancelScore}
        >
          <div
            className="w-full max-w-md rounded-2xl border-2 border-yellow-300/80 bg-gradient-to-b from-[#0a0d2e] to-[#05060f] p-6 shadow-[0_0_60px_rgba(255,212,0,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className="font-mono font-black text-3xl md:text-4xl text-center text-yellow-300 tracking-[0.2em]"
              style={{ textShadow: "0 0 12px rgba(255,212,0,0.6)" }}
            >
              שברת שיא
            </h3>
            <p className="text-center text-white/80 font-heebo mt-2">
              ניקוד: <span className="text-yellow-300 font-bold">{pendingScore}</span>
            </p>
            <label className="block mt-5 text-white/80 font-heebo text-sm">
              הכנס את שמך
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") confirmScore();
                }}
                maxLength={16}
                placeholder="השם שלך"
                className="mt-2 w-full rounded-md bg-black/60 border-2 border-blue-700/70 focus:border-yellow-300 outline-none px-3 py-2 font-mono text-yellow-200 placeholder:text-white/30"
              />
            </label>
            <div className="mt-5 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={cancelScore}
                className="flex-1 rounded-full border-2 border-blue-700/70 text-white/80 font-mono py-2 hover:bg-blue-900/40"
              >
                ביטול
              </button>
              <button
                type="button"
                onClick={confirmScore}
                className="flex-1 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold font-mono py-2"
              >
                אישור
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default PacmanArcadePage;