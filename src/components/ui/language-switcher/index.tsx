import { useTranslation } from '@/hooks/useTranslation';

export const LanguageSwitcher = () => {
  const { locale } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <button
        className={`px-2 py-1 rounded ${
          locale === 'vi' ? 'bg-accent text-white' : 'bg-gray-200'
        }`}
      >
        VI
      </button>
      <button
        className={`px-2 py-1 rounded ${
          locale === 'en' ? 'bg-accent text-white' : 'bg-gray-200'
        }`}
      >
        EN
      </button>
    </div>
  );
};  