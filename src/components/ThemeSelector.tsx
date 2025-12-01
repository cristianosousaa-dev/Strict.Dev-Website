import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import type { Theme } from '../App';

interface ThemeSelectorProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const themes: { id: Theme; name: string; color: string }[] = [
  { id: 'white', name: 'Branco', color: '#ffffff' },
  { id: 'lavender', name: 'Azul', color: '#3b82f6' },
  { id: 'mint', name: 'Menta', color: '#7ac9a1' },
  { id: 'peach', name: 'Pêssego', color: '#f5a380' },
  { id: 'sky', name: 'Céu', color: '#6db3dc' },
  { id: 'rose', name: 'Rosa', color: '#f08a9a' },
];

export default function ThemeSelector({ theme, setTheme }: ThemeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      {themes.map((t) => (
        <motion.button
          key={t.id}
          whileHover={{ scale: 1.15, y: -2, transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] } }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setTheme(t.id)}
          className="relative cursor-pointer group overflow-hidden rounded-full"
          style={{ willChange: 'transform' }}
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 rounded-full pointer-events-none z-20" />
          
          <div
            className={`w-6 h-6 rounded-full border-2 ${
              t.id === 'white' 
                ? 'border-black/20 dark:border-white/30' 
                : 'border-white/40 dark:border-black/20'
            } relative`}
            style={{ 
              backgroundColor: t.color,
              transitionProperty: 'border-color, box-shadow',
              transitionDuration: '150ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
          
          {/* Check mark quando selecionado */}
          <AnimatePresence mode="wait">
            {theme === t.id && (
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 400 }}
                className="absolute inset-0 flex items-center justify-center z-30"
                style={{ pointerEvents: 'none' }}
              >
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    t.id === 'white' 
                      ? 'bg-black/30 dark:bg-white/30' 
                      : 'bg-white/50 dark:bg-black/40'
                  }`}
                >
                  <Check 
                    className={`w-3.5 h-3.5 ${
                      t.id === 'white' 
                        ? 'text-black dark:text-white' 
                        : 'text-white'
                    }`} 
                    strokeWidth={3} 
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </div>
  );
}