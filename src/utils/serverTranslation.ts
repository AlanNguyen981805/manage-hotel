import { translations } from '@/translations';

export const getTranslation = (locale: string = 'vi') => {
  // Ensure we have a valid locale
  const validLocale = (locale && (locale === 'en' || locale === 'vi')) ? locale : 'vi';
  
  // Function to translate a key
  const t = (key: string, params?: Record<string, string | number>): string => {
    // Get the translation for the current locale
    const translation = translations[validLocale as keyof typeof translations]?.[key] || key;
    
    // Replace any parameters in the translation
    if (params && typeof translation === 'string') {
      return Object.entries(params).reduce((acc, [key, value]) => {
        return acc.replace(new RegExp(`{${key}}`, 'g'), String(value));
      }, translation);
    }
    
    return translation;
  };
  
  return {
    t,
    locale: validLocale,
  };
}; 