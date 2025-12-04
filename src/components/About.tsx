import { motion } from 'motion/react';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile, useReducedMotion } from '../hooks/useMediaQuery';
import { memo } from 'react';

const About = memo(function About() {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  
  const enableComplexAnimations = !isMobile && !prefersReducedMotion;

  return (
    <section id="about" className="py-8 sm:py-16 relative overflow-hidden" style={{ contain: 'layout' }}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          key={`about-header-${language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          className="text-center mb-6 sm:mb-12"
        >
          <span className={`inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-2 sm:mb-4 text-xs sm:text-sm ${
            enableComplexAnimations ? 'backdrop-blur-sm' : ''
          }`}>
            {t('about.badge')}
          </span>
          <h2 className="mb-2 sm:mb-6 px-4 sm:px-0">{t('about.title')}</h2>
          <p className="opacity-80 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0 text-sm sm:text-base">
            {t('about.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:gap-8">
          <motion.div
            key={`about-text-${language}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-6 px-4 sm:px-0"
          >
            <p className="opacity-80 leading-relaxed text-sm sm:text-base">
              {t('about.text1')}
            </p>
            <p className="opacity-80 leading-relaxed text-sm sm:text-base">
              {t('about.text2')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default About;