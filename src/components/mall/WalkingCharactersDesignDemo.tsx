import {
  walkingCharacterImageSample,
  walkingCharacters,
  type CharacterVectorShape,
  type WalkingCharacterSample,
} from "@/data/walkingCharacters";

const fallbackColors: Record<string, string> = {
  annotation: "#7c3aed",
  eye: "#18202c",
  mouth: "#7d2d2d",
  outline: "#3f3029",
  shadow: "#1f2937",
  white: "#ffffff",
};

const colorFor = (character: WalkingCharacterSample, token?: string) => {
  if (!token) {
    return "none";
  }

  return character.palette.find((sample) => sample.token === token)?.hex ?? fallbackColors[token] ?? token;
};

const VectorShape = ({
  character,
  shape,
}: {
  character: WalkingCharacterSample;
  shape: CharacterVectorShape;
}) => {
  if (shape.kind === "ellipse") {
    return (
      <ellipse
        cx={shape.cx}
        cy={shape.cy}
        rx={shape.rx}
        ry={shape.ry}
        fill={colorFor(character, shape.fillToken)}
        stroke={colorFor(character, shape.strokeToken)}
        strokeWidth={shape.strokeWidth}
        opacity={shape.opacity}
      />
    );
  }

  if (shape.kind === "circle") {
    return (
      <circle
        cx={shape.cx}
        cy={shape.cy}
        r={shape.r}
        fill={colorFor(character, shape.fillToken)}
        stroke={colorFor(character, shape.strokeToken)}
        strokeWidth={shape.strokeWidth}
        opacity={shape.opacity}
      />
    );
  }

  if (shape.kind === "line") {
    return (
      <line
        x1={shape.x1}
        y1={shape.y1}
        x2={shape.x2}
        y2={shape.y2}
        stroke={colorFor(character, shape.strokeToken)}
        strokeWidth={shape.strokeWidth}
        strokeLinecap={shape.lineCap}
        opacity={shape.opacity}
      />
    );
  }

  return (
    <path
      d={shape.d}
      fill={colorFor(character, shape.fillToken)}
      stroke={colorFor(character, shape.strokeToken)}
      strokeWidth={shape.strokeWidth}
      strokeLinecap={shape.lineCap}
      strokeLinejoin={shape.lineJoin}
      opacity={shape.opacity}
    />
  );
};

const WalkingFigure = ({ character }: { character: WalkingCharacterSample }) => {
  const scale = character.bounds.height / character.illustration.viewBox.height;
  const translateX = character.bounds.x + character.bounds.width / 2 - (character.illustration.viewBox.width * scale) / 2;

  return (
    <g transform={`translate(${translateX} ${character.bounds.y}) scale(${scale})`}>
      <title>{character.label}</title>
      <ellipse
        cx={character.illustration.shadow.cx}
        cy={character.illustration.shadow.cy}
        rx={character.illustration.shadow.rx}
        ry={character.illustration.shadow.ry}
        fill={colorFor(character, character.illustration.shadow.fillToken)}
        opacity={character.illustration.shadow.opacity}
      />
      {character.illustration.backLayer.map((shape) => (
        <VectorShape key={shape.id} character={character} shape={shape} />
      ))}
      {character.illustration.bodyLayer.map((shape) => (
        <VectorShape key={shape.id} character={character} shape={shape} />
      ))}
      {character.illustration.detailLayer.map((shape) => (
        <VectorShape key={shape.id} character={character} shape={shape} />
      ))}
      {character.illustration.annotationLayer.map((shape) => (
        <VectorShape key={shape.id} character={character} shape={shape} />
      ))}
    </g>
  );
};

const PaletteSwatches = ({ character }: { character: WalkingCharacterSample }) => (
  <div className="mt-3 flex flex-wrap gap-1.5" aria-label={`${character.label} sampled colors`}>
    {character.palette.map((sample) => (
      <span
        key={sample.token}
        className="inline-flex h-6 w-6 rounded-full border border-slate-900/20 shadow-sm"
        style={{ backgroundColor: sample.hex }}
        title={`${sample.token}: ${sample.hex} - ${sample.sampledFrom}`}
      />
    ))}
  </div>
);

