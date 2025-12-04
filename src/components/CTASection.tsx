import { motion } from 'motion/react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile, useReducedMotion } from '../hooks/useMediaQuery';

export default function CTASection() {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const enableComplexAnimations = !isMobile && !prefersReducedMotion;

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      const duration = isMobile ? 800 : 1200;
      const start = window.pageYOffset;
      const distance = offsetPosition - start;
      const startTime = performance.now();

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeInOutCubic(progress);
        
        window.scrollTo(0, start + distance * easeProgress);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  return (
    <section className="relative py-10 sm:py-24 overflow-hidden">
      
      {/* Premium Background */}
      <div className="absolute inset-0 -z-10">
        {enableComplexAnimations ? (
          <>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tl from-secondary/20 to-primary/20 rounded-full blur-3xl"
            />
          </>
        ) : (
          <>
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-primary/15 to-secondary/15 rounded-full blur-3xl opacity-30" />
            <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tl from-secondary/15 to-primary/15 rounded-full blur-3xl opacity-30" />
          </>
        )}
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: isMobile ? 0.3 : 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          
          {/* Card Container */}
          <div className="relative rounded-3xl overflow-hidden">
            
            {/* Animated Border Gradient */}
            {enableComplexAnimations && (
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 opacity-50"
                style={{
                  background: 'conic-gradient(from 0deg, var(--primary), var(--secondary), var(--primary))',
                  filter: 'blur(10px)',
                }}
              />
            )}

            {/* Card Content */}
            <div className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-3xl p-6 sm:p-12">
              
              {/* Shimmer Effect */}
              {enableComplexAnimations && (
                <motion.div
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 2,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
              )}

              <div className="relative z-10 text-center space-y-4 sm:space-y-6">
                
                {/* Title */}
                <h2 className="text-xl sm:text-3xl mb-2 sm:mb-4">
                  {t('cta.section.title')}
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-4 sm:mb-6">
                  {t('cta.section.description')}
                </p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: isMobile ? 0 : 0.3, duration: isMobile ? 0.2 : 0.5 }}
                  className="relative flex flex-col items-center gap-3"
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-full cursor-pointer group relative overflow-hidden hover:-translate-y-1"
                    style={{ 
                      transition: 'all 150ms ease-out',
                      willChange: 'transform'
                    }}
                  >
                    {/* Animated Background Shine */}
                    {enableComplexAnimations && (
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
                    )}
                    
                    <span className="font-bold text-sm relative z-10">
                      {t('cta.section.button')}
                    </span>
                    
                    {/* Pulse Ring */}
                    {enableComplexAnimations && (
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
                    )}
                  </motion.div>

                  {/* Badge "Resposta em 24h" - ABAIXO do botão */}
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: isMobile ? 0 : 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}