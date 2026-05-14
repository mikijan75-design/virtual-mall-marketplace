import PacmanGame from "@/games/pacman/PacmanGame";

const PacmanArcadePage = () => {
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
      <PacmanGame />
    </main>
  );
};

export default PacmanArcadePage;