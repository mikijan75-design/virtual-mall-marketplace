import { Link } from "react-router-dom";

const MallHeader = () => {
  return (
    <header className="bg-mall-sign text-primary-foreground shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <h1 className="text-2xl md:text-3xl font-frank font-bold text-mall-gold tracking-wide">
          הקניון הווירטואלי
        </h1>
        <nav className="flex gap-1 md:gap-6 text-sm md:text-base font-heebo">
          <Link to="/" className="px-3 py-1 rounded hover:bg-mall-gold/20 transition-colors">דף הבית</Link>
          <Link to="/" className="px-3 py-1 rounded hover:bg-mall-gold/20 transition-colors">חנויות</Link>
          <Link to="/" className="px-3 py-1 rounded hover:bg-mall-gold/20 transition-colors">מבצעים</Link>
          <Link to="/" className="px-3 py-1 rounded hover:bg-mall-gold/20 transition-colors">בלוג</Link>
          <Link to="/" className="px-3 py-1 rounded hover:bg-mall-gold/20 transition-colors">צור קשר</Link>
        </nav>
      </div>
    </header>
  );
};

export default MallHeader;
