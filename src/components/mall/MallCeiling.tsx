import mallCeiling from "@/assets/fresco-ceiling.jpg";

const MallCeiling = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative mx-auto max-w-6xl">
        {/* Dome arch fresco with gilded frame */}
        <div
          className="relative rounded-t-[50%] overflow-hidden"
          style={{
            border: "6px solid hsl(43,55%,45%)",
            boxShadow:
              "0 12px 40px rgba(0,0,0,0.45), inset 0 0 60px rgba(0,0,0,0.25), 0 0 0 2px hsl(43,40%,30%)",
          }}
        >
          <img
            src={mallCeiling}
            alt="פרסקו תקרת קניון בסגנון רנסנס"
            className="w-full h-56 md:h-80 lg:h-96 object-cover"
            width={1920}
            height={768}
          />
          {/* Inner soft vignette to simulate dome curvature */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, transparent 40%, rgba(0,0,0,0.35) 100%)",
            }}
          />
        </div>
        {/* Gold ornamental cornice */}
        <div
          className="h-5"
          style={{
            background:
              "linear-gradient(180deg, hsl(43,65%,58%), hsl(43,55%,42%) 50%, hsl(43,40%,30%))",
            boxShadow:
              "0 4px 14px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.4)",
          }}
        />
      </div>
    </div>
  );
};

export default MallCeiling;
