import { createContext, useContext, useState, ReactNode } from "react";
import { en } from "../locales/en";
import { vi } from "../locales/vi";

type Language = "en" | "vi";
type Translations = typeof en;

type TranslationContextType = {
  t: Translations;
  language: Language;
  setLanguage: (lang: Language) => void;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get from localStorage or use browser language
    if (typeof localStorage !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language;
      if (savedLanguage) return savedLanguage;
    }

    const browserLang = navigator.language.split("-")[0];
    return browserLang === "vi" ? "vi" : "en";
  });

  const translations = language === "en" ? en : vi;

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <TranslationContext.Provider value={{ t: translations, language, setLanguage: handleSetLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};