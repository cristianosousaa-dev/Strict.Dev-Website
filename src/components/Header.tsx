import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import ThemeSelector from './ThemeSelector';
import type { Mode, Theme } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../hooks/useMediaQuery';

// Logo do Strict.Dev - ficheiro deve estar em /public/logo.png
const logoImage = '/logo.png';

interface HeaderProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export default function Header({ mode, setMode, theme, setTheme }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const isMobile = useIsMobile();

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Usar passive listener para melhor performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check inicial
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      const duration = 1200;
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
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: t('header.home'), id: 'hero' },
    { label: t('header.services'), id: 'services' },
    { label: t('header.about'), id: 'about' },
    { label: t('header.contact'), id: 'contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 border-b-2
        ${/* Mobile - sempre compacto e com fundo SEM backdrop-blur */''}\
        bg-background/95 border-primary/25 py-2\
        ${/* Desktop - comportamento normal com scroll */''}\
        sm:bg-transparent sm:border-primary/20 sm:py-4 sm:transition-all sm:duration-500\
        ${isScrolled ? 'sm:bg-background/80 sm:backdrop-blur-md sm:border-primary/25 sm:py-3' : ''}\
      `}
      style={isMobile ? { transform: 'translateZ(0)', backfaceVisibility: 'hidden' } : {}}
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Layout com navegação absolutamente centrada */}
        <div className="flex items-center justify-between relative">
          {/* Coluna Esquerda: Logo com padding direito */}
          <motion.button
            initial={!isMobile ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={!isMobile ? { duration: 0.3 } : { duration: 0 }}
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group pr-8"
          >
            {/* Logo Container - SEM ANIMAÇÕES NO MOBILE */}
            {isMobile ? (
              <div className="relative rounded-2xl w-12 h-12">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-background/90 via-background/85 to-background/90 border border-primary/15" />
                <div className="relative z-10 p-0.5 w-full h-full">
                  <img 
                    src={logoImage} 
                    alt="Strict.Dev Logo" 
                    className="w-full h-full object-contain drop-shadow-md" 
                  />
                </div>
              </div>
            ) : (
              <motion.div
                animate={{ 
                  width: isScrolled ? '48px' : '64px',
                  height: isScrolled ? '48px' : '64px',
                }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ 
                  scale: 1.08,
                  y: -3,
                  transition: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] } 
                }}
                className="relative rounded-2xl w-12 sm:w-16 h-12 sm:h-16"
                style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
              >
                {/* Background Glass Layer */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-background/90 via-background/85 to-background/90 backdrop-blur-2xl border border-primary/15 group-hover:border-primary/35 transition-all duration-300" />
                
                {/* Subtle Gradient Overlay on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/8 via-transparent to-secondary/8 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                
                {/* Premium Shimmer Effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <motion.div
                    initial={{ x: '-100%', opacity: 0 }}
                    whileHover={{ 
                      x: '100%',
                      opacity: 1,
                      transition: { duration: 0.7, ease: 'easeInOut' }
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent skew-x-12"
                  />
                </div>
                
                {/* Animated Ring on Hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { duration: 0.3 }
                  }}
                  style={{
                    boxShadow: '0 0 0 2px var(--primary) inset, 0 10px 40px -10px var(--primary)',
                  }}
                />
                
                {/* Soft Pulse Animation - Always Active */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    boxShadow: [
                      '0 0 0 0px hsl(var(--primary) / 0)',
                      '0 0 25px 6px hsl(var(--primary) / 0.5)',
                      '0 0 0 0px hsl(var(--primary) / 0)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatType: 'loop',
                  }}
                />
                
                {/* Logo Image with Micro Animation */}
                <motion.div 
                  className="relative z-10 p-0.5 w-full h-full"
                  whileHover={{
                    rotate: [0, -2, 2, 0],
                    transition: { duration: 0.5, ease: 'easeInOut' }
                  }}
                  style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
                >
                  <img 
                    src={logoImage} 
                    alt="Strict.Dev Logo" 
                    className="w-full h-full object-contain drop-shadow-md" 
                    style={{ 
                      imageRendering: '-webkit-optimize-contrast',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                      WebkitFontSmoothing: 'antialiased'
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
            {isMobile ? (
              <span className="cursor-pointer text-sm">
                Strict.Dev
              </span>
            ) : (
              <motion.span 
                animate={{ 
                  fontSize: isScrolled ? '1rem' : '1.25rem',
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="group-hover:text-primary transition-colors duration-200 cursor-pointer hidden sm:inline-block"
              >
                Strict.Dev
              </motion.span>
            )}
          </motion.button>

          {/* Coluna Central: Navegação absolutamente centrada */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                onClick={(e) => scrollToSection(item.id, e)}
                className="text-xs lg:text-sm hover:text-primary transition-colors duration-200 relative group cursor-pointer whitespace-nowrap"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-200" />
              </motion.button>
            ))}
          </nav>

          {/* Coluna Direita: Controlos com padding esquerdo */}
          <div className="flex items-center gap-2 sm:gap-3 pl-8">
            <div className="hidden sm:block">
              <ThemeSelector theme={theme} setTheme={setTheme} />
            </div>
            
            {/* Language Selector - Direct PT | EN */}
            <div className="hidden md:flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full bg-background/70 backdrop-blur-xl border border-current/10">
              <button
                onClick={() => setLanguage('pt')}
                className={`px-1.5 sm:px-2 py-0.5 text-xs rounded-full transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                  language === 'pt' ? 'text-primary' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {language === 'pt' && (
                  <motion.div
                    layoutId="language-indicator"
                    className="absolute inset-0 bg-primary/10"
                    style={{ borderRadius: '9999px' }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">PT</span>
              </button>
              <span className="text-[10px] opacity-30">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 sm:px-2 py-0.5 text-xs rounded-full transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                  language === 'en' ? 'text-primary' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {language === 'en' && (
                  <motion.div
                    layoutId="language-indicator"
                    className="absolute inset-0 bg-primary/10"
                    style={{ borderRadius: '9999px' }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">EN</span>
              </button>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
              className="rounded-full relative overflow-hidden group hover:scale-110 hover:-translate-y-0.5 transition-all duration-150 w-9 h-9 sm:w-10 sm:h-10"
              style={{ willChange: 'transform' }}
              aria-label={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              <motion.div
                initial={false}
                animate={{ rotate: mode === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {mode === 'light' ? <Moon className="w-4 h-4 sm:w-5 sm:h-5" /> : <Sun className="w-4 h-4 sm:w-5 sm:h-5" />}
              </motion.div>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full relative overflow-hidden group hover:scale-110 hover:-translate-y-0.5 transition-all duration-150 w-9 h-9"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ willChange: 'transform' }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              <span className="relative z-10">
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Side Menu */}
              <motion.nav
                id="mobile-navigation"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-[280px] bg-background/98 backdrop-blur-xl border-l-2 border-primary/20 shadow-2xl z-50 md:hidden overflow-y-auto"
                role="navigation"
                aria-label="Mobile navigation"
              >
                {/* Header do Menu */}
                <div className="flex items-center justify-between p-4 border-b border-primary/10">
                  <span className="text-lg text-primary">Menu</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full w-9 h-9"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Navigation Items */}
                <div className="p-4 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => scrollToSection(item.id)}
                      className="flex items-center w-full text-left py-3 px-4 hover:bg-primary/10 rounded-xl transition-all duration-300 group"
                    >
                      <span className="flex-1">{item.label}</span>
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </motion.button>
                  ))}
                </div>

                {/* Divider */}
                <div className="mx-4 my-2 h-px bg-primary/10" />

                {/* Language Selector Mobile */}
                <div className="p-4">
                  <div className="text-xs opacity-60 mb-2 px-1">{t('header.language')}</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLanguage('pt')}
                      className={`flex-1 px-3 py-2.5 text-sm rounded-xl transition-all duration-200 cursor-pointer font-medium ${
                        language === 'pt' ? 'bg-primary/15 text-primary shadow-sm' : 'opacity-60 hover:opacity-100 hover:bg-primary/5'
                      }`}
                    >
                      🇵🇹 PT
                    </button>
                    <button
                      onClick={() => setLanguage('en')}
                      className={`flex-1 px-3 py-2.5 text-sm rounded-xl transition-all duration-200 cursor-pointer font-medium ${
                        language === 'en' ? 'bg-primary/15 text-primary shadow-sm' : 'opacity-60 hover:opacity-100 hover:bg-primary/5'
                      }`}
                    >
                      🇬🇧 EN
                    </button>
                  </div>
                </div>

                {/* Theme Selector Mobile */}
                <div className="p-4 sm:hidden">
                  <div className="text-xs opacity-60 mb-2 px-1">{t('header.theme')}</div>
                  <ThemeSelector theme={theme} setTheme={setTheme} />
                </div>

                {/* Logo Section */}
                <div className="p-4 flex justify-center mt-5">
                  <div className="relative rounded-2xl w-24 h-24">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-background/90 via-background/85 to-background/90 border border-primary/15" />
                    <div className="relative z-10 p-1 w-full h-full">
                      <img 
                        src={logoImage} 
                        alt="Strict.Dev Logo" 
                        className="w-full h-full object-contain drop-shadow-md" 
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary/10 bg-background/60">
                  <div className="text-center text-xs opacity-50">
                    © 2025 Strict.Dev. All rights reserved.
                  </div>
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}