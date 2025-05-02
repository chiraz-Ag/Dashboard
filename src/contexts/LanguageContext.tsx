// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "fr";
const translations = {
  en: { settings: "Settings", appearance: "Appearance" /* ... */ },
  fr: { settings: "Paramètres", appearance: "Apparence" /* ... */ },
};

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations.en;
} | null>(null);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be inside LanguageProvider");
  return ctx;
};
