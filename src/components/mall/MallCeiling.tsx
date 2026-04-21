import mallCeiling from "@/assets/fresco-ceiling.jpg";

const MallCeiling = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-2 md:px-4">
        {/* Wide shallow dome (half-ellipse) fresco like the reference image */}
        <div
          className="relative overflow-hidden"
          style={{
            borderTopLeftRadius: "50% 100%",
            borderTopRightRadius: "50% 100%",
            border: "5px solid hsl(43,55%,45%)",
            borderBottom: "none",
            boxShadow:
              "0 14px 44px rgba(0,0,0,0.5), inset 0 0 80px rgba(0,0,0,0.3), 0 0 0 2px hsl(43,40%,30%)",
          }}
        >
          <img
            src={mallCeiling}
            alt="פרסקו תקרת קניון בסגנון רנסנס"
            className="w-full h-40 md:h-56 lg:h-64 object-cover"
            style={{
              objectPosition: "center top",
            }}
            width={1920}
            height={512}
          />
          {/* Inner soft vignette to simulate dome curvature */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, transparent 35%, rgba(0,0,0,0.4) 100%)",
            }}
          />
        </div>
        {/* Gold ornamental cornice (base of the dome) */}
        <div
          className="h-3 md:h-4"
          style={{
            background:
              "linear-gradient(180deg, hsl(43,65%,60%), hsl(43,55%,42%) 50%, hsl(43,40%,28%))",
            boxShadow:
              "0 4px 14px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.5)",
          }}
        />
      </div>
    </div>
  );
};

export default MallCeiling;
