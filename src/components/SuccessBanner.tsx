import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';
import { useEffect } from 'react';

interface SuccessBannerProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

export default function SuccessBanner({ show, message, onClose }: SuccessBannerProps) {
  useEffect(() => {
    if (show) {
      // Auto-fechar após 5 segundos
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[99999] w-[90%] max-w-md pointer-events-auto"
          style={{ isolation: 'isolate' }}
        >
          <div className="bg-card backdrop-blur-xl border-2 border-primary/30 rounded-2xl shadow-2xl shadow-primary/20 p-4 flex items-center gap-3">
            {/* Ícone de Sucesso */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex-shrink-0"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary" strokeWidth={2.5} />
              </div>
            </motion.div>

            {/* Mensagem */}
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 text-foreground text-sm sm:text-base font-medium"
            >
              {message}
            </motion.p>

            {/* Botão de Fechar */}
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-primary/10 flex items-center justify-center transition-colors duration-150"
              aria-label="Fechar"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Progress Bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 5, ease: 'linear' }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-primary/30 origin-left rounded-b-2xl"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}