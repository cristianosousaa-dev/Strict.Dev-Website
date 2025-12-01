import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  pt: {
    // Header
    'header.home': 'Início',
    'header.services': 'Serviços',
    'header.portfolio': 'Portfólio',
    'header.about': 'Sobre Nós',
    'header.contact': 'Contacto',
    'header.language': 'Idioma',
    'header.theme': 'Tema',
    
    // Loading
    'loading.text': 'A carregar experiência...',
    
    // Hero
    'hero.greeting': 'Desenvolvimento Web de Excelência',
    'hero.title': 'Transformamos ideias em',
    'hero.titleHighlight': 'experiências digitais excecionais',
    'hero.description': 'Desenvolvemos websites e aplicações web de alta performance que impulsionam o crescimento do seu negócio. Soluções completas do conceito ao deploy, com tecnologia de ponta e design premium.',
    'hero.cta.contact': 'Iniciar Projecto',
    'hero.cta.portfolio': 'Ver Portfólio',
    'hero.badge.performance': 'Alta Performance',
    'hero.badge.design': 'Design Premium',
    'hero.badge.results': 'Resultados Comprovados',
    
    // Services
    'services.badge': 'Serviços',
    'services.title': 'Soluções Digitais Completas',
    'services.description': 'Oferecemos soluções empresariais de desenvolvimento web com foco em qualidade, escalabilidade e retorno sobre investimento.',
    'services.web.title': 'Websites Corporativos',
    'services.web.description': 'Websites institucionais premium que representam a excelência da sua marca com design profissional e performance otimizada.',
    'services.apps.title': 'Aplicações Web',
    'services.apps.description': 'Plataformas web robustas e escaláveis desenvolvidas com as tecnologias mais avançadas do mercado.',
    'services.performance.title': 'Otimização & Performance',
    'services.performance.description': 'Engenharia de performance avançada para garantir experiências ultrarrápidas e taxas de conversão superiores.',
    'services.design.title': 'UI/UX Design',
    'services.design.description': 'Interfaces intuitivas centradas no utilizador que maximizam engagement e convertem visitantes em clientes.',
    'services.custom.title': 'Desenvolvimento à Medida',
    'services.custom.description': 'Soluções empresariais personalizadas desenvolvidas especificamente para os requisitos únicos do seu negócio.',
    'services.deploy.title': 'Deploy & Infraestrutura',
    'services.deploy.description': 'Implementação profissional e gestão contínua de infraestrutura para garantir disponibilidade e performance 24/7.',
    
    // Portfolio
    'portfolio.badge': 'Portfólio',
    'portfolio.title': 'Casos de Sucesso',
    'portfolio.description': 'Projectos que demonstram nossa excelência técnica e compromisso com resultados mensuráveis.',
    'portfolio.viewProject': 'Ver projecto',
    'portfolio.viewCode': 'Ver código',
    'portfolio.project1.title': 'E-commerce Enterprise',
    'portfolio.project1.description': 'Plataforma de e-commerce completa com integração de pagamentos, gestão de inventário e analytics avançados.',
    'portfolio.project2.title': 'Dashboard Analytics',
    'portfolio.project2.description': 'Sistema empresarial de Business Intelligence com visualização de dados em tempo real e relatórios personalizados.',
    'portfolio.project3.title': 'Landing Page SaaS',
    'portfolio.project3.description': 'Landing page de alta conversão com animações premium e otimização A/B testing para produto SaaS.',
    'portfolio.project4.title': 'Plataforma de Produtividade',
    'portfolio.project4.description': 'Aplicação web empresarial para gestão de projectos com colaboração em tempo real e integrações corporativas.',
    'portfolio.project5.title': 'Portfólio Digital Premium',
    'portfolio.project5.description': 'Website premium com animações cinematográficas e experiência imersiva para marca de luxo.',
    'portfolio.project6.title': 'Plataforma de Conteúdo',
    'portfolio.project6.description': 'Sistema de gestão de conteúdo enterprise com CMS headless e otimização avançada de SEO.',
    
    // About
    'about.badge': 'A Empresa',
    'about.title': 'Quem Somos',
    'about.description': 'Especialistas em criar soluções digitais que transformam negócios!',
    'about.text1': 'Somos uma empresa especializada em desenvolvimento web de alta performance e soluções digitais empresariais. Transformamos desafios de negócio em produtos digitais escaláveis, sempre focados em qualidade, performance e resultados mensuráveis.',
    'about.text2': 'Nossa metodologia combina as melhores práticas de engenharia de software com design centrado no utilizador. Cada projecto recebe atenção dedicada aos detalhes técnicos e estratégicos, garantindo entregas que excedem expectativas e geram valor real.',
    'about.stats.projects': 'Projectos Entregues',
    'about.stats.clients': 'Empresas Atendidas',
    'about.stats.coffee': 'Linhas de Código',
    'about.stats.dedication': 'Taxa de Satisfação',
    
    // Contact
    'contact.badge': 'Contacto',
    'contact.title': 'Vamos Impulsionar o Seu Negócio',
    'contact.description': 'Contacte-nos para discutir como podemos transformar os seus desafios digitais em oportunidades de crescimento.',
    'contact.info.email': 'Email Corporativo',
    'contact.info.phone': 'Telefone',
    'contact.info.location': 'Localização',
    'contact.info.locationValue': 'Portugal',
    'contact.cta.title': 'Pronto para Começar?',
    'contact.cta.description': 'Preencha o formulário para iniciar uma conversa sobre o seu projecto.',
    'contact.form.step1': 'Informações de Contacto',
    'contact.form.step2': 'Detalhes do Projecto',
    'contact.form.name': 'Nome ou empresa',
    'contact.form.namePlaceholder': 'Nome ou empresa',
    'contact.form.email': 'Email Corporativo',
    'contact.form.emailPlaceholder': 'email@empresa.com',
    'contact.form.subject': 'Tipo de Projecto',
    'contact.form.subjectPlaceholder': 'Website, Aplicação Web, E-commerce...',
    'contact.form.message': 'Descrição do Projecto',
    'contact.form.messagePlaceholder': 'Conte-nos sobre os objetivos e requisitos do seu projecto...',
    'contact.form.next': 'Continuar',
    'contact.form.back': 'Anterior',
    'contact.form.submit': 'Enviar Pedido',
    'contact.form.sending': 'A enviar...',
    'contact.form.sent': 'Enviado!',
    'contact.form.success': 'Pedido recebido! Entraremos em contacto brevemente.',
    'contact.form.error': 'Por favor, preencha todos os campos obrigatórios.',
    'contact.form.emailInvalid': 'Por favor, insira um email corporativo válido.',
    'contact.form.openEmail': 'Abrir cliente de email para enviar a mensagem?',
    'contact.form.openPhone': 'Deseja contactar-nos por telefone?',
    
    // WhatsApp
    'whatsapp.greeting': 'Strict.Dev 👋',
    'whatsapp.subtitle': 'Como podemos ajudar o seu negócio?',
    'whatsapp.label': 'Descreva o seu projecto (será enviado via WhatsApp)',
    'whatsapp.placeholder': 'Descreva as suas necessidades...',
    'whatsapp.call': 'Ligar',
    'whatsapp.send': 'Enviar',
    'whatsapp.defaultMessage': 'Olá! Gostaria de discutir um projecto de desenvolvimento web.',
    
    // Footer
    'footer.rights': 'Todos os direitos reservados.',
    
    // Skills Section
    'skills.badge': 'Tecnologias',
    'skills.title': 'Stack Tecnológico',
    'skills.subtitle': 'Tecnologias enterprise que utilizamos para criar soluções digitais de alto desempenho',
    'skills.evolution': 'Tecnologias em constante atualização',
    'skills.tap': 'TOCAR',
    'skills.hover': 'PASSAR',
    'skills.revealAll': 'Revelar Tudo',
    
    // CTA Components
    'cta.sticky.text': 'Pronto para transformar o seu negócio?',
    'cta.sticky.button': 'Iniciar Projecto',
    'cta.exit.title': 'Antes de Sair... 👋',
    'cta.exit.subtitle': 'Vamos transformar o seu negócio digital',
    'cta.exit.description': 'Agende uma consultoria gratuita de 15 minutos e descubra como podemos impulsionar o crescimento do seu negócio online.',
    'cta.exit.benefit1': 'Consultoria gratuita',
    'cta.exit.benefit2': 'Resposta em 24h',
    'cta.exit.benefit3': 'Sem compromisso',
    'cta.exit.button': 'Agendar Consultoria',
    'cta.exit.close': 'Talvez mais tarde',
    'cta.section.title': 'Pronto para o Próximo Nível?',
    'cta.section.description': 'Vamos discutir como podemos impulsionar o crescimento do seu negócio digital!',
    'cta.section.button': 'Iniciar Projecto',
  },
  en: {
    // Header
    'header.home': 'Home',
    'header.services': 'Services',
    'header.portfolio': 'Portfolio',
    'header.about': 'About Us',
    'header.contact': 'Contact',
    'header.language': 'Language',
    'header.theme': 'Theme',
    
    // Loading
    'loading.text': 'Loading experience...',
    
    // Hero
    'hero.greeting': 'Excellence in Web Development',
    'hero.title': 'We transform ideas into',
    'hero.titleHighlight': 'exceptional digital experiences',
    'hero.description': 'We develop high-performance websites and web applications that drive business growth. Complete solutions from concept to deployment, with cutting-edge technology and premium design.',
    'hero.cta.contact': 'Start Project',
    'hero.cta.portfolio': 'View Portfolio',
    'hero.badge.performance': 'High Performance',
    'hero.badge.design': 'Premium Design',
    'hero.badge.results': 'Proven Results',
    
    // Services
    'services.badge': 'Services',
    'services.title': 'Complete Digital Solutions',
    'services.description': 'We offer enterprise web development solutions focused on quality, scalability and return on investment.',
    'services.web.title': 'Corporate Websites',
    'services.web.description': 'Premium institutional websites that represent your brand excellence with professional design and optimized performance.',
    'services.apps.title': 'Web Applications',
    'services.apps.description': 'Robust and scalable web platforms developed with the most advanced technologies in the market.',
    'services.performance.title': 'Optimization & Performance',
    'services.performance.description': 'Advanced performance engineering to ensure ultra-fast experiences and superior conversion rates.',
    'services.design.title': 'UI/UX Design',
    'services.design.description': 'User-centered intuitive interfaces that maximize engagement and convert visitors into customers.',
    'services.custom.title': 'Custom Development',
    'services.custom.description': 'Enterprise custom solutions developed specifically for your business unique requirements.',
    'services.deploy.title': 'Deploy & Infrastructure',
    'services.deploy.description': 'Professional implementation and continuous infrastructure management to ensure 24/7 availability and performance.',
    
    // Portfolio
    'portfolio.badge': 'Portfolio',
    'portfolio.title': 'Success Stories',
    'portfolio.description': 'Projects that demonstrate our technical excellence and commitment to measurable results.',
    'portfolio.viewProject': 'View project',
    'portfolio.viewCode': 'View code',
    'portfolio.project1.title': 'Enterprise E-commerce',
    'portfolio.project1.description': 'Complete e-commerce platform with payment integration, inventory management and advanced analytics.',
    'portfolio.project2.title': 'Analytics Dashboard',
    'portfolio.project2.description': 'Enterprise Business Intelligence system with real-time data visualization and custom reports.',
    'portfolio.project3.title': 'SaaS Landing Page',
    'portfolio.project3.description': 'High-conversion landing page with premium animations and A/B testing optimization for SaaS product.',
    'portfolio.project4.title': 'Productivity Platform',
    'portfolio.project4.description': 'Enterprise web application for project management with real-time collaboration and corporate integrations.',
    'portfolio.project5.title': 'Premium Digital Portfolio',
    'portfolio.project5.description': 'Premium website with cinematic animations and immersive experience for luxury brand.',
    'portfolio.project6.title': 'Content Platform',
    'portfolio.project6.description': 'Enterprise content management system with headless CMS and advanced SEO optimization.',
    
    // About
    'about.badge': 'The Company',
    'about.title': 'Who We Are',
    'about.description': 'Specialists in creating digital solutions that transform businesses!',
    'about.text1': 'We are a company specialized in high-performance web development and enterprise digital solutions. We transform business challenges into scalable digital products, always focused on quality, performance and measurable results.',
    'about.text2': 'Our methodology combines software engineering best practices with user-centered design. Each project receives dedicated attention to technical and strategic details, ensuring deliveries that exceed expectations and generate real value.',
    'about.stats.projects': 'Projects Delivered',
    'about.stats.clients': 'Companies Served',
    'about.stats.coffee': 'Lines of Code',
    'about.stats.dedication': 'Satisfaction Rate',
    
    // Contact
    'contact.badge': 'Contact',
    'contact.title': 'Let\'s Boost Your Business',
    'contact.description': 'Contact us to discuss how we can transform your digital challenges into growth opportunities.',
    'contact.info.email': 'Corporate Email',
    'contact.info.phone': 'Phone',
    'contact.info.location': 'Location',
    'contact.info.locationValue': 'Portugal',
    'contact.cta.title': 'Ready to Get Started?',
    'contact.cta.description': 'Fill out the form to start a conversation about your project.',
    'contact.form.step1': 'Contact Information',
    'contact.form.step2': 'Project Details',
    'contact.form.name': 'Name or company',
    'contact.form.namePlaceholder': 'Name or company',
    'contact.form.email': 'Corporate Email',
    'contact.form.emailPlaceholder': 'email@company.com',
    'contact.form.subject': 'Project Type',
    'contact.form.subjectPlaceholder': 'Website, Web App, E-commerce...',
    'contact.form.message': 'Project Description',
    'contact.form.messagePlaceholder': 'Tell us about your project goals and requirements...',
    'contact.form.next': 'Continue',
    'contact.form.back': 'Previous',
    'contact.form.submit': 'Submit Request',
    'contact.form.sending': 'Sending...',
    'contact.form.sent': 'Sent!',
    'contact.form.success': 'Request received! We\'ll get back to you shortly.',
    'contact.form.error': 'Please fill in all required fields.',
    'contact.form.emailInvalid': 'Please enter a valid corporate email.',
    'contact.form.openEmail': 'Open email client to send the message?',
    'contact.form.openPhone': 'Would you like to contact us by phone?',
    
    // WhatsApp
    'whatsapp.greeting': 'Strict.Dev 👋',
    'whatsapp.subtitle': 'How can we help your business?',
    'whatsapp.label': 'Describe your project (will be sent via WhatsApp)',
    'whatsapp.placeholder': 'Describe your needs...',
    'whatsapp.call': 'Call',
    'whatsapp.send': 'Send',
    'whatsapp.defaultMessage': 'Hello! I would like to discuss a web development project.',
    
    // Footer
    'footer.rights': 'All rights reserved.',
    
    // Skills Section
    'skills.badge': 'Technologies',
    'skills.title': 'Technology Stack',
    'skills.subtitle': 'Enterprise technologies we use to create high-performance digital solutions',
    'skills.evolution': 'Constantly updated technologies',
    'skills.tap': 'TAP',
    'skills.hover': 'HOVER',
    'skills.revealAll': 'Reveal All',
    
    // CTA Components
    'cta.sticky.text': 'Ready to transform your business?',
    'cta.sticky.button': 'Start Project',
    'cta.exit.title': 'Before You Go... 👋',
    'cta.exit.subtitle': 'Let\'s transform your digital business',
    'cta.exit.description': 'Schedule a free 15-minute consultation and discover how we can boost your online business growth.',
    'cta.exit.benefit1': 'Free consultation',
    'cta.exit.benefit2': 'Response in 24h',
    'cta.exit.benefit3': 'No commitment',
    'cta.exit.button': 'Schedule Consultation',
    'cta.exit.close': 'Maybe later',
    'cta.section.title': 'Ready for the Next Level?',
    'cta.section.description': 'Let\'s discuss how we can boost your digital business growth!',
    'cta.section.button': 'Start Project',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('strictdev-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('strictdev-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}