import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const MallHeader = () => {
  return (
    <header className="bg-mall-sign text-primary-foreground shadow-lg sticky top-0 z-50">
      <div className="container mx-auto grid grid-cols-3 items-center py-3 px-4">
        <div className="flex justify-start">
          <img
            src={logo}
            alt="לוגו הקניון הווירטואלי"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-mall-gold shadow-md bg-white"
          />
        </div>
        <h1
          className="text-center text-2xl md:text-4xl font-bold text-mall-gold tracking-wide"
          style={{ fontFamily: "'Bubblegum Sans', 'Fredoka', cursive", letterSpacing: "0.04em" }}
        >
          הקניון הווירטואלי
        </h1>
        <nav className="flex justify-end gap-1 md:gap-4 text-sm md:text-base font-heebo">
          <Link to="/" className="px-3 py-1 rounded hover:bg-mall-gold/20 transition-colors">דף הבית</Link>
          <Link to="/" className="px-3 py-1 rounded hover:bg-mall-gold/20 transition-colors">חנויות</Link>
          <Link to="/" className="px-3 py-1 rounded hover:bg-mall-gold/20 transition-colors">מבצעים</Link>
          <Link to="/" className="hidden md:inline-block px-3 py-1 rounded hover:bg-mall-gold/20 transition-colors">בלוג</Link>
          <Link to="/" className="hidden md:inline-block px-3 py-1 rounded hover:bg-mall-gold/20 transition-colors">צור קשר</Link>
        </nav>
      </div>
    </header>
  );
};

export default MallHeader;
