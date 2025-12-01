import { motion } from 'motion/react';
import { Award, Users, Coffee, Heart } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile, useReducedMotion } from '../hooks/useMediaQuery';
import { memo } from 'react';

const About = memo(function About() {
  const { ref: statsRef, isInView: statsInView } = useInView({ threshold: 0.3 });
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  
  const enableComplexAnimations = !isMobile && !prefersReducedMotion;

  const stats = [
    { icon: Award, value: 50, suffix: '+', label: t('about.stats.projects') },
    { icon: Users, value: 30, suffix: '+', label: t('about.stats.clients') },
    { icon: Coffee, value: 1000, suffix: '+', label: t('about.stats.coffee') },
    { icon: Heart, value: 100, suffix: '%', label: t('about.stats.dedication') },
  ];

  const skills = [
    { name: 'React & Next.js', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'Node.js', level: 85 },
    { name: 'UI/UX Design', level: 80 },
    { name: 'Performance', level: 90 },
  ];

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

        <div className="grid grid-cols-1 gap-4 sm:gap-8 mb-8 sm:mb-16">
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

        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: isMobile ? 0.2 : 0.4, ease: [0.4, 0, 0.2, 1] }}
              whileHover={enableComplexAnimations ? { y: -8, scale: 1.02, transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] } } : undefined}
              className={`text-center p-3 sm:p-8 rounded-2xl bg-background/70 border-2 border-primary/30 hover:border-primary/50 ${
                enableComplexAnimations ? 'hover:shadow-2xl hover:shadow-primary/20 backdrop-blur-xl will-change-transform' : ''
              } relative overflow-hidden`}
              style={enableComplexAnimations ? { 
                transitionProperty: 'border-color, box-shadow',
                transitionDuration: '200ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'transform'
              } : {
                transitionProperty: 'border-color',
                transitionDuration: '200ms'
              }}
            >
              {index === 0 && (
                // Award - Troféu - balanço de vitória no hover
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: isMobile ? 0.2 : 0.4 }}
                  whileHover={enableComplexAnimations ? { 
                    rotate: [-10, 10, -10, 10, 0],
                    transition: { duration: 0.5 }
                  } : undefined}
                >
                  <stat.icon className="w-6 h-6 sm:w-10 sm:h-10 mx-auto mb-2 sm:mb-4 text-primary" />
                </motion.div>
              )}
              {index === 1 && (
                // Users - Pessoas - pulso crescente no hover
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: isMobile ? 0.2 : 0.4 }}
                  whileHover={enableComplexAnimations ? { 
                    scale: [1, 1.3, 0.9, 1.2, 1],
                    transition: { duration: 0.6 }
                  } : undefined}
                >
                  <stat.icon className="w-6 h-6 sm:w-10 sm:h-10 mx-auto mb-2 sm:mb-4 text-primary" />
                </motion.div>
              )}
              {index === 2 && (
                // Coffee - Café - vapor subindo no hover
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: isMobile ? 0.2 : 0.4 }}
                  whileHover={enableComplexAnimations ? { 
                    y: [0, -10, -5, -8, -3, -5, 0],
                    transition: { duration: 0.7 }
                  } : undefined}
                >
                  <stat.icon className="w-6 h-6 sm:w-10 sm:h-10 mx-auto mb-2 sm:mb-4 text-primary" />
                </motion.div>
              )}
              {index === 3 && (
                // Heart - Coração - batimento cardíaco no hover
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: isMobile ? 0.2 : 0.4 }}
                  whileHover={enableComplexAnimations ? { 
                    scale: [1, 1.3, 0.9, 1.25, 0.95, 1.2, 1],
                    transition: { duration: 0.7 }
                  } : undefined}
                >
                  <stat.icon className="w-6 h-6 sm:w-10 sm:h-10 mx-auto mb-2 sm:mb-4 text-primary" />
                </motion.div>
              )}
              <div className="mb-1 sm:mb-2 text-xl sm:text-3xl">
                <AnimatedCounter 
                  end={stat.value} 
                  suffix={stat.suffix}
                  duration={2.5}
                  isInView={statsInView}
                />
              </div>
              <p className="text-[10px] sm:text-sm opacity-60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default About;