const MallCeiling = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Arch shape */}
      <div className="relative mx-auto max-w-5xl">
        {/* Gold border frame */}
        <div className="border-4 border-mall-gold rounded-t-[50%] overflow-hidden shadow-2xl">
          {/* Ceiling painting simulation */}
          <div
            className="w-full h-48 md:h-72 lg:h-80"
            style={{
              background: `
                radial-gradient(ellipse at 30% 40%, hsl(35, 50%, 85%) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 30%, hsl(40, 60%, 80%) 0%, transparent 45%),
                radial-gradient(ellipse at 50% 60%, hsl(200, 30%, 80%) 0%, transparent 50%),
                radial-gradient(ellipse at 20% 70%, hsl(30, 40%, 75%) 0%, transparent 40%),
                radial-gradient(ellipse at 80% 70%, hsl(45, 50%, 82%) 0%, transparent 40%),
                linear-gradient(180deg, hsl(200, 40%, 82%) 0%, hsl(35, 45%, 85%) 40%, hsl(30, 30%, 80%) 100%)
              `,
            }}
          >
            {/* Decorative elements suggesting a Renaissance fresco */}
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 35%, hsl(43, 70%, 70%) 2px, transparent 2px),
                  radial-gradient(circle at 75% 25%, hsl(43, 70%, 70%) 3px, transparent 3px),
                  radial-gradient(circle at 50% 50%, hsl(43, 70%, 70%) 4px, transparent 4px),
                  radial-gradient(circle at 35% 65%, hsl(43, 70%, 70%) 2px, transparent 2px),
                  radial-gradient(circle at 65% 60%, hsl(43, 70%, 70%) 3px, transparent 3px)
                `,
              }} />
              <span className="text-5xl md:text-7xl opacity-30">✨</span>
            </div>
          </div>
        </div>
        {/* Gold ornamental bar below ceiling */}
        <div className="h-3 bg-gradient-to-r from-mall-gold/60 via-mall-gold to-mall-gold/60 shadow-inner" />
      </div>
    </div>
  );
};

export default MallCeiling;
