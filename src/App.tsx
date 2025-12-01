import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import ParticlesBackground from './components/ParticlesBackground';
import SEO from './components/SEO';
import ErrorBoundary from './components/ErrorBoundary';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Toaster } from 'sonner';
import { useIsMobile } from './hooks/useMediaQuery';

// Lazy load dos componentes não críticos
const Services = lazy(() => import('./components/Services'));
const About = lazy(() => import('./components/About'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const CookieBanner = lazy(() => import('./components/CookieBanner'));
const CookieSettings = lazy(() => import('./components/CookieSettings'));
const ExitIntentPopup = lazy(() => import('./components/ExitIntentPopup'));
const CTASection = lazy(() => import('./components/CTASection'));
const Skills = lazy(() => import('./components/Skills'));

export type Theme = 'white' | 'lavender' | 'mint' | 'peach' | 'sky' | 'rose';
export type Mode = 'light' | 'dark';

// Component de fallback leve para lazy loading
const SectionFallback = () => (
  <div className="py-12 sm:py-16 flex items-center justify-center">
    <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

function AppContent() {
  const [theme, setTheme] = useState<Theme>('white');
  const [mode, setMode] = useState<Mode>('light');
  const [isLoading, setIsLoading] = useState(true);
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-mode', mode);
  }, [theme, mode]);

  useEffect(() => {
    // Garantir que a página inicia sempre no topo
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Remover qualquer hash da URL que possa fazer scroll
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    
    // Forçar scroll para o topo imediatamente
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Prevenir qualquer scroll durante o carregamento
    const preventScroll = (e: Event) => {
      e.preventDefault();
      window.scrollTo(0, 0);
    };
    
    document.addEventListener('scroll', preventScroll, { passive: false });
    
    // Remover o listener após o loading (2.2s - tempo total do loading)
    const timer = setTimeout(() => {
      document.removeEventListener('scroll', preventScroll);
    }, 2200);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('scroll', preventScroll);
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Scroll para o topo após loading
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  // SEO content based on language
  const seoContent = {
    en: {
      title: 'Strict.Dev - Professional Web & App Development Agency',
      description: 'Transform your digital presence with Strict.Dev. Expert web development, mobile apps, and performance optimization. Premium solutions for modern businesses.',
      keywords: 'web development, app development, mobile apps, performance optimization, React, TypeScript, professional development, digital agency, web design, responsive design'
    },
    pt: {
      title: 'Strict.Dev - Agência Profissional de Desenvolvimento Web & Apps',
      description: 'Transforme a sua presença digital com a Strict.Dev. Desenvolvimento web especializado, aplicações móveis e otimização de performance. Soluções premium para negócios modernos.',
      keywords: 'desenvolvimento web, desenvolvimento de apps, aplicações móveis, otimização de performance, React, TypeScript, desenvolvimento profissional, agência digital, web design, design responsivo'
    }
  };

  const currentSEO = language === 'pt' ? seoContent.pt : seoContent.en;

  return (
    <>
      <SEO 
        title={currentSEO.title}
        description={currentSEO.description}
        keywords={currentSEO.keywords}
      />
      <Toaster position="top-center" richColors closeButton />
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loading" onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen transition-colors duration-500"
      >
        {/* Partículas de Background - só renderiza após loading */}
        {!isLoading && <ParticlesBackground theme={theme} mode={mode} />}
        
        <Header mode={mode} setMode={setMode} theme={theme} setTheme={setTheme} />
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
        <Suspense fallback={null}>
          <WhatsAppButton />
        </Suspense>
        
        {/* Exit Intent Popup - aparece ao tentar sair */}
        <Suspense fallback={null}>
          <ExitIntentPopup />
        </Suspense>
        
        <main id="main-content" className="relative z-20">
          <Hero />
          <Suspense fallback={<SectionFallback />}>
            <Services />
          </Suspense>
          
          {/* Skills Section - após Services */}
          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>
          
          {/* CTA Section estratégico */}
          <Suspense fallback={<SectionFallback />}>
            <CTASection />
          </Suspense>
          
          <Suspense fallback={<SectionFallback />}>
            <About />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Testimonials />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </main>

        <footer className={`border-t border-current/10 py-4 sm:py-8 ${
          isMobile ? 'bg-background/95' : 'bg-background/70 backdrop-blur-xl'
        }`}>
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center justify-center gap-1.5 sm:gap-3 text-sm text-center">
              <p className="opacity-60 text-xs sm:text-sm">
                © {new Date().getFullYear()} Strict.Dev. {t('footer.rights') || 'Todos os direitos reservados.'}
              </p>
              <button
                onClick={() => setShowCookieSettings(true)}
                className="text-primary hover:text-primary/80 transition-colors cursor-pointer underline underline-offset-4 text-xs sm:text-sm"
              >
                {language === 'pt' ? 'Gerir Cookies' : 'Manage Cookies'}
              </button>
            </div>
          </div>
        </footer>

        {/* Cookie Components */}
        <Suspense fallback={null}>
          <CookieBanner onOpenSettings={() => setShowCookieSettings(true)} />
        </Suspense>
        <Suspense fallback={null}>
          <CookieSettings isOpen={showCookieSettings} onClose={() => setShowCookieSettings(false)} />
        </Suspense>
      </motion.div>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ErrorBoundary>
  );
}