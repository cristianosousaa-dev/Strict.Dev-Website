import { motion, AnimatePresence } from 'motion/react';
import { useInView } from '../hooks/useInView';
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import strictDevLogo from 'figma:asset/4d7188997962f2b31b257965e8301d417e7e07aa.png';

// Import das screenshots reais do Strict.Dev
import screenshotLoading from 'figma:asset/48335e49fa2df26b8b776bb5151f66d6a3f65028.png';
import screenshotHeroLight from 'figma:asset/e300432e9560130db0cc579d86168302d4faa7d5.png';
import screenshotHeroDark from 'figma:asset/b30014f4cee77ff08758c4b5eadda8cd2f30a07e.png';
import screenshotContact from 'figma:asset/bc1d57521e143cbf1d1b77b0ca69aad09e247cd7.png';
import screenshotServices from 'figma:asset/c27488a4f9aeba35e836676e49d48218e8e98369.png';

// Import dos projetos "Coming Soon"
import arteRealImg from 'figma:asset/57e2949afa5950ee96910a85e430a48a98619dc5.png';
import strictHealthImg from 'figma:asset/1280a79352882357f7826b7696ec74d675d348d3.png';
import mundicoresImg from 'figma:asset/a216b87e074701e2da5b13f047da84a3129a5eb8.png';

interface ProjectImage {
  url: string;
  alt: string;
}

interface Project {
  id: number;
  title: string;
  year: string;
  description: {
    pt: string;
    en: string;
  };
  images: ProjectImage[];
  tech: string[];
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Strict.Dev",
    year: "2025",
    description: {
      pt: "Portfolio profissional com 6 temas, modo escuro, multi-idiomas e SEO otimizado.",
      en: "Professional portfolio with 6 themes, dark mode, multi-language and optimized SEO."
    },
    images: [
      { url: screenshotLoading, alt: "Loading Screen" },
      { url: screenshotHeroLight, alt: "Hero Light" },
      { url: screenshotHeroDark, alt: "Hero Dark" },
      { url: screenshotContact, alt: "Contact" },
      { url: screenshotServices, alt: "Services" }
    ],
    tech: ["React", "TypeScript", "Tailwind", "Motion"],
    link: "https://strict-dev.com"
  }
];

