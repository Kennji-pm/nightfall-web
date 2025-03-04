import { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { Globe } from "lucide-react";

export function LanguageSelector() {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const switchLanguage = (lang: "en" | "vi") => {
    setLanguage(lang);
    closeDropdown();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="p-2 cursor-pointer rounded-full bg-secondary transition-all duration-300 hover:bg-secondary/80 active:scale-95 flex items-center gap-1"
        aria-label="Select language"
      >
        <Globe className="h-5 w-5 text-foreground" />
        <span className="text-sm font-medium uppercase">{language}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={closeDropdown}
          />
          <div className="absolute right-0 mt-2 w-32 rounded-xl overflow-hidden shadow-lg bg-background border border-border z-20 animate-fade-in">
            <button
              onClick={() => switchLanguage("en")}
              className={`block cursor-pointer w-full text-left px-4 py-2 hover:bg-secondary transition-colors duration-200 ${
                language === "en" ? "bg-primary/10 font-medium" : ""
              }`}
            >
              English
            </button>
            <button
              onClick={() => switchLanguage("vi")}
              className={`block cursor-pointer w-full text-left px-4 py-2 hover:bg-secondary transition-colors duration-200 ${
                language === "vi" ? "bg-primary/10 font-medium" : ""
              }`}
            >
              Tiếng Việt
            </button>
          </div>
        </>
      )}
    </div>
  );
}