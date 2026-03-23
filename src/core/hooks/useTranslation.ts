import { es } from "../../core/i18n/es";
import { en } from "../../core/i18n/en";

const translations = { es, en };

export const useTranslation = () => {
  // #region Implement navigator idiom
  const lang = "es"; 
  const t = translations[lang as keyof typeof translations];

  return { t, lang };
};