import MallFooter from "@/components/mall/MallFooter";
import MallHeader from "@/components/mall/MallHeader";
import PageTracker from "@/components/PageTracker";
import InfrastructureBlueprintScene from "@/components/InfrastructureBlueprintScene";

const InfrastructureBlueprintPage = () => {
  return (
    <div className="min-h-screen bg-[#021b38] text-white">
      <MallHeader />
      <PageTracker />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 md:px-8">
        <section className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.45em] text-sky-200/75">
            Live coded technical sample
          </p>
          <h1 className="font-frank text-4xl font-black text-white md:text-6xl">
            Infrastructure Blueprint Lines
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-sky-50/75 md:text-lg">
            A responsive SVG recreation of the supplied blueprint image: wireframe shelving,
            perspective construction lines, display counters, and device infrastructure icons.
          </p>
        </section>

        <InfrastructureBlueprintScene />
      </main>

      <MallFooter />
    </div>
  );
};

export default InfrastructureBlueprintPage;
