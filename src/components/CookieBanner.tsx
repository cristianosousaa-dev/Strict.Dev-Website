import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

interface CookieBannerProps {
  onOpenSettings: () => void;
}

export default function CookieBanner({ onOpenSettings }: CookieBannerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Mostrar banner após 1 segundo
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now()
    }));
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now()
    }));
    setShowBanner(false);
  };

  const content = {
    pt: {
      title: 'Este site utiliza cookies',
      description: 'Utilizamos cookies para melhorar a sua experiência de navegação, analisar o tráfego do site e personalizar conteúdo.',
      acceptAll: 'Aceitar Tudo',
      acceptNecessary: 'Apenas Necessários',
      customize: 'Personalizar'
    },
    en: {
      title: 'This site uses cookies',
      description: 'We use cookies to improve your browsing experience, analyze site traffic, and personalize content.',
      acceptAll: 'Accept All',
      acceptNecessary: 'Necessary Only',
      customize: 'Customize'
    }
  };

  const t = content[language];

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-50"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              
              <div className="flex-1 space-y-3">
                <h3 className="font-semibold text-foreground">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.description}
                </p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button
                    onClick={acceptAll}
                    className="cursor-pointer relative overflow-hidden group"
                    size="sm"
                  >
                    <span className="relative z-10">{t.acceptAll}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Button>
                  
                  <Button
                    onClick={acceptNecessary}
                    variant="outline"
                    className="cursor-pointer"
                    size="sm"
                  >
                    {t.acceptNecessary}
                  </Button>
                  
                  <Button
                    onClick={() => {
                      setShowBanner(false);
                      onOpenSettings();
                    }}
                    variant="ghost"
                    className="cursor-pointer"
                    size="sm"
                  >
                    {t.customize}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
