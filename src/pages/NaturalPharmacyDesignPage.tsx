import BackButton from "@/components/BackButton";
import NaturalPharmacyWordmark, {
  NATURAL_PHARMACY_WORDMARK_DESIGN,
} from "@/components/mall/NaturalPharmacyWordmark";

const NaturalPharmacyDesignPage = () => {
  const design = NATURAL_PHARMACY_WORDMARK_DESIGN;
  const cssCode = `background-color: ${design.canvas.backgroundColor};
color: ${design.text.color};
font-family: ${design.text.fontFamily};
font-size: ${design.text.fontSize}px;
font-weight: ${design.text.fontWeight};
letter-spacing: ${design.text.letterSpacing}px;
caption: "${design.caption}";`;

  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground">
      <BackButton />
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Design reference
          </p>
          <h1 className="mt-3 text-3xl font-bold">רוקחות טבעית</h1>
          <p className="mt-3 text-muted-foreground">
            Saved caption, font, and background color for the provided image.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
          <NaturalPharmacyWordmark />
        </div>

        <dl className="grid w-full gap-3 rounded-2xl border border-border bg-card p-6 text-start shadow-sm sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted-foreground">Caption</dt>
            <dd className="font-semibold">{design.caption}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Background</dt>
            <dd className="font-semibold">{design.canvas.backgroundColor}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Text color</dt>
            <dd className="font-semibold">{design.text.color}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Font</dt>
            <dd className="font-semibold">{design.text.fontFamily}</dd>
          </div>
        </dl>

        <pre className="w-full overflow-x-auto rounded-2xl bg-mall-sign p-5 text-left text-sm text-mall-gold shadow-lg">
          <code>{cssCode}</code>
        </pre>
      </section>
    </main>
  );
};

export default NaturalPharmacyDesignPage;
