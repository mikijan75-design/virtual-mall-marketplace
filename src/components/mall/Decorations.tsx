type FruitKind = "orange" | "strawberry" | "lemon" | "apple";

const Fruit = ({ kind, top, left }: { kind: FruitKind; top: string; left: string }) => {
  const styles: Record<FruitKind, { bg: string; w: string; h: string; rounded: string }> = {
    orange: {
      bg: "radial-gradient(circle at 35% 30%, hsl(30,100%,68%), hsl(20,95%,48%))",
      w: "w-2 md:w-2.5", h: "h-2 md:h-2.5", rounded: "rounded-full",
    },
    strawberry: {
      bg: "radial-gradient(circle at 35% 25%, hsl(355,90%,68%), hsl(350,85%,42%))",
      w: "w-2 md:w-2.5", h: "h-2.5 md:h-3", rounded: "rounded-b-full",
    },
    lemon: {
      bg: "radial-gradient(circle at 35% 30%, hsl(55,100%,75%), hsl(48,95%,52%))",
      w: "w-2.5 md:w-3", h: "h-2 md:h-2.5", rounded: "rounded-full",
    },
    apple: {
      bg: "radial-gradient(circle at 35% 30%, hsl(5,80%,60%), hsl(0,75%,38%))",
      w: "w-2 md:w-2.5", h: "h-2 md:h-2.5", rounded: "rounded-full",
    },
  };
  const s = styles[kind];
  return (
    <div
      className={`absolute ${s.w} ${s.h} ${s.rounded}`}
      style={{ top, left, background: s.bg, boxShadow: "0 1px 2px rgba(0,0,0,0.35)" }}
    />
  );
};

const TreeDecoration = ({ fruit }: { fruit: FruitKind }) => (
  <div className="flex flex-col items-center">
    {/* Lush canopy */}
    <div className="relative w-14 h-14 md:w-20 md:h-20">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 35% 25%, hsl(95,55%,55%), hsl(125,48%,30%) 65%, hsl(130,42%,20%))",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.3), inset 0 -3px 8px rgba(0,0,0,0.3), inset 0 3px 6px rgba(255,255,255,0.12)",
        }}
      />
      <div
        className="absolute -left-1 top-2 w-7 h-7 md:w-10 md:h-10 rounded-full opacity-90"
        style={{ background: "radial-gradient(ellipse at 40% 30%, hsl(105,52%,50%), hsl(125,45%,28%))" }}
      />
      <div
        className="absolute -right-1 top-3 w-7 h-7 md:w-10 md:h-10 rounded-full opacity-90"
        style={{ background: "radial-gradient(ellipse at 60% 30%, hsl(115,50%,48%), hsl(130,42%,26%))" }}
      />
      {/* Fruits scattered */}
      <Fruit kind={fruit} top="22%" left="22%" />
      <Fruit kind={fruit} top="45%" left="62%" />
      <Fruit kind={fruit} top="62%" left="32%" />
      <Fruit kind={fruit} top="35%" left="48%" />
      <Fruit kind={fruit} top="58%" left="72%" />
    </div>
    {/* Trunk */}
    <div
      className="w-2 h-3 md:w-2.5 md:h-4 -mt-1.5"
      style={{ background: "linear-gradient(180deg, hsl(28,45%,38%), hsl(22,40%,22%))" }}
    />
    {/* Pot */}
    <div
      className="w-7 h-3 md:w-9 md:h-4 rounded-b-md"
      style={{
        background: "linear-gradient(180deg, hsl(20,55%,55%), hsl(15,50%,32%))",
        boxShadow: "0 3px 6px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.2)",
        borderTop: "1.5px solid hsl(22,45%,62%)",
      }}
    />
  </div>
);

const Decorations = () => {
  const fruits: FruitKind[] = ["orange", "strawberry", "lemon", "apple", "strawberry", "orange"];
  return (
    <div className="flex justify-between items-end max-w-5xl mx-auto px-6 py-4">
      <TreeDecoration fruit={fruits[0]} />
      <TreeDecoration fruit={fruits[1]} />
      <div className="hidden md:block"><TreeDecoration fruit={fruits[2]} /></div>
      <div className="hidden md:block"><TreeDecoration fruit={fruits[3]} /></div>
      <TreeDecoration fruit={fruits[4]} />
      <TreeDecoration fruit={fruits[5]} />
    </div>
  );
};

export default Decorations;
