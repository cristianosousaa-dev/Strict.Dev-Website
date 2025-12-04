import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Clock, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

export default function ExitIntentPopup() {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Verifica se já foi mostrado nesta sessão
    const shown = sessionStorage.getItem('strictdev-exit-shown');
    if (shown) {
      setHasShown(true);
      return;
    }

    let exitIntentTimeout: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Detecta quando o mouse sai pelo topo da página
      if (e.clientY <= 10 && !hasShown) {
        // Pequeno delay para evitar triggers acidentais
        exitIntentTimeout = setTimeout(() => {
          setIsVisible(true);
          setHasShown(true);
          sessionStorage.setItem('strictdev-exit-shown', 'true');
        }, 200);
      }
    };

    const handleMouseEnter = () => {
      // Cancela o timeout se o mouse voltar
      if (exitIntentTimeout) {
        clearTimeout(exitIntentTimeout);
      }
    };

    // Só ativa após 5 segundos na página (evita trigger imediato)
    const activationTimeout = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);
    }, 5000);

    return () => {
      clearTimeout(activationTimeout);
      clearTimeout(exitIntentTimeout);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const scrollToContact = () => {
    setIsVisible(false);
    const element = document.getElementById('contact');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Popup Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="relative w-full max-w-2xl pointer-events-auto"
            >
              <div className="relative bg-background rounded-3xl shadow-2xl border border-border overflow-hidden">
                
                {/* Premium Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
                
                {/* Animated Gradient Border */}
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0%, var(--primary) 25%, transparent 50%, var(--secondary) 75%, transparent 100%)',
                    filter: 'blur(20px)',
                  }}
                />

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-primary/10 rounded-full"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="relative p-8 sm:p-12">
                  
                  {/* Icon + Title */}
                  <div className="text-center mb-6">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mb-4"
                    >
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </motion.div>
                    
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-2"
                    >
                      {t('cta.exit.title')}
                    </motion.h2>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg text-primary font-medium"
                    >
                      {t('cta.exit.subtitle')}
                    </motion.p>
                  </div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center text-muted-foreground mb-8 max-w-lg mx-auto"
                  >
                    {t('cta.exit.description')}
                  </motion.p>

                  {/* Benefits Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
                  >
                    {[
                      { icon: CheckCircle2, text: t('cta.exit.benefit1') },
                      { icon: Clock, text: t('cta.exit.benefit2') },
                      { icon: Shield, text: t('cta.exit.benefit3') },
                    ].map((benefit, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10"
                      >
                        <benefit.icon className="w-6 h-6 text-primary" />
                        <span className="text-sm text-center">{benefit.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center relative items-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ 
                          scale: 1,
                          y: [0, -8, 0]
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                          scale: { duration: 0.3 },
                          y: { 
                            duration: 2.5, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                          }
                        }}
                        onClick={scrollToContact}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-full transition-all duration-300 cursor-pointer group relative overflow-hidden"
                      >
                        {/* Animated Background Shine */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{
                            x: ['-200%', '200%']
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                        
                        <span className="font-bold text-sm relative z-10">
                          {t('cta.exit.button')}
                        </span>
                        
                        {/* Pulse Ring */}
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-primary-foreground/30"
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>

                      {/* Badge "Resposta em 24h" - ABAIXO do botão */}
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                      >
                        <div className="relative group">
                          {/* Glow sutil atrás */}
                          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 opacity-60" />
                          
                          {/* Badge content */}
                          <div className="relative px-4 py-1 rounded-full bg-gradient-to-r from-background/95 to-background/90 border border-primary/30 backdrop-blur-xl shadow-lg">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                              <span className="text-[11px] tracking-wide uppercase text-foreground/90 font-medium whitespace-nowrap">
                                {language === 'pt' ? 'Resposta em 24h' : '24h Response Time'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    <Button
                      size="lg"
                      variant="ghost"
                      onClick={handleClose}
                      className="rounded-full px-8 hover:bg-primary/5"
                    >
                      {t('cta.exit.close')}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}