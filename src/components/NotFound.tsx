import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { Home, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

export default function NotFound() {
  const { language } = useLanguage();

  useEffect(() => {
    // SEO: Set 404 status
    document.title = language === 'pt' ? '404 - Página Não Encontrada | Strict.Dev' : '404 - Page Not Found | Strict.Dev';
  }, [language]);

  const content = {
    en: {
      title: '404',
      subtitle: 'Page Not Found',
      description: 'The page you are looking for does not exist or has been moved.',
      homeButton: 'Back to Home',
      backButton: 'Go Back'
    },
    pt: {
      title: '404',
      subtitle: 'Página Não Encontrada',
      description: 'A página que procura não existe ou foi movida.',
      homeButton: 'Voltar ao Início',
      backButton: 'Voltar Atrás'
    }
  };

  const t = content[language as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <motion.h1
            className="text-[12rem] sm:text-[16rem] leading-none tracking-tighter"
            style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
          >
            {t.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            className="text-2xl sm:text-3xl mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {t.subtitle}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-muted-foreground mb-12 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {t.description}
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all hover:scale-105"
            >
              <Home size={20} />
              {t.homeButton}
            </a>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-8 py-3 border border-current/20 rounded-lg hover:bg-accent transition-all hover:scale-105"
            >
              <ArrowLeft size={20} />
              {t.backButton}
            </button>
          </motion.div>

          {/* Decorative Element */}
          <motion.div
            className="mt-20 flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1, duration: 1 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