export default function PortfolioPremium() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  // Keyboard navigation
  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (fullscreenImage) {
          setFullscreenImage(null);
        } else {
          setSelectedProject(null);
        }
      }
      
      // Navigate images with arrow keys in fullscreen
      if (fullscreenImage && selectedProjectData) {
        if (e.key === 'ArrowRight') {
          const currentIndex = selectedProjectData.images.findIndex(img => img.url === fullscreenImage);
          if (currentIndex < selectedProjectData.images.length - 1) {
            setFullscreenImage(selectedProjectData.images[currentIndex + 1].url);
            setSelectedImage(currentIndex + 1);
          }
        }
        if (e.key === 'ArrowLeft') {
          const currentIndex = selectedProjectData.images.findIndex(img => img.url === fullscreenImage);
          if (currentIndex > 0) {
            setFullscreenImage(selectedProjectData.images[currentIndex - 1].url);
            setSelectedImage(currentIndex - 1);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, fullscreenImage, selectedProjectData]);

  return (
    <section id="portfolio" className="py-12 px-6 bg-background">
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Header Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="mb-8 text-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-full mb-4 cursor-pointer group relative overflow-hidden hover:-translate-y-1"
            style={{ 
              transition: 'all 150ms ease-out',
              willChange: 'transform'
            }}
          >
            {/* Animated Background Shine */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-200%', '200%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <span className="font-bold text-sm relative z-10">
              {language === 'pt' ? 'Projeto em Destaque' : 'Featured Project'}
            </span>
            <motion.div
              animate={{
                x: [0, 3, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ChevronRight className="w-5 h-5 relative z-10" />
            </motion.div>
            
            {/* Pulse Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary-foreground/30"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          <p className="text-sm text-muted-foreground">
            {language === 'pt' 
              ? 'Exemplo de trabalho profissional com design minimalista' 
              : 'Example of professional work with minimalist design'}
          </p>
        </motion.div>

        {/* Project Card - Ultra Compact */}
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            className="group"
          >
            <div 
              onClick={() => {
                setSelectedProject(project.id);
                setSelectedImage(0);
              }}
              className="bg-card border-2 border-primary/30 rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-56 bg-muted overflow-hidden">
                <img
                  src={project.images[1].url}
                  alt={project.images[1].alt}
                  className="w-full h-full object-cover grayscale blur-md group-hover:blur-sm group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Logo Watermark */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src={strictDevLogo} 
                    alt="Strict.Dev" 
                    className="w-32 h-32 object-contain opacity-90 group-hover:opacity-50 transition-opacity duration-500"
                  />
                </div>

                {/* Year Badge */}
                <div className="absolute top-3 right-3">
                  <div className="bg-background/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-border">
                    <span className="text-xs font-bold text-foreground">{project.year}</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  {project.description[language]}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-muted text-foreground text-[10px] font-semibold rounded border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Coming Soon Projects - Compact Thumbnails */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <div className="text-center mb-4">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {language === 'pt' ? 'Próximos Projetos' : 'Coming Soon'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Arte Real */}
            <div className="group relative bg-card border-2 border-primary/30 rounded-lg overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all">
              <div className="relative aspect-video">
                <img
                  src={arteRealImg}
                  alt="Arte Real"
                  className="w-full h-full object-cover grayscale blur-sm"
                />
                <div className="absolute inset-0 bg-background/40" />
                
                {/* Logo Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <img
                    src={strictDevLogo}
                    alt="Strict.Dev"
                    className="w-12 h-12 object-contain opacity-50"
                  />
                </div>

                {/* Badge */}
                <div className="absolute top-2 left-2">
                  <div className="px-2 py-0.5 rounded bg-background/90 backdrop-blur-sm border border-border">
                    <span className="text-[9px] font-medium text-muted-foreground">
                      {language === 'pt' ? 'Em Breve' : 'Soon'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-2.5">
                <h4 className="text-sm font-semibold text-foreground mb-1">Arte Real</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {language === 'pt' ? 'Restaurante Pizzaria Website' : 'Restaurant Pizzeria Website'}
                </p>
              </div>
            </div>

            {/* StrictHealth */}
            <div className="group relative bg-card border-2 border-primary/30 rounded-lg overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all">
              <div className="relative aspect-video">
                <img
                  src={strictHealthImg}
                  alt="StrictHealth"
                  className="w-full h-full object-cover grayscale blur-sm"
                />
                <div className="absolute inset-0 bg-background/40" />
                
                {/* Logo Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <img
                    src={strictDevLogo}
                    alt="Strict.Dev"
                    className="w-12 h-12 object-contain opacity-50"
                  />
                </div>

                {/* Badge */}
                <div className="absolute top-2 left-2">
                  <div className="px-2 py-0.5 rounded bg-background/90 backdrop-blur-sm border border-border">
                    <span className="text-[9px] font-medium text-muted-foreground">
                      {language === 'pt' ? 'Em Breve' : 'Soon'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-2.5">
                <h4 className="text-sm font-semibold text-foreground mb-1">StrictHealth</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {language === 'pt' ? 'Fitness Nutrição Web App' : 'Fitness Nutrition Web App'}
                </p>
              </div>
            </div>

            {/* Mundicores */}
            <div className="group relative bg-card border-2 border-primary/30 rounded-lg overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all">
              <div className="relative aspect-video">
                <img
                  src={mundicoresImg}
                  alt="Mundicores"
                  className="w-full h-full object-cover grayscale blur-sm"
                />
                <div className="absolute inset-0 bg-background/40" />
                
                {/* Logo Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <img
                    src={strictDevLogo}
                    alt="Strict.Dev"
                    className="w-12 h-12 object-contain opacity-50"
                  />
                </div>

                {/* Badge */}
                <div className="absolute top-2 left-2">
                  <div className="px-2 py-0.5 rounded bg-background/90 backdrop-blur-sm border border-border">
                    <span className="text-[9px] font-medium text-muted-foreground">
                      {language === 'pt' ? 'Em Breve' : 'Soon'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-2.5">
                <h4 className="text-sm font-semibold text-foreground mb-1">Mundicores</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {language === 'pt' ? 'Remodelação e Pintura Website' : 'Renovation & Painting Website'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MODAL - RESPEITA O HEADER */}
      <AnimatePresence>
        {selectedProject && selectedProjectData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-20 left-0 right-0 bottom-0 bg-black/90 backdrop-blur-sm z-40 flex items-center justify-center p-2 md:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-7xl h-[calc(100vh-6rem)] md:h-[calc(100vh-7rem)] bg-card rounded-xl md:rounded-2xl shadow-2xl overflow-hidden border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 md:top-4 md:right-4 z-10 bg-background/80 hover:bg-background text-foreground p-2 rounded-lg transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Layout: 2 Columns on Desktop, Single Column on Mobile */}
              <div className="flex flex-col md:grid md:grid-cols-[1.3fr_1fr] h-full overflow-y-auto md:overflow-hidden">{/* LEFT: Images */}
                <div className="bg-muted p-4 md:p-8 flex flex-col gap-3 md:gap-5">
                  {/* Logo Header */}
                  <div className="flex items-center justify-between">
                    <img 
                      src={strictDevLogo} 
                      alt="Strict.Dev" 
                      className="h-8 md:h-12 w-auto object-contain"
                    />
                    <span className="text-xs md:text-sm font-bold text-muted-foreground">{selectedProjectData.year}</span>
                  </div>

                  {/* Main Image */}
                  <div className="flex-1 flex items-center justify-center min-h-[200px] md:min-h-0">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={selectedImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        src={selectedProjectData.images[selectedImage].url}
                        alt={selectedProjectData.images[selectedImage].alt}
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl md:cursor-zoom-in md:hover:shadow-primary/20 transition-shadow"
                        onClick={(e) => {
                          // Only enable fullscreen on desktop
                          if (window.innerWidth >= 768) {
                            setFullscreenImage(selectedProjectData.images[selectedImage].url);
                          }
                        }}
                      />
                    </AnimatePresence>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {selectedProjectData.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-md overflow-hidden border-2 transition-all ${
                          idx === selectedImage 
                            ? 'border-primary' 
                            : 'border-border opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={img.alt}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* RIGHT: Info */}
                <div className="p-4 md:p-8 flex flex-col gap-3 md:gap-5 md:overflow-y-auto">{/* Tech Stack */}
                  <div>
                    <h3 className="text-xs md:text-sm font-bold text-foreground mb-2 md:mb-3 uppercase tracking-wider">
                      {language === 'pt' ? 'Tecnologias' : 'Technologies'}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {selectedProjectData.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 md:px-3 py-1 md:py-1.5 bg-primary/10 text-primary text-xs md:text-sm font-semibold rounded-md border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-xs md:text-sm font-bold text-foreground mb-2 md:mb-3 uppercase tracking-wider">
                      {language === 'pt' ? 'Características' : 'Features'}
                    </h3>
                    <div className="space-y-1.5 md:space-y-2">
                      {[
                        language === 'pt' ? '6 temas personalizáveis' : '6 customizable themes',
                        language === 'pt' ? 'Modo escuro/claro' : 'Dark/light mode',
                        language === 'pt' ? 'Multi-idiomas (PT/EN)' : 'Multi-language (PT/EN)',
                        language === 'pt' ? 'SEO otimizado' : 'Optimized SEO',
                        language === 'pt' ? 'Google Analytics 4' : 'Google Analytics 4'
                      ].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-primary rounded-full" />
                          <span className="text-xs md:text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div>
                    <h3 className="text-xs md:text-sm font-bold text-foreground mb-2 md:mb-3 uppercase tracking-wider">
                      {language === 'pt' ? 'Infraestrutura' : 'Infrastructure'}
                    </h3>
                    <div className="space-y-2">
                      <div className="bg-muted rounded-lg p-2.5 md:p-3">
                        <p className="text-[10px] md:text-xs text-muted-foreground uppercase mb-1">Hosting</p>
                        <p className="text-xs md:text-sm font-bold text-foreground">Cloudflare Pages</p>
                      </div>
                      <div className="bg-muted rounded-lg p-2.5 md:p-3">
                        <p className="text-[10px] md:text-xs text-muted-foreground uppercase mb-1">Domain</p>
                        <p className="text-xs md:text-sm font-bold text-foreground">strict-dev.com</p>
                      </div>
                      <div className="bg-muted rounded-lg p-2.5 md:p-3">
                        <p className="text-[10px] md:text-xs text-muted-foreground uppercase mb-1">Analytics</p>
                        <p className="text-xs md:text-sm font-bold text-foreground">Google Analytics 4</p>
                      </div>
                      <div className="bg-muted rounded-lg p-2.5 md:p-3">
                        <p className="text-[10px] md:text-xs text-muted-foreground uppercase mb-1">Email</p>
                        <p className="text-xs md:text-sm font-bold text-foreground">Web3Forms</p>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border" />

                  {/* Link to website */}
                  <div className="text-center pb-4 md:pb-0">
                    <a
                      href={selectedProjectData.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs md:text-sm text-primary hover:underline font-semibold inline-flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                      Strict.Dev - Excellence in Web Development
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN IMAGE */}
      <AnimatePresence>
        {fullscreenImage && selectedProjectData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-20 left-0 right-0 bottom-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-8"
            onClick={() => setFullscreenImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-10 bg-background/90 hover:bg-background text-foreground p-3 rounded-lg transition-colors shadow-xl"
              onClick={() => setFullscreenImage(null)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            {(() => {
              const currentIndex = selectedProjectData.images.findIndex(img => img.url === fullscreenImage);
              const hasPrevious = currentIndex > 0;
              const hasNext = currentIndex < selectedProjectData.images.length - 1;
              
              return (
                <>
                  {/* Previous Button */}
                  {hasPrevious && (
                    <button
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background text-foreground p-3 rounded-lg transition-all shadow-xl hover:scale-110"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFullscreenImage(selectedProjectData.images[currentIndex - 1].url);
                        setSelectedImage(currentIndex - 1);
                      }}
                    >
                      <ChevronLeft className="w-8 h-8" />
                    </button>
                  )}

                  {/* Next Button */}
                  {hasNext && (
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background text-foreground p-3 rounded-lg transition-all shadow-xl hover:scale-110"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFullscreenImage(selectedProjectData.images[currentIndex + 1].url);
                        setSelectedImage(currentIndex + 1);
                      }}
                    >
                      <ChevronRight className="w-8 h-8" />
                    </button>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-xl">
                    <span className="text-sm font-bold text-foreground">
                      {currentIndex + 1} / {selectedProjectData.images.length}
                    </span>
                  </div>
                </>
              );
            })()}

            {/* Main Image */}
            <motion.img
              key={fullscreenImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={fullscreenImage}
              alt="Imagem em tamanho real"
              className="max-w-full max-h-[calc(100vh-10rem)] object-contain rounded-xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}