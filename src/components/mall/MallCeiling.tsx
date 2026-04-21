import mallCeiling from "@/assets/fresco-ceiling.jpg";

const MallCeiling = () => {
  return (
    <div className="relative w-full">
      <div className="relative mx-auto max-w-6xl">
        {/* Wide shallow dome — half-ellipse like the reference */}
        <div
          className="relative overflow-hidden"
          style={{
            borderTopLeftRadius: "50% 100%",
            borderTopRightRadius: "50% 100%",
            borderTop: "5px solid hsl(43,55%,45%)",
            borderLeft: "5px solid hsl(43,55%,45%)",
            borderRight: "5px solid hsl(43,55%,45%)",
            boxShadow:
              "0 14px 44px rgba(0,0,0,0.45), inset 0 0 80px rgba(0,0,0,0.35)",
          }}
        >
          <img
            src={mallCeiling}
            alt="פרסקו תקרת קניון בסגנון רנסנס"
            className="w-full h-44 md:h-60 lg:h-72 object-cover"
            style={{ objectPosition: "center 20%" }}
            width={1920}
            height={640}
          />
          {/* Curvature vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, transparent 30%, rgba(0,0,0,0.45) 100%)",
            }}
          />
        </div>
        {/* Gold cornice base */}
        <div
          className="h-3 md:h-4 relative z-10"
          style={{
            background:
              "linear-gradient(180deg, hsl(43,68%,62%) 0%, hsl(43,55%,42%) 50%, hsl(43,38%,28%) 100%)",
            boxShadow:
              "0 4px 14px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.5)",
          }}
        />
      </div>
    </div>
  );
};

export default MallCeiling;
