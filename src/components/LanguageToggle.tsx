import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle = ({ className }: LanguageToggleProps) => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className={cn(
        'flex items-center gap-1 px-2 py-1 text-sm font-medium transition-colors hover:text-gold border border-current/20 rounded',
        className
      )}
      aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <span className={cn(language === 'ar' && 'text-gold')}>ع</span>
      <span className="text-muted-foreground">/</span>
      <span className={cn(language === 'en' && 'text-gold')}>EN</span>
    </button>
  );
};

export default LanguageToggle;
