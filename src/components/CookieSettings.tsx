import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, Shield, BarChart, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

interface CookieSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CookieSettings({ isOpen, onClose }: CookieSettingsProps) {
  const [necessary, setNecessary] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      const consent = localStorage.getItem('cookieConsent');
      if (consent) {
        const parsed = JSON.parse(consent);
        setNecessary(parsed.necessary ?? true);
        setAnalytics(parsed.analytics ?? false);
        setMarketing(parsed.marketing ?? false);
      }
    }
  }, [isOpen]);

  const savePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary,
      analytics,
      marketing,
      timestamp: Date.now()
    }));
    onClose();
  };

  const content = {
    pt: {
      title: 'Preferências de Cookies',
      description: 'Gerencie as suas preferências de cookies. Pode alterá-las a qualquer momento.',
      necessary: 'Cookies Necessários',
      necessaryDesc: 'Essenciais para o funcionamento básico do site.',
      analytics: 'Cookies Analíticos',
      analyticsDesc: 'Ajudam-nos a entender como utiliza o site.',
      marketing: 'Cookies de Marketing',
      marketingDesc: 'Utilizados para mostrar anúncios relevantes.',
      save: 'Guardar Preferências',
      cancel: 'Cancelar'
    },
    en: {
      title: 'Cookie Preferences',
      description: 'Manage your cookie preferences. You can change them at any time.',
      necessary: 'Necessary Cookies',
      necessaryDesc: 'Essential for basic site functionality.',
      analytics: 'Analytics Cookies',
      analyticsDesc: 'Help us understand how you use the site.',
      marketing: 'Marketing Cookies',
      marketingDesc: 'Used to show relevant advertisements.',
      save: 'Save Preferences',
      cancel: 'Cancel'
    }
  };

  const t = content[language];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg mx-4 z-50"
          >
            <div className="bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>
                
                <div className="flex-1">
                  <h2 className="font-semibold text-xl text-foreground mb-2">{t.title}</h2>
                  <p className="text-sm text-muted-foreground">{t.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="p-4 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <Shield className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-foreground mb-1">{t.necessary}</h3>
                        <p className="text-sm text-muted-foreground">{t.necessaryDesc}</p>
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="p-4 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <BarChart className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-foreground mb-1">{t.analytics}</h3>
                        <p className="text-sm text-muted-foreground">{t.analyticsDesc}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setAnalytics(!analytics)}
                      className="flex-shrink-0 cursor-pointer"
                    >
                      {analytics ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="p-4 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <Cookie className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-foreground mb-1">{t.marketing}</h3>
                        <p className="text-sm text-muted-foreground">{t.marketingDesc}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setMarketing(!marketing)}
                      className="flex-shrink-0 cursor-pointer"
                    >
                      {marketing ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={savePreferences}
                  className="flex-1 cursor-pointer relative overflow-hidden group"
                >
                  <span className="relative z-10">{t.save}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="cursor-pointer"
                >
                  {t.cancel}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}