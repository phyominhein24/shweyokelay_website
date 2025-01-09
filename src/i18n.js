import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./assets/translation/en/translation.json";
import translationMM from "./assets/translation/mm/translation.json";

const resources = {
  en: { translation: translationEN },
  mm: { translation: translationMM },
};

i18n
  .use(LanguageDetector) // Automatically detects the user's language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: "en", // Default language if user's language isn't available
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
