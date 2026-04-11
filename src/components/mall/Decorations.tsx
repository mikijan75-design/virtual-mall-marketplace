const TreeDecoration = () => (
  <div className="flex flex-col items-center">
    <div className="w-6 h-8 md:w-8 md:h-10 bg-green-600 rounded-full shadow-md" />
    <div className="w-1.5 h-4 md:w-2 md:h-5 bg-amber-800 rounded-b" />
  </div>
);

const Decorations = () => {
  return (
    <div className="flex justify-between max-w-5xl mx-auto px-6 py-2">
      <TreeDecoration />
      <TreeDecoration />
      <div className="hidden md:block"><TreeDecoration /></div>
      <div className="hidden md:block"><TreeDecoration /></div>
      <TreeDecoration />
      <TreeDecoration />
    </div>
  );
};

export default Decorations;
