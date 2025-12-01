import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/useMediaQuery';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const { t, language } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const isMobile = useIsMobile();
  
  // Frases premium bilíngues
  const loadingPhrases = {
    'pt-PT': [
      'Preparando a experiência perfeita',
      'Carregando design premium',
      'Quase pronto para impressionar'
    ],
    'en': [
      'Preparing the perfect experience',
      'Loading premium design',
      'Almost ready to impress'
    ]
  };

  const phrases = loadingPhrases[language as keyof typeof loadingPhrases] || loadingPhrases['en'];

  // Progresso a 60fps fluido - requestAnimationFrame - TEMPO: 2 segundos
  useEffect(() => {
    const duration = 2000; // 2 segundos de loading
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(progress);
      
      if (progress < 100) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setTimeout(onLoadingComplete, 200); // Pequeno delay antes de completar
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [onLoadingComplete]);

  // Troca frases
  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setCurrentPhraseIndex(prev => (prev + 1) % phrases.length);
    }, 1000); // Troca a cada 1 segundo (matching com 2s total)

    return () => clearInterval(phraseInterval);
  }, [phrases.length]);

  // Partículas de reconstrução - OTIMIZADO: 30 → 15
  const reconstructionParticles = Array.from({ length: isMobile ? 10 : 15 }, (_, i) => ({
    x: (Math.random() - 0.5) * 300,
    y: (Math.random() - 0.5) * 300,
    delay: i * 0.015,
    size: Math.random() * 3 + 1,
  }));

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            opacity: [0.05, 0.12, 0.05],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-br from-[#2C5F5D]/20 via-[#3A7371]/10 to-transparent rounded-full blur-3xl"
          style={{ willChange: 'transform, opacity' }}
        />
        
        <motion.div
          animate={{
            opacity: [0.04, 0.08, 0.04],
            scale: [1.1, 1, 1.1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#4A8785]/15 via-transparent to-[#2C5F5D]/15 rounded-full blur-3xl"
          style={{ willChange: 'transform, opacity' }}
        />

        <motion.div
          animate={{
            opacity: [0.03, 0.06, 0.03],
            x: [-20, 20, -20],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-bl from-[#3A7371]/10 to-transparent rounded-full blur-2xl"
          style={{ willChange: 'transform, opacity' }}
        />

        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
            className="absolute w-1 h-1 bg-[#3A7371]/40 rounded-full blur-sm"
            style={{
              left: `${20 + (i * 6)}%`,
              top: `${30 + Math.sin(i * 2) * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center mt-20">
        
        {/* LOGO PREMIUM CONTAINER */}
        <div className="relative w-96 h-96 flex items-center justify-center mb-8">
          
          {/* Energy Core - Pulsante */}
          <motion.div
            animate={{
              scale: [0.8, 1, 0.8],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-72 h-72 bg-gradient-radial from-[#2C5F5D]/40 via-[#3A7371]/20 to-transparent rounded-full blur-[80px]"
          />

          {/* Orbital Rings System - Triplo */}
          
          {/* Ring 1 - Outer */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ willChange: 'transform' }}
          >
            <svg width="380" height="380" viewBox="0 0 380 380" fill="none">
              <motion.circle 
                cx="190" 
                cy="190" 
                r="188" 
                stroke="url(#gradient-ring-1)"
                strokeWidth="0.5"
                strokeDasharray="3 25"
                strokeLinecap="round"
                initial={{ opacity: 0, strokeDashoffset: 100 }}
                animate={{ opacity: 0.15, strokeDashoffset: 0 }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />
              <defs>
                <linearGradient id="gradient-ring-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#2C5F5D', stopOpacity: 0.8 }} />
                  <stop offset="50%" style={{ stopColor: '#3A7371', stopOpacity: 0.4 }} />
                  <stop offset="100%" style={{ stopColor: '#4A8785', stopOpacity: 0.8 }} />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Ring 2 - Middle Counter-Rotate */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ willChange: 'transform' }}
          >
            <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
              <motion.circle 
                cx="160" 
                cy="160" 
                r="158" 
                stroke="url(#gradient-ring-2)"
                strokeWidth="0.5"
                strokeDasharray="2 20"
                strokeLinecap="round"
                initial={{ opacity: 0, strokeDashoffset: 100 }}
                animate={{ opacity: 0.2, strokeDashoffset: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <defs>
                <linearGradient id="gradient-ring-2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#4A8785', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: '#2C5F5D', stopOpacity: 0.8 }} />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Ring 3 - Inner Fast Rotate */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ willChange: 'transform' }}
          >
            <svg width="260" height="260" viewBox="0 0 260 260" fill="none">
              <motion.circle 
                cx="130" 
                cy="130" 
                r="128" 
                stroke="url(#gradient-ring-3)"
                strokeWidth="0.5"
                strokeDasharray="1 15"
                strokeLinecap="round"
                initial={{ opacity: 0, strokeDashoffset: 100 }}
                animate={{ opacity: 0.25, strokeDashoffset: 0 }}
                transition={{ duration: 1.5, delay: 0.7 }}
              />
              <defs>
                <linearGradient id="gradient-ring-3" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#2C5F5D', stopOpacity: 0.9 }} />
                  <stop offset="100%" style={{ stopColor: '#4A8785', stopOpacity: 0.9 }} />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Reconstruction Particles - Convergem para o logo */}
          {reconstructionParticles.slice(0, 20).map((particle, i) => (
            <motion.div
              key={`recon-${i}`}
              className="absolute top-1/2 left-1/2"
              initial={{ 
                x: particle.x, 
                y: particle.y, 
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: 0,
                y: 0,
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: particle.delay,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <div 
                className="rounded-full bg-[#3A7371]/70"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  boxShadow: '0 0 6px rgba(58, 115, 113, 0.8)',
                }}
              />
            </motion.div>
          ))}

          {/* Hexagonal Energy Shield */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ 
              opacity: [0, 0.15, 0.15, 0],
              scale: [0.7, 1, 1, 1.2],
              rotate: [0, 0, 0, 90],
            }}
            transition={{
              duration: 3,
              times: [0, 0.3, 0.7, 1],
              ease: 'easeOut',
            }}
          >
            <svg width="240" height="240" viewBox="0 0 240 240" fill="none">
              <polygon
                points="120,20 200,70 200,170 120,220 40,170 40,70"
                stroke="url(#hex-gradient)"
                strokeWidth="0.5"
                fill="none"
                strokeDasharray="4 8"
              />
              <defs>
                <linearGradient id="hex-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#2C5F5D', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: '#4A8785', stopOpacity: 0.8 }} />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Pulse Waves - Múltiplas ondas */}
          {[0, 0.6, 1.2].map((delay, i) => (
            <motion.div
              key={`pulse-${i}`}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + delay, duration: 0.5 }}
            >
              <motion.div
                animate={{
                  scale: [0.6, 1.3],
                  opacity: [0.4, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: delay,
                }}
                className="w-40 h-40 border border-[#3A7371]/40 rounded-full"
                style={{
                  boxShadow: '0 0 20px rgba(58, 115, 113, 0.3)',
                }}
              />
            </motion.div>
          ))}

          {/* LOGO PRINCIPAL - Multi-layer 3D Effect */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
            }}
            transition={{ 
              duration: 1.5,
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.3,
            }}
            className="relative z-20"
            style={{ 
              perspective: 1500,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Container com 3D Transform */}
            <motion.div
              animate={{
                rotateY: [0, 5, 0, -5, 0],
                rotateX: [0, -3, 0, 3, 0],
                rotateZ: [0, 1, 0, -1, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Logo Shadow Layer - Depth */}
              <motion.img 
                src="/logo.png" 
                alt="Shadow" 
                className="w-44 h-44 absolute top-0 left-0"
                style={{
                  filter: 'blur(8px) brightness(0.4)',
                  transform: 'translateZ(-20px)',
                  opacity: 0.3,
                }}
              />

              {/* Logo Main Layer */}
              <motion.img 
                src="/logo.png" 
                alt="Strict.Dev" 
                className="w-44 h-44 relative"
                animate={{
                  filter: [
                    'drop-shadow(0 10px 35px rgba(44, 95, 93, 0.4)) drop-shadow(0 4px 15px rgba(58, 115, 113, 0.35)) drop-shadow(0 0 25px rgba(74, 135, 133, 0.2))',
                    'drop-shadow(0 15px 50px rgba(44, 95, 93, 0.5)) drop-shadow(0 6px 20px rgba(58, 115, 113, 0.45)) drop-shadow(0 0 35px rgba(74, 135, 133, 0.3))',
                    'drop-shadow(0 10px 35px rgba(44, 95, 93, 0.4)) drop-shadow(0 4px 15px rgba(58, 115, 113, 0.35)) drop-shadow(0 0 25px rgba(74, 135, 133, 0.2))',
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  transform: 'translateZ(0)',
                  WebkitFontSmoothing: 'antialiased',
                  imageRendering: '-webkit-optimize-contrast',
                }}
              />
            </motion.div>
          </motion.div>

          {/* Chromatic Aberration Edge Effect */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div 
              className="w-44 h-44 rounded-full"
              style={{
                boxShadow: '-2px 0 0 rgba(255, 0, 100, 0.1), 2px 0 0 rgba(0, 255, 255, 0.1)',
              }}
            />
          </motion.div>
        </div>

        {/* Premium Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {/* Main Title */}
          <h1 className="text-4xl tracking-tight relative inline-block">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="relative bg-gradient-to-b from-[#2C5F5D] via-[#3A7371] to-[#2C5F5D] bg-clip-text text-transparent"
              style={{
                textShadow: '0 0 40px rgba(44, 95, 93, 0.3)',
              }}
            >
              Strict.Dev
            </motion.span>
            
            {/* Premium Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-[#2C5F5D] via-[#3A7371] to-[#2C5F5D] bg-clip-text text-transparent blur-sm opacity-0"
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Strict.Dev
            </motion.div>
          </h1>

          {/* Elegant Underline */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              delay: 1,
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mt-4 mx-auto w-48 origin-center"
          >
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#3A7371]/30 to-transparent" />
            
            {/* Shimmer Effect */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 1,
              }}
              className="absolute inset-0 h-[1px] w-1/3"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(58, 115, 113, 0.6), transparent)',
              }}
            />
          </motion.div>

          {/* Premium Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-4 text-xs tracking-[0.3em] uppercase"
            style={{
              fontWeight: 300,
              letterSpacing: '0.35em',
            }}
          >
            Professional Web Development
          </motion.p>
        </motion.div>

        {/* Dynamic Loading Phrases - APARECEM IMEDIATAMENTE */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="mt-16 h-10 flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhraseIndex}
              initial={currentPhraseIndex === 0 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
              transition={{ 
                duration: currentPhraseIndex === 0 ? 0 : 0.8, // Primeira frase instantânea
                delay: 0,
                ease: [0.22, 1, 0.36, 1] // Cubic bezier suave
              }}
              className="relative px-6 py-2 rounded-lg"
            >
              <div className="absolute inset-0 bg-primary/5 rounded-lg" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent rounded-lg" />
              
              <p 
                className="relative text-sm tracking-wide"
                style={{ color: 'var(--primary)' }}
              >
                {phrases[currentPhraseIndex]}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Premium Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0, duration: 0.8 }}
          className="mt-8 w-80"
        >
          <div className="relative h-1 bg-foreground/5 rounded-full overflow-hidden">
            {/* Glow Background - GPU Accelerated */}
            <div className="absolute inset-0 origin-left" style={{ transform: `scaleX(${progress / 100})` }}>
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-[400px] h-full bg-gradient-to-r from-[#2C5F5D]/20 via-[#3A7371]/40 to-[#4A8785]/20 blur-md"
                style={{ willChange: 'opacity' }}
              />
            </div>
            
            {/* Main Progress Bar - GPU Accelerated */}
            <div 
              className="h-full bg-gradient-to-r from-[#2C5F5D] via-[#3A7371] to-[#4A8785] relative overflow-hidden origin-left"
              style={{ 
                transform: `scaleX(${progress / 100})`,
                willChange: 'transform',
                width: '100%'
              }}
            >
              <motion.div
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatDelay: 0.3,
                }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                style={{ willChange: 'transform' }}
              />
              
              <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white/30 to-transparent" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0, duration: 0.6 }}
            className="flex justify-between items-center mt-4"
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.15,
                    }}
                    className="w-1.5 h-1.5 rounded-full bg-[#3A7371]/50"
                  />
                ))}
              </div>
              <span className="text-xs text-foreground/40 tracking-wide">Loading</span>
            </div>
            
            <motion.span 
              className="text-sm tabular-nums tracking-wider"
              style={{ 
                color: 'var(--primary)',
                fontVariantNumeric: 'tabular-nums',
              }}
              key={Math.floor(progress)}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
            >
              {Math.floor(progress)}%
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-background/30 pointer-events-none" />
    </motion.div>
  );
}