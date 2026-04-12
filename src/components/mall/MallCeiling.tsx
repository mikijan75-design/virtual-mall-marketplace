import mallCeiling from "@/assets/mall-ceiling.jpg";

const MallCeiling = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative mx-auto max-w-5xl">
        {/* Gold border frame */}
        <div
          className="rounded-t-[50%] overflow-hidden"
          style={{
            border: "3px solid hsl(43,50%,45%)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2), inset 0 0 30px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src={mallCeiling}
            alt="תקרת קניון יוקרתית"
            className="w-full h-48 md:h-72 lg:h-80 object-cover"
            width={1024}
            height={512}
          />
        </div>
        {/* Gold ornamental bar below ceiling */}
        <div
          className="h-4"
          style={{
            background: "linear-gradient(180deg, hsl(43,55%,50%), hsl(43,45%,42%), hsl(43,55%,50%))",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        />
      </div>
    </div>
  );
};

export default MallCeiling;
