import ceilingFresco from "@/assets/ceiling-fresco.jpg";

const MallCeiling = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative mx-auto max-w-5xl">
        {/* Gold border frame */}
        <div className="border-4 border-mall-gold rounded-t-[50%] overflow-hidden shadow-2xl">
          <img
            src={ceilingFresco}
            alt="ציור תקרה קלאסי"
            className="w-full h-48 md:h-72 lg:h-80 object-cover"
            width={1920}
            height={640}
          />
        </div>
        {/* Gold ornamental bar below ceiling */}
        <div className="h-3 bg-gradient-to-r from-mall-gold/60 via-mall-gold to-mall-gold/60 shadow-inner" />
      </div>
    </div>
  );
};

export default MallCeiling;
