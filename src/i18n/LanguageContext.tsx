import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, TranslationKey } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKey;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_KEY = 'magadh_explora_language';

// Map of country codes to languages
const countryToLanguage: Record<string, Language> = {
  CN: 'zh', // China
  TW: 'zh', // Taiwan
  HK: 'zh', // Hong Kong
  JP: 'ja', // Japan
  IN: 'hi', // India (default to Hindi, can be changed)
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  // Detect language based on IP on first load
  useEffect(() => {
    const detectLanguage = async () => {
      // Check localStorage first
      const savedLanguage = localStorage.getItem(LANGUAGE_KEY) as Language | null;
      if (savedLanguage && translations[savedLanguage]) {
        setLanguageState(savedLanguage);
        setIsInitialized(true);
        return;
      }

      // Try to detect from browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'zh') {
        setLanguageState('zh');
        localStorage.setItem(LANGUAGE_KEY, 'zh');
        setIsInitialized(true);
        return;
      }
      if (browserLang === 'ja') {
        setLanguageState('ja');
        localStorage.setItem(LANGUAGE_KEY, 'ja');
        setIsInitialized(true);
        return;
      }
      if (browserLang === 'hi') {
        setLanguageState('hi');
        localStorage.setItem(LANGUAGE_KEY, 'hi');
        setIsInitialized(true);
        return;
      }

      // Try IP-based detection as fallback
      try {
        const response = await fetch('https://ipapi.co/json/', { 
          signal: AbortSignal.timeout(3000) 
        });
        const data = await response.json();
        const detectedLang = countryToLanguage[data.country_code] || 'en';
        setLanguageState(detectedLang);
        localStorage.setItem(LANGUAGE_KEY, detectedLang);
      } catch {
        // Default to English if detection fails
        setLanguageState('en');
      }
      setIsInitialized(true);
    };

    detectLanguage();
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
  };

  const t = translations[language];

  if (!isInitialized) {
    return null; // Or a loading spinner
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