const CharacterSummaryCard = ({ character }: { character: WalkingCharacterSample }) => (
  <article className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Person {character.order}</p>
        <h3 className="mt-1 text-base font-black text-slate-900">{character.label}</h3>
      </div>
      <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-bold text-white">
        {character.hair.style}
      </span>
    </div>

    <p className="mt-3 text-sm leading-relaxed text-slate-600">{character.pose}</p>
    <p className="mt-2 text-sm leading-relaxed text-slate-600">{character.hair.description}</p>

    <div className="mt-4 grid gap-2 text-xs text-slate-600">
      <div className="rounded-xl bg-slate-50 p-3">
        <span className="font-bold text-slate-900">Pose angles:</span>{" "}
        torso {character.poseAngles.torsoLeanDeg}deg, front leg {character.poseAngles.frontLegDeg}deg, back leg{" "}
        {character.poseAngles.backLegDeg}deg
      </div>
      <div className="rounded-xl bg-slate-50 p-3">
        <span className="font-bold text-slate-900">Proportions:</span> shoulders{" "}
        {character.proportions.shoulderWidthPx}px, hips {character.proportions.hipWidthPx}px, legs{" "}
        {character.proportions.legLengthPx}px
      </div>
    </div>

    <PaletteSwatches character={character} />

    <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
      {character.samplePoints.slice(0, 4).map((point) => (
        <div key={point.id} className="rounded-xl border border-slate-100 bg-slate-50 p-2">
          <dt className="font-bold text-slate-900">{point.label}</dt>
          <dd className="mt-0.5 text-slate-500">
            ({point.x}, {point.y}) {point.hex}
          </dd>
        </div>
      ))}
    </dl>
  </article>
);

const WalkingCharactersDesignDemo = () => (
  <section className="bg-gradient-to-b from-slate-50 to-white px-4 py-12 md:px-8" aria-labelledby="walking-character-demo-title">
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-700">Sampled people element</p>
        <h2 id="walking-character-demo-title" className="mt-2 text-3xl font-black text-slate-950 md:text-4xl">
          Data-driven walking character study
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-600">
          The four people from the reference are now represented as structured data and rendered from that same data:
          bounds, pose, palette, clothing layers, hair, face details, and stride annotations.
        </p>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
        <div className="border-b border-slate-100 bg-slate-950 px-5 py-3 text-sm font-bold text-white">
          {walkingCharacterImageSample.description}
        </div>
        <svg
          viewBox={`0 0 ${walkingCharacterImageSample.canvas.width} 360`}
          role="img"
          aria-label="Data-driven SVG rendering of four sampled walking characters"
          className="block h-auto w-full"
        >
          <rect width={walkingCharacterImageSample.canvas.width} height="360" fill={walkingCharacterImageSample.background} />
          <path d="M72 328 H982" stroke="#d5dce8" strokeWidth="2" strokeDasharray="8 10" />
          <path d="M72 330 C196 338 310 326 430 332 S686 338 805 330 934 326 982 332" fill="none" stroke="#eef2f7" strokeWidth="18" strokeLinecap="round" />

          {walkingCharacters.map((character) => (
            <g key={character.id}>
              <rect
                x={character.bounds.x}
                y={character.bounds.y}
                width={character.bounds.width}
                height={character.bounds.height}
                fill="none"
                stroke="#7c3aed"
                strokeWidth="1.25"
                strokeDasharray="6 7"
                opacity="0.45"
              />
              <WalkingFigure character={character} />
              <text x={character.bounds.x} y={character.bounds.y - 10} fill="#334155" fontSize="16" fontWeight="800">
                {character.order}. {character.presentation}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {walkingCharacters.map((character) => (
          <CharacterSummaryCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  </section>
);

export default WalkingCharactersDesignDemo;
