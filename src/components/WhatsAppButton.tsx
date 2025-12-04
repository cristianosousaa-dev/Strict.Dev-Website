import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useLanguage } from '../contexts/LanguageContext';

// Logo do Strict.Dev - ficheiro deve estar em /public/logo.png
const logo = '/logo.png';

// WhatsApp Icon Component - Adapts to theme colors
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { t } = useLanguage();

  const phoneNumber = '351910205459';

  const handleSendMessage = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const text = message || t('whatsapp.defaultMessage');
    
    // 🔥 GOOGLE ANALYTICS - Track WhatsApp Click
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_click', {
        'event_category': 'Contact',
        'event_label': 'WhatsApp Button Click',
        'value': 1
      });
    }
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setMessage('');
  };

  const toggleChat = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ position: 'fixed', bottom: '3.5rem', right: '1.5rem', zIndex: 9999 }} onClick={(e) => e.stopPropagation()} className="sm:right-6">
      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, type: 'spring' }}
            className="absolute bottom-[4.5rem] right-0 w-[280px] sm:w-[320px] max-w-[400px] z-40 bg-background rounded-2xl shadow-2xl border border-current/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-primary to-secondary p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img src={logo} className="w-full h-full object-cover" alt="Strict.Dev Logo" />
              </div>
              <div className="flex-1 text-white">
                <h3 className="text-white">Strict.Dev</h3>
                <p className="text-xs text-white/80">Online</p>
              </div>
            </div>

            {/* Chat Content */}
            <div className="p-4 space-y-4 bg-background">
              <div className="bg-primary/10 rounded-2xl rounded-tl-none p-4">
                <p className="text-sm text-foreground">
                  {t('whatsapp.greeting')}<br />
                  {t('whatsapp.subtitle')}
                </p>
              </div>

              <div>
                <label htmlFor="whatsapp-message" className="block text-sm mb-2 text-foreground/80">
                  {t('whatsapp.label')}
                </label>
                <Textarea
                  id="whatsapp-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('whatsapp.placeholder')}
                  className="rounded-xl resize-none bg-background text-foreground border-current/20"
                  rows={3}
                />
              </div>

              <Button
                onClick={handleSendMessage}
                className="gap-2 rounded-xl bg-gradient-to-br from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white group relative overflow-hidden cursor-pointer will-change-transform w-full"
                style={{ 
                  transition: 'all 150ms ease-out',
                  willChange: 'transform'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05) translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <WhatsAppIcon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{t('whatsapp.send')}</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 300 }}
        onClick={toggleChat}
        aria-label={isOpen ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
        aria-expanded={isOpen}
        title="Contact us on WhatsApp"
        style={{
          position: 'relative',
          width: '3rem',
          height: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '9999px',
          cursor: 'pointer',
          willChange: 'transform, box-shadow',
          zIndex: 50,
        }}
        className="bg-gradient-to-br from-primary to-secondary shadow-lg hover:shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all duration-150 group"
        aria-label="WhatsApp"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white relative z-10" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-white relative z-10" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Ripple Effect */}
        {!isOpen && (
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-full bg-primary/40"
          />
        )}
      </motion.button>
    </div>
  );
}