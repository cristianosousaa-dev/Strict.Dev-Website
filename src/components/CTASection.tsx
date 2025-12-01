import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile, useReducedMotion } from '../hooks/useMediaQuery';

export default function CTASection() {
  const { t } = useLanguage();
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
                
                {/* Icon */}
                <motion.div
                  animate={enableComplexAnimations ? {
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={enableComplexAnimations ? {
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  } : {}}
                  className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mb-1 sm:mb-2"
                >
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </motion.div>

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
                >
                  <Button
                    size="lg"
                    onClick={scrollToContact}
                    className={`group gap-2 rounded-full px-6 py-4 sm:px-8 sm:py-6 relative overflow-hidden ${!isMobile ? 'hover:scale-105 hover:-translate-y-1 animate-pulse-ring' : ''}`}
                    style={{
                      transition: isMobile ? 'none' : 'all 150ms ease-out',
                      willChange: isMobile ? 'auto' : 'transform'
                    }}
                  >
                    {enableComplexAnimations && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                    )}
                    <Sparkles className={`w-5 h-5 relative z-10 ${!isMobile ? 'group-hover:rotate-12 transition-transform duration-150' : ''}`} />
                    <span className="relative z-10">{t('cta.section.button')}</span>
                    <ArrowRight className={`w-5 h-5 relative z-10 ${!isMobile ? 'group-hover:translate-x-1 transition-transform duration-150' : ''}`} />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
