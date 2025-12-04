import { motion } from 'motion/react';
import { Globe, Smartphone, Zap, Palette, Code, Rocket, Star, TrendingUp, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile, useReducedMotion } from '../hooks/useMediaQuery';
import { memo, useState } from 'react';

const Services = memo(function Services() {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredIconIndex, setHoveredIconIndex] = useState<number | null>(null);
  
  const enableComplexAnimations = !isMobile && !prefersReducedMotion;

  // Animações específicas para cada ícone usando VARIANTS
  const getIconVariants = (iconType: string) => {
    const baseIdle = {
      scale: 1,
      rotate: 0,
      x: 0,
      y: 0,
      opacity: 1,
      transition: { duration: 0 } // INSTANTÂNEO!
    };

    switch(iconType) {
      case 'globe': // Sites - Globo girando
        return {
          idle: baseIdle,
          hover: {
            scale: 1.25,
            rotate: 360,
            transition: { duration: 0.6, ease: 'easeInOut' }
          }
        };
      case 'smartphone': // Apps - Vibração de notificação
        return {
          idle: baseIdle,
          hover: {
            scale: 1.25,
            x: [0, -3, 3, -3, 3, 0],
            y: [0, -2, 2, -2, 0],
            transition: { duration: 0.4, ease: 'easeInOut' }
          }
        };
      case 'zap': // Performance - Pulso energético
        return {
          idle: baseIdle,
          hover: {
            scale: [1, 1.3, 1, 1.3, 1],
            rotate: [0, -5, 5, -5, 0],
            transition: { duration: 0.5, ease: 'easeInOut' }
          }
        };
      case 'palette': // Design - Balanço de pincel
        return {
          idle: baseIdle,
          hover: {
            scale: 1.25,
            rotate: [0, -15, 15, -10, 10, 0],
            y: [0, -5, 0],
            transition: { duration: 0.6, ease: 'easeInOut' }
          }
        };
      case 'code': // Code - Pulse de compilação
        return {
          idle: baseIdle,
          hover: {
            scale: [1, 1.2, 1.3, 1.2, 1],
            opacity: [1, 0.8, 1, 0.8, 1],
            transition: { duration: 0.5, ease: 'easeInOut' }
          }
        };
      case 'rocket': // Deploy - Foguete decolando
        return {
          idle: baseIdle,
          hover: {
            scale: 1.2,
            y: [0, -8, -6, -8, 0],
            rotate: [0, -8, 0],
            transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
          }
        };
      default:
        return {
          idle: baseIdle,
          hover: { scale: 1.2, transition: { duration: 0.3 } }
        };
    }
  };

  const services = [
    {
      icon: Globe,
      iconType: 'globe',
      title: t('services.web.title'),
      description: t('services.web.description'),
      badge: {
        text: 'Popular',
        icon: Star,
      }
    },
    {
      icon: Smartphone,
      iconType: 'smartphone',
      title: t('services.apps.title'),
      description: t('services.apps.description'),
      badge: {
        text: language === 'pt' ? 'Tendência' : 'Trending',
        icon: TrendingUp,
      }
    },
    {
      icon: Zap,
      iconType: 'zap',
      title: t('services.performance.title'),
      description: t('services.performance.description'),
      badge: {
        text: language === 'pt' ? 'Essencial' : 'Essential',
        icon: Award,
      }
    },
    {
      icon: Palette,
      iconType: 'palette',
      title: t('services.design.title'),
      description: t('services.design.description'),
      badge: {
        text: language === 'pt' ? 'Premium' : 'Premium',
        icon: Star,
      }
    },
    {
      icon: Code,
      iconType: 'code',
      title: t('services.custom.title'),
      description: t('services.custom.description'),
      badge: {
        text: language === 'pt' ? 'Novo' : 'New',
        icon: Star,
      }
    },
    {
      icon: Rocket,
      iconType: 'rocket',
      title: t('services.deploy.title'),
      description: t('services.deploy.description'),
      badge: {
        text: language === 'pt' ? 'Rápido' : 'Fast',
        icon: Zap,
      }
    },
  ];

  return (
    <section id="services" className="py-0 sm:py-2 relative" style={{ overflow: 'visible' }}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6" style={{ overflow: 'visible' }}>
        <motion.div
          key={`services-header-${language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          className="text-center mb-6 sm:mb-16"
        >
          <span className={`inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-2 sm:mb-4 text-xs sm:text-sm ${
            enableComplexAnimations ? 'backdrop-blur-sm' : ''
          }`}>
            {t('services.badge')}
          </span>
          <h2 className="mb-2 sm:mb-4 px-4 sm:px-0">{t('services.title')}</h2>
          <p className="opacity-80 max-w-2xl mx-auto px-4 sm:px-0 text-sm sm:text-base">
            {t('services.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: isMobile ? 0.3 : 0.4, 
                ease: [0.4, 0, 0.2, 1]
              }}
              whileHover={enableComplexAnimations ? { 
                y: -8, 
                scale: 1.02,
                transition: { 
                  duration: 0.15,
                  ease: [0.4, 0, 0.2, 1]
                } 
              } : undefined}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group p-2.5 sm:p-5 rounded-3xl bg-background/70 border-2 border-primary/30 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 relative overflow-hidden flex flex-col items-center text-center gap-1.5 sm:gap-3 ${
                enableComplexAnimations ? 'backdrop-blur-xl will-change-transform' : ''
              }`}
              style={{ 
                transitionProperty: 'border-color, box-shadow',
                transitionDuration: '200ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                ...(enableComplexAnimations && { willChange: 'transform' })
              }}
            >
              {/* Card Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full pointer-events-none transition-none group-hover:transition-transform group-hover:duration-700" />
              
              {/* Professional Badge - Top Right Corner */}
              <motion.div
                className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-primary/15 text-primary border-primary/30 border backdrop-blur-sm shadow-sm">
                  <service.badge.icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" strokeWidth={2} />
                  <span className="text-[8px] sm:text-[10px] font-semibold tracking-tight">
                    {service.badge.text}
                  </span>
                </div>
              </motion.div>

              {/* Icon - Centered at top with hover animation */}
              <motion.div 
                className="flex-shrink-0"
                variants={getIconVariants(service.iconType)}
                animate={hoveredIconIndex === index ? 'hover' : 'idle'}
                onMouseEnter={() => setHoveredIconIndex(index)}
                onMouseLeave={() => setHoveredIconIndex(null)}
                style={{ 
                  willChange: 'transform',
                }}
              >
                <service.icon 
                  className="w-6 h-6 sm:w-9 sm:h-9 text-primary" 
                  strokeWidth={1.5}
                />
              </motion.div>
              
              {/* Content - Centered below icon */}
              <div className="flex-1 w-full">
                <h3 className="mb-1 sm:mb-3 text-xs sm:text-base">{service.title}</h3>
                <p className="opacity-70 leading-relaxed text-[10px] sm:text-sm">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Services;