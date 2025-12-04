import { motion, useScroll, useTransform } from 'motion/react';
import { Star } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile, useReducedMotion } from '../hooks/useMediaQuery';
import { memo } from 'react';

// Logo do Strict.Dev - ficheiro deve estar em /public/logo.png
const logoImage = '/logo.png';

const Hero = memo(function Hero() {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  
  const enableComplexAnimations = !isMobile && !prefersReducedMotion;
  const enableParticles = !prefersReducedMotion; // Partículas ativadas no mobile também
  
  // OTIMIZAÇÃO: Parallax desativado em mobile e reduced motion
  const logoScale = useTransform(scrollY, [0, 300], enableComplexAnimations ? [1, 0.85] : [1, 1]);
  const logoOpacity = useTransform(scrollY, [0, 300], enableComplexAnimations ? [1, 0] : [1, 1]);
  
  const scrollToContact = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Ultra Premium Background */}
      <div className="absolute inset-0 -z-10">
        {/* Massive Gradient Orbs */}
        {enableComplexAnimations && (
          <>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-gradient-to-br from-primary/30 via-secondary/20 to-transparent rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [360, 180, 0],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute bottom-0 -right-1/4 w-[1200px] h-[1200px] bg-gradient-to-tl from-secondary/30 via-primary/20 to-transparent rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/20 via-secondary/30 to-primary/20 rounded-full blur-3xl"
            />

            {/* Premium Floating Particles */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -40, 0],
                    x: [0, Math.random() * 30 - 15, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Mobile Simple Background */}
        {!enableComplexAnimations && (
          <>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl opacity-20" />
          </>
        )}
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-32 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Ultra Premium Logo Section */}
          <motion.div
            style={enableComplexAnimations ? { scale: logoScale, opacity: logoOpacity } : { opacity: 1 }}
            className={`flex flex-col items-center justify-center mb-6 sm:mb-12 ${isMobile ? '-mt-20' : ''}`}
          >
            
            {/* Logo Container - Apenas efeitos, SEM cartão, SEM floating */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: isMobile ? 0.5 : 1.2,
                ease: isMobile ? 'easeOut' : [0.34, 1.56, 0.64, 1],
              }}
              className={isMobile ? "relative w-32 h-32" : "relative w-36 h-36"}
            >
              


              {/* Orbital Rings - Premium - DESATIVADO NO MOBILE */}
              {enableComplexAnimations && !isMobile && (
                <>
                  {/* Anel Externo */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ width: '140%', height: '140%', left: '-20%', top: '-20%' }}
                  >
                    <div className="w-full h-full rounded-full border border-primary/30" />
                  </motion.div>
                  
                  {/* Anel Médio */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ width: '120%', height: '120%', left: '-10%', top: '-10%' }}
                  >
                    <div className="w-full h-full rounded-full border-2 border-dashed border-secondary/30" />
                  </motion.div>
                  
                  {/* Anel Interno */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ width: '100%', height: '100%' }}
                  >
                    <div className="w-full h-full rounded-full border border-dotted border-primary/20" />
                  </motion.div>
                </>
              )}

              {/* Logo - SEM glow e SEM floating */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={logoImage}
                  alt="Strict.Dev Logo"
                  className="w-full h-full relative z-10"
                />
              </div>

              {/* Corner Stars - DESATIVADO NO MOBILE */}
              {enableComplexAnimations && !isMobile && (
                <>
                  {[0, 90, 180, 270].map((angle, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        rotate: 360,
                        scale: [1, 1.4, 1],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.2,
                      }}
                      className="absolute"
                      style={{
                        top: angle === 0 || angle === 90 ? '-12px' : 'auto',
                        bottom: angle === 180 || angle === 270 ? '-12px' : 'auto',
                        left: angle === 0 || angle === 270 ? '-12px' : 'auto',
                        right: angle === 90 || angle === 180 ? '-12px' : 'auto',
                      }}
                    >
                      <Star className="w-3 h-3 text-primary fill-primary" />
                    </motion.div>
                  ))}
                </>
              )}

              {/* Partículas Orbitais - DESATIVADAS NO MOBILE */}
              {enableParticles && !isMobile && (
                <>
                  {[...Array(8)].map((_, i) => {
                    const angle = (i * 360) / 8;
                    return (
                      <motion.div
                        key={`particle-${i}`}
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 25,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: i * 0.3,
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ width: '160%', height: '160%', left: '-30%', top: '-30%' }}
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.4, 0.8, 0.4],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.2,
                          }}
                          className="absolute w-1.5 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                          style={{
                            left: '50%',
                            top: '0%',
                            transform: `rotate(${angle}deg) translateY(-100%)`,
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Premium Content Section */}
          <div className="text-center space-y-4 sm:space-y-8">
            
            {/* Badge with Shimmer */}
            <motion.div
              key={`badge-${language}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: isMobile ? 0.3 : 0.8, delay: isMobile ? 0.1 : 0.3 }}
              className="flex justify-center"
            >
              <div className="relative inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-primary/20 backdrop-blur-sm group cursor-default overflow-hidden">
                {enableComplexAnimations && (
                  <motion.div
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                )}
                <span className="relative z-10 text-xs sm:text-sm">{t('hero.greeting')}</span>
              </div>
            </motion.div>

            {/* Title - Tamanho Original */}
            <motion.h1
              key={`hero-title-${language}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="mb-3 sm:mb-6 px-4 sm:px-0"
            >
              {t('hero.title')}{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('hero.titleHighlight')}
              </span>
            </motion.h1>

            {/* Description - Tamanho Original */}
            <motion.p
              key={`hero-desc-${language}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="mb-6 sm:mb-12 opacity-80 max-w-2xl mx-auto px-4 sm:px-0 text-sm sm:text-base"
            >
              {t('hero.description')}
            </motion.p>

            {/* Premium CTA Buttons */}
            <motion.div
              key={`cta-${language}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center items-stretch sm:items-center px-4 sm:px-0"
            >
              <div className="relative w-full sm:w-auto flex flex-col items-center gap-3">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-full cursor-pointer group relative overflow-hidden w-full sm:w-auto justify-center hover:-translate-y-1"
                  style={{ 
                    transition: 'all 150ms ease-out',
                    willChange: 'transform'
                  }}
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
                    {t('hero.cta.contact')}
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
                  transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: isMobile ? 0.3 : 2.8, duration: isMobile ? 0.3 : 1 }}
              className="flex flex-wrap justify-center gap-3 sm:gap-6 pt-8 sm:pt-12 text-xs sm:text-sm text-muted-foreground px-4 sm:px-0"
            >
              {[
                { icon: '⚡', key: 'hero.badge.performance' },
                { icon: '🎨', key: 'hero.badge.design' },
                { icon: '🚀', key: 'hero.badge.results' }
              ].map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: isMobile ? 0.3 : (2.8 + i * 0.1), duration: isMobile ? 0.2 : 0.5 }}
                  className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/5 border border-primary/10"
                >
                  <span>{item.icon} {t(item.key)}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Mobile e Desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: isMobile ? 0.5 : 3, duration: isMobile ? 0.5 : 1 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        onClick={() => {
          const servicesSection = document.getElementById('services');
          if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 sm:w-6 sm:h-10 rounded-full border-2 border-primary/40 flex items-start justify-center p-2 backdrop-blur-sm bg-background/10 hover:border-primary/60 hover:bg-background/20 transition-colors"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 bg-primary rounded-full shadow-lg shadow-primary/50"
          />
        </motion.div>
      </motion.div>
    </section>
  );
});

export default Hero;