"use client"

import { translations } from '@/translations';

export const useTranslation = () => {
  
  // Get the current locale or fallback to default
  const currentLocale = 'vi';
  // Function to translate a key
  const t = (key: string, params?: Record<string, string | number>): string => {
    // Get the translation for the current locale
    const translation = translations[currentLocale as keyof typeof translations]?.[key as keyof (typeof translations)[typeof currentLocale]] || key;
    
    // Replace any parameters in the translation
    if (params && typeof translation === 'string') {
      return Object.entries(params).reduce((acc, [key, value]) => {
        return acc.replace(new RegExp(`{${key}}`, 'g'), String(value));
      }, translation);
    }
    
    return translation;
  };
  
  // Function to change the locale
  // const changeLocale = (newLocale: string) => {
  //   if (locales?.includes(newLocale)) {
  //     router.push(router.pathname, router.asPath, { locale: newLocale });
  //   }
  // };
  
  return {
    t,
    locale: currentLocale,
    // changeLocale,
    locales: ['en', 'vi'],
  };
}; 