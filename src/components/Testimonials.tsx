import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../hooks/useMediaQuery';

export default function Testimonials() {
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  const content = {
    pt: {
      title: 'O Que Dizem os Nossos Clientes?',
      subtitle: 'Testemunhos reais de quem confia no nosso trabalho!',
      testimonials: [
        {
          name: 'Maria Silva',
          role: 'CEO, TechStart',
          content: 'A Strict.Dev transformou a nossa visão numa realidade digital impressionante. Profissionalismo excecional!',
          rating: 5,
          avatar: '👩‍💼'
        },
        {
          name: 'João Santos',
          role: 'Fundador, EcoShop',
          content: 'Equipa fantástica! Entregaram o projeto no prazo e superaram todas as expectativas.',
          rating: 5,
          avatar: '👨‍💻'
        },
        {
          name: 'Ana Costa',
          role: 'Diretora de Marketing, FashionHub',
          content: 'Trabalho impecável! O site ficou moderno, rápido e exatamente como imaginávamos.',
          rating: 5,
          avatar: '👩‍🎨'
        },
        {
          name: 'Pedro Oliveira',
          role: 'Gestor de Produto, InnovateLab',
          content: 'Excelente comunicação e resultados que ultrapassaram as nossas expectativas. Recomendo!',
          rating: 5,
          avatar: '👨‍💼'
        },
        {
          name: 'Sofia Martins',
          role: 'Designer, CreativeStudio',
          content: 'A atenção ao detalhe é impressionante. Cada pixel perfeito, cada animação fluida.',
          rating: 5,
          avatar: '👩‍🎨'
        },
        {
          name: 'Ricardo Ferreira',
          role: 'CTO, DataFlow',
          content: 'Código limpo, performance excelente e suporte contínuo. Parceiro de confiança!',
          rating: 5,
          avatar: '👨‍💼'
        }
      ]
    },
    en: {
      title: 'What Our Clients Say',
      subtitle: 'Real testimonials from those who trust our work',
      testimonials: [
        {
          name: 'Maria Silva',
          role: 'CEO, TechStart',
          content: 'Strict.Dev transformed our vision into an impressive digital reality. Exceptional professionalism!',
          rating: 5,
          avatar: '👩‍💼'
        },
        {
          name: 'João Santos',
          role: 'Founder, EcoShop',
          content: 'Fantastic team! They delivered the project on time and exceeded all expectations.',
          rating: 5,
          avatar: '👨‍💻'
        },
        {
          name: 'Ana Costa',
          role: 'Marketing Director, FashionHub',
          content: 'Impeccable work! The website is modern, fast, and exactly as we imagined.',
          rating: 5,
          avatar: '👩‍🎨'
        },
        {
          name: 'Pedro Oliveira',
          role: 'Product Manager, InnovateLab',
          content: 'Excellent communication and results that exceeded our expectations. Highly recommend!',
          rating: 5,
          avatar: '👨‍💼'
        },
        {
          name: 'Sofia Martins',
          role: 'Designer, CreativeStudio',
          content: 'The attention to detail is impressive. Every pixel perfect, every animation smooth.',
          rating: 5,
          avatar: '👩‍🎨'
        },
        {
          name: 'Ricardo Ferreira',
          role: 'CTO, DataFlow',
          content: 'Clean code, excellent performance, and ongoing support. Trusted partner!',
          rating: 5,
          avatar: '👨‍💼'
        }
      ]
    }
  };

  const t = content[language];

  return (
    <section className="py-8 sm:py-12 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          key={`testimonials-header-${language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="mb-3 sm:mb-4 px-4 sm:px-0">{t.title}</h2>
          <p className="opacity-80 max-w-2xl mx-auto px-4 sm:px-0 text-sm sm:text-base">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {t.testimonials.slice(0, isMobile ? 2 : t.testimonials.length).map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: isMobile ? 0.2 : 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
              whileHover={!isMobile ? { 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
              } : undefined}
              className={`bg-background/70 rounded-2xl p-3 sm:p-5 h-full border-2 border-primary/30 hover:border-primary/50 ${
                !isMobile ? 'backdrop-blur-xl hover:shadow-2xl hover:shadow-primary/10 will-change-transform' : ''
              }`}
              style={!isMobile ? { 
                transitionProperty: 'border-color, box-shadow',
                transitionDuration: '200ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'transform'
              } : {
                transitionProperty: 'border-color',
                transitionDuration: '200ms'
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-1.5 sm:mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-xs sm:text-sm opacity-70 mb-2 sm:mb-4 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-2 sm:gap-3 pt-1.5 sm:pt-3 border-t border-current/10">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg sm:text-xl flex-shrink-0">
                  {testimonial.avatar}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-xs sm:text-sm truncate">{testimonial.name}</p>
                  <p className="text-[10px] sm:text-xs opacity-60 truncate">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}