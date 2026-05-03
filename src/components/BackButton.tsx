import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      aria-label="חזור אחורה"
      className="fixed top-20 right-3 z-40 flex items-center gap-2 rounded-full bg-mall-sign/95 text-mall-gold px-3 py-1.5 shadow-lg border border-mall-gold/40 font-heebo text-sm md:text-base backdrop-blur hover:bg-mall-sign transition-colors"
    >
      <ArrowRight className="h-4 w-4" />
      <span>חזור</span>
    </button>
  );
};

export default BackButton;
