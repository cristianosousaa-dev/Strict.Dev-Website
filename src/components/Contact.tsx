import { memo, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, User, MessageSquare, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { useIsMobile } from '../hooks/useMediaQuery';
import SuccessBanner from './SuccessBanner';

const Contact = memo(function Contact() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showBanner, setShowBanner] = useState(false);
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar todos os campos
    if (!formData.subject.trim() || !formData.message.trim()) {
      toast.error(t('contact.form.error'));
      return;
    }
    
    setIsSubmitting(true);

    try {
      // 🔥 MÉTODO 1: EmailJS (Requer instalação: npm install @emailjs/browser)
      // Descomenta quando instalares o EmailJS e preencheres as credenciais
      /*
      const emailjs = (await import('@emailjs/browser')).default;
      
      const serviceId = 'YOUR_SERVICE_ID';      // Ex: service_abc123
      const templateId = 'YOUR_TEMPLATE_ID';    // Ex: template_xyz789
      const publicKey = 'YOUR_PUBLIC_KEY';      // Ex: abc123XYZ

      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'contacto@strict.dev',
        },
        publicKey
      );
      console.log('✅ Email enviado:', result.text);
      */

      // 🔥 MÉTODO 2: Formspree (Mais simples - sem instalação!)
      // 1. Cria conta em https://formspree.io
      // 2. Cria novo form e copia o endpoint
      // 3. Substitui 'YOUR_FORM_ID' abaixo
      /*
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });
      
      if (!response.ok) throw new Error('Failed to send');
      */

      // ✅ MÉTODO 3: Web3Forms - ATIVO!
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '737d2200-e240-459a-8c60-51b179397982',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'Strict.Dev Website',
          replyto: formData.email
        })
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to send');
      }

      console.log('✅ Email enviado com sucesso via Web3Forms!');
      
      // 🔥 GOOGLE ANALYTICS - Track Conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submission', {
          'event_category': 'Contact',
          'event_label': 'Contact Form Submit - Strict.Dev',
          'value': 1
        });
        
        // Track as conversion
        (window as any).gtag('event', 'conversion', {
          'send_to': 'G-D6X8BXE242',
          'event_category': 'Lead',
          'event_label': 'New Contact Form Lead'
        });
      }
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      setShowBanner(true);
      toast.success(t('contact.form.success'));
      
      // Resetar formulário após 4 segundos
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitted(false);
        setCurrentStep(0);
      }, 4000);

      // Esconder banner após 5 segundos
      setTimeout(() => {
        setShowBanner(false);
      }, 5000);

    } catch (error) {
      console.error('❌ Erro ao enviar:', error);
      setIsSubmitting(false);
      toast.error(t('contact.form.error'));
    }
  }, [formData, t]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Limpar mensagem de erro quando começar a escrever
    if (errorMessage) setErrorMessage('');
  }, [errorMessage]);

  const validateEmail = (email: string) => {
    // Regex para validar email com domínio completo e mais rigoroso
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(email)) {
      return false;
    }
    
    // Validações adicionais para garantir qualidade
    const parts = email.split('@');
    if (parts.length !== 2) return false;
    
    const [localPart, domainPart] = parts;
    
    // Local part deve ter pelo menos 2 caracteres
    if (localPart.length < 2) return false;
    
    // Domain deve ter pelo menos um ponto
    if (!domainPart.includes('.')) return false;
    
    // Domínio antes do ponto deve ter pelo menos 2 caracteres
    const domainParts = domainPart.split('.');
    if (domainParts[0].length < 2) return false;
    
    // Extensão (após o último ponto) deve ter pelo menos 2 caracteres
    const extension = domainParts[domainParts.length - 1];
    if (extension.length < 2) return false;
    
    return true;
  };

  const nextStep = () => {
    setErrorMessage('');
    
    if (!formData.name.trim()) {
      setErrorMessage(t('contact.form.error'));
      return;
    }
    
    if (!formData.email.trim()) {
      setErrorMessage(t('contact.form.error'));
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setErrorMessage(t('contact.form.emailInvalid'));
      return;
    }
    
    setCurrentStep(1);
  };

  const prevStep = () => {
    setCurrentStep(0);
  };

  const contactInfo = [
    { 
      icon: Mail, 
      label: t('contact.info.email'), 
      value: 'info@strict-dev.com',
    },
    { 
      icon: Phone, 
      label: t('contact.info.phone'), 
      value: '+351 910 205 459',
    },
    { 
      icon: MapPin, 
      label: t('contact.info.location'), 
      value: t('contact.info.locationValue'),
    },
  ];

  const steps = [
    { title: t('contact.form.step1'), icon: User },
    { title: t('contact.form.step2'), icon: MessageSquare },
  ];

  return (
    <section id="contact" className="py-8 sm:py-16 relative overflow-hidden">
      {/* Force black text on autocomplete in light mode */}
      <style dangerouslySetInnerHTML={{__html: `
        :root[data-mode="light"] input:-webkit-autofill,
        :root[data-mode="light"] input:-webkit-autofill:hover,
        :root[data-mode="light"] input:-webkit-autofill:focus,
        :root[data-mode="light"] input:-webkit-autofill:active,
        :root[data-mode="light"] textarea:-webkit-autofill,
        :root[data-mode="light"] textarea:-webkit-autofill:hover,
        :root[data-mode="light"] textarea:-webkit-autofill:focus,
        :root[data-mode="light"] textarea:-webkit-autofill:active {
          -webkit-text-fill-color: #000000 !important;
          color: #000000 !important;
        }
        
        :root[data-mode="dark"] input:-webkit-autofill,
        :root[data-mode="dark"] input:-webkit-autofill:hover,
        :root[data-mode="dark"] input:-webkit-autofill:focus,
        :root[data-mode="dark"] input:-webkit-autofill:active,
        :root[data-mode="dark"] textarea:-webkit-autofill,
        :root[data-mode="dark"] textarea:-webkit-autofill:hover,
        :root[data-mode="dark"] textarea:-webkit-autofill:focus,
        :root[data-mode="dark"] textarea:-webkit-autofill:active {
          -webkit-text-fill-color: #ffffff !important;
          color: #ffffff !important;
        }
      `}} />
      
      {/* Success Banner */}
      <SuccessBanner 
        show={showBanner} 
        message={t('contact.form.success')}
        onClose={() => setShowBanner(false)}
      />

      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-primary/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          key={`contact-header-${language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          className="text-center mb-6 sm:mb-16"
        >
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-2 sm:mb-4 text-xs sm:text-sm">
            {t('contact.badge')}
          </span>
          <h2 className="mb-2 sm:mb-4 px-4 sm:px-0">{t('contact.title')}</h2>
          <p className="opacity-80 max-w-2xl mx-auto px-4 sm:px-0 text-sm sm:text-base">
            {t('contact.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col h-full justify-between space-y-3 sm:space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-6 rounded-2xl border-2 border-primary/30 hover:border-primary/50 transition-colors duration-200 flex-1 ${
                  isMobile ? 'bg-background/90' : 'bg-background/70 backdrop-blur-xl'
                }`}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center flex-shrink-0 ${
                  !isMobile ? 'backdrop-blur-sm' : ''
                }`}>
                  <info.icon className="w-4 h-4 sm:w-5 sm:h-5 text-black dark:text-white" strokeWidth={2.5} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-foreground/70 dark:text-white/70 mb-1 font-medium">{info.label}</p>
                  <p className="text-xs sm:text-sm text-foreground dark:text-white break-words font-medium">{info.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <form onSubmit={handleSubmit} className={`space-y-4 sm:space-y-6 p-4 sm:p-8 rounded-3xl border-2 border-primary/30 ${
              isMobile ? 'bg-background/90' : 'bg-background/70 backdrop-blur-xl'
            }`}>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-4 sm:mb-8">
                {steps.map((step, index) => (
                  <div key={step.title} className="flex items-center flex-1">
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <motion.div
                        animate={{
                          scale: currentStep === index ? 1.1 : 1,
                          backgroundColor: currentStep >= index 
                            ? 'hsl(var(--primary))' 
                            : 'hsl(var(--muted))',
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                      >
                        <step.icon 
                          className="w-5 h-5" 
                          style={{
                            color: currentStep >= index 
                              ? 'hsl(var(--primary-foreground))' 
                              : 'hsl(var(--foreground))'
                          }}
                        />
                      </motion.div>
                      <p className="text-xs text-center text-foreground/70">
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <motion.div
                        animate={{
                          backgroundColor: currentStep > index 
                            ? 'hsl(var(--primary))' 
                            : 'hsl(var(--muted))',
                        }}
                        transition={{ duration: 0.3 }}
                        className="h-0.5 flex-1 mx-2"
                      />
                    )}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div
                    key="step-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div>
                      <label htmlFor="name" className="block text-sm mb-2 font-medium text-foreground dark:text-white">
                        {t('contact.form.name')} *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('contact.form.namePlaceholder')}
                        required
                        className="rounded-xl focus:scale-[1.01] will-change-transform border-2 border-primary/30 focus:border-primary dark:bg-white/5 dark:border-primary/40 dark:focus:border-primary"
                        style={{ 
                          transitionProperty: 'transform, box-shadow, border-color',
                          transitionDuration: '150ms',
                          transitionTimingFunction: 'ease-out'
                        }}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm mb-2 font-medium text-foreground dark:text-white">
                        {t('contact.form.email')} *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('contact.form.emailPlaceholder')}
                        required
                        className="rounded-xl focus:scale-[1.01] will-change-transform border-2 border-primary/30 focus:border-primary dark:bg-white/5 dark:border-primary/40 dark:focus:border-primary"
                        style={{ 
                          transitionProperty: 'transform, box-shadow, border-color',
                          transitionDuration: '150ms',
                          transitionTimingFunction: 'ease-out'
                        }}
                      />
                    </div>

                    <Button 
                      type="button"
                      onClick={nextStep}
                      size="lg" 
                      className="w-full gap-2 rounded-xl relative overflow-hidden group cursor-pointer hover:scale-105 hover:-translate-y-1"
                      style={{ 
                        transition: 'all 150ms ease-out',
                        willChange: 'transform, box-shadow'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                      <span className="relative z-10">{t('contact.form.next')}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150 relative z-10" />
                    </Button>
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div>
                      <label htmlFor="subject" className="block text-sm mb-2 font-medium text-foreground dark:text-white">
                        {t('contact.form.subject')} *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder={t('contact.form.subjectPlaceholder')}
                        required
                        className="rounded-xl focus:scale-[1.01] will-change-transform border-2 border-primary/30 focus:border-primary dark:bg-white/5 dark:border-primary/40 dark:focus:border-primary"
                        style={{ 
                          transitionProperty: 'transform, box-shadow, border-color',
                          transitionDuration: '150ms',
                          transitionTimingFunction: 'ease-out'
                        }}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm mb-2 font-medium text-foreground dark:text-white">
                        {t('contact.form.message')} *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t('contact.form.messagePlaceholder')}
                        rows={6}
                        required
                        className="rounded-xl resize-none focus:scale-[1.01] will-change-transform border-2 border-primary/30 focus:border-primary dark:bg-white/5 dark:border-primary/40 dark:focus:border-primary"
                        style={{ 
                          transitionProperty: 'transform, box-shadow, border-color',
                          transitionDuration: '150ms',
                          transitionTimingFunction: 'ease-out'
                        }}
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        type="button"
                        onClick={prevStep}
                        size="lg" 
                        variant="outline"
                        className="flex-1 gap-2 rounded-xl relative overflow-hidden group cursor-pointer hover:scale-[1.02] will-change-transform"
                        disabled={isSubmitting || isSubmitted}
                        style={{ 
                          transition: 'transform 150ms ease-out',
                          willChange: 'transform'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                        <ArrowLeft className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">{t('contact.form.back')}</span>
                      </Button>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="flex-1 gap-2 rounded-xl relative overflow-hidden group cursor-pointer hover:scale-[1.02] will-change-transform"
                        disabled={isSubmitting || isSubmitted}
                        style={{ 
                          transition: 'transform 150ms ease-out, box-shadow 150ms ease-out',
                          willChange: 'transform, box-shadow'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSubmitting && !isSubmitted) {
                            e.currentTarget.style.transform = 'scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(var(--primary) / 0.3), 0 8px 10px -6px rgba(var(--primary) / 0.3)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = '';
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                        <span className="relative z-10">
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block mr-2"
                              />
                              {t('contact.form.sending')}
                            </>
                          ) : isSubmitted ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 inline-block mr-2" />
                              {t('contact.form.sent')}
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 inline-block mr-2" />
                              {t('contact.form.submit')}
                            </>
                          )}
                        </span>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
            
            {/* Error Message */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`mt-4 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-3 ${
                    !isMobile ? 'backdrop-blur-xl' : ''
                  }`}
                >
                  <AlertCircle className="w-5 h-5 text-yellow-700 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">{errorMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* CTA Card - Centered Below Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 sm:mt-8 max-w-6xl mx-auto"
        >
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-primary via-primary to-secondary border-2 border-primary/50 relative overflow-hidden">
            {/* Shimmer Effect - Always Active */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                repeatDelay: 1
              }}
            />
            <motion.div 
              key={`contact-cta-${language}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 text-white text-center"
            >
              <h3 className="mb-2 text-base sm:text-lg">{t('contact.cta.title')}</h3>
              <p className="text-xs sm:text-sm opacity-90">
                {t('contact.cta.description')}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default Contact;