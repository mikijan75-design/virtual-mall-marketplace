import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import logo from "@/assets/shop-desing-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MallHeader = () => {
  return (
    <header className="bg-mall-sign text-primary-foreground shadow-lg sticky top-0 z-50">
      <div className="container mx-auto grid grid-cols-3 items-center py-3 px-4">
        <div className="flex justify-start">
          <img
            src={logo}
            alt="Shop Desing logo"
            className="h-12 md:h-16 w-auto rounded-full bg-background/95 p-1 shadow-md"
          />
        </div>
        <h1 className="text-center text-3xl md:text-5xl font-bubble font-semibold text-mall-gold tracking-wide drop-shadow-[0_2px_0_rgba(0,0,0,0.4)]">
          הקניון הווירטואלי
        </h1>
        <nav className="flex justify-end gap-1 md:gap-6 text-sm md:text-base font-heebo">
          <Link to="/" className="px-3 py-1 rounded hover:bg-mall-gold/20 transition-colors">דף הבית</Link>
          <Link to="/" className="px-3 py-1 rounded hover:bg-mall-gold/20 transition-colors">חנויות</Link>
          <Link to="/" className="px-3 py-1 rounded hover:bg-mall-gold/20 transition-colors">מבצעים</Link>
          <Link to="/" className="px-3 py-1 rounded hover:bg-mall-gold/20 transition-colors">בלוג</Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="px-3 py-1 rounded hover:bg-mall-gold/20 transition-colors outline-none">
              דפים
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-mall-sign text-primary-foreground border-mall-gold/40">
              <DropdownMenuItem asChild>
                <Link to="/sense-pro">דף מוצר - Sense Pro</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/" className="px-3 py-1 rounded hover:bg-mall-gold/20 transition-colors">צור קשר</Link>
          <Link
            to="/cart"
            aria-label="עגלה"
            className="relative px-3 py-1 rounded hover:bg-mall-gold/20 transition-colors flex items-center"
          >
            <ShoppingCart className="h-6 w-6 text-mall-gold" />
            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-mall-gold text-mall-sign text-xs font-bold flex items-center justify-center shadow">
              1
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default MallHeader;
