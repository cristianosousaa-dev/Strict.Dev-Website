import { memo, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import SuccessBanner from './SuccessBanner';

const Contact = memo(function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { t, language } = useLanguage();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast.error(t('contact.form.error'));
      return;
    }
    
    setIsSubmitting(true);

    try {
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
      
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submission', {
          'event_category': 'Contact',
          'event_label': 'Contact Form Submit',
          'value': 1
        });
        
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
      
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitted(false);
      }, 4000);

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
  }, []);

  const progress = Object.values(formData).filter(v => v.trim()).length / 4 * 100;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-background relative overflow-hidden">
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
      
      <SuccessBanner 
        show={showBanner} 
        message={t('contact.form.success')}
        onClose={() => setShowBanner(false)}
      />

      {/* Accent Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-secondary/5 via-primary/5 to-transparent blur-3xl" />
      </div>

      {/* Vertical Divider Line */}
      <motion.div 
        className="hidden lg:block absolute left-1/2 top-20 bottom-20 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      <div className="container mx-auto px-6 sm:px-8">
        {/* Compact Header */}
        <motion.div
          key={`contact-header-${language}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3 sm:mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-primary font-medium">{t('contact.badge')}</span>
          </div>
          <h2 className="mb-3">{t('contact.title')}</h2>
          <p className="text-sm text-foreground/60 dark:text-white/60">
            {t('contact.description')}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* LEFT: Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4 sm:space-y-8"
            >
              {/* Statement */}
              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-3xl sm:text-4xl leading-tight tracking-tight">
                  {t('contact.statement.title')}
                  <br />
                  <span className="text-primary">{t('contact.statement.highlight')}</span>
                </h3>
                <p className="text-sm text-foreground/60 dark:text-white/60 max-w-sm">
                  {t('contact.statement.description')}
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4 sm:space-y-6 border-l-2 border-primary/20 pl-6">
                {/* Email */}
                <div className="group relative">
                  <div className="absolute -left-[27px] top-1 w-2 h-2 rounded-full bg-primary/30 group-hover:bg-primary group-hover:scale-125 transition-all duration-300" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 dark:text-white/40 mb-2 font-medium">
                    {t('contact.info.emailLabel')}
                  </p>
                  <a 
                    href="mailto:info@strict-dev.com"
                    className="group/link inline-flex items-center gap-2 text-foreground dark:text-white hover:text-primary dark:hover:text-primary transition-colors duration-300"
                  >
                    <span className="text-sm">info@strict-dev.com</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 -translate-y-1 translate-x-1 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all duration-300 text-primary" strokeWidth={2.5} />
                  </a>
                </div>

                {/* Location */}
                <div className="group relative">
                  <div className="absolute -left-[27px] top-1 w-2 h-2 rounded-full bg-primary/30 group-hover:bg-primary group-hover:scale-125 transition-all duration-300" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 dark:text-white/40 mb-2 font-medium">
                    {t('contact.info.locationLabel')}
                  </p>
                  <p className="text-sm text-foreground dark:text-white">
                    {t('contact.info.locationValue')}
                  </p>
                </div>

                {/* Response Time */}
                <div className="group relative">
                  <div className="absolute -left-[27px] top-1 w-2 h-2 rounded-full bg-primary/30 group-hover:bg-primary group-hover:scale-125 transition-all duration-300" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 dark:text-white/40 mb-2 font-medium">
                    {t('contact.info.responseLabel')}
                  </p>
                  <p className="text-sm text-foreground dark:text-white">
                    {t('contact.info.responseValue')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Progress Bar */}
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-foreground/40 dark:text-white/40">
                    <span>{t('contact.form.progress')}</span>
                    <span className="text-primary">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-px bg-foreground/5 dark:bg-white/5 overflow-hidden rounded-full">
                    <motion.div 
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Fields */}
                <div className="space-y-3 sm:space-y-5">
                  {/* Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="group relative"
                  >
                    <label 
                      htmlFor="name" 
                      className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 dark:text-white/40 mb-2 font-medium transition-colors duration-200 group-focus-within:text-primary"
                    >
                      {t('contact.form.nameLabel')}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder={t('contact.form.namePlaceholder')}
                      required
                      className="h-11 px-0 rounded-none border-0 border-b-2 border-foreground/10 dark:border-white/10 bg-transparent focus:border-primary focus:ring-0 transition-all duration-300 text-sm placeholder:text-foreground/20 dark:placeholder:text-white/20"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'name' ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="group relative"
                  >
                    <label 
                      htmlFor="email" 
                      className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 dark:text-white/40 mb-2 font-medium transition-colors duration-200 group-focus-within:text-primary"
                    >
                      {t('contact.form.emailLabel')}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder={t('contact.form.emailPlaceholder')}
                      required
                      className="h-11 px-0 rounded-none border-0 border-b-2 border-foreground/10 dark:border-white/10 bg-transparent focus:border-primary focus:ring-0 transition-all duration-300 text-sm placeholder:text-foreground/20 dark:placeholder:text-white/20"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'email' ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Subject */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="group relative"
                  >
                    <label 
                      htmlFor="subject" 
                      className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 dark:text-white/40 mb-2 font-medium transition-colors duration-200 group-focus-within:text-primary"
                    >
                      {t('contact.form.subjectLabel')}
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      placeholder={t('contact.form.subjectPlaceholder')}
                      required
                      className="h-11 px-0 rounded-none border-0 border-b-2 border-foreground/10 dark:border-white/10 bg-transparent focus:border-primary focus:ring-0 transition-all duration-300 text-sm placeholder:text-foreground/20 dark:placeholder:text-white/20"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'subject' ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="group relative"
                  >
                    <label 
                      htmlFor="message" 
                      className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 dark:text-white/40 mb-2 font-medium transition-colors duration-200 group-focus-within:text-primary"
                    >
                      {t('contact.form.messageLabel')}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder={t('contact.form.messagePlaceholder')}
                      rows={4}
                      required
                      className="px-0 py-2 rounded-none border-0 border-b-2 border-foreground/10 dark:border-white/10 bg-transparent focus:border-primary focus:ring-0 resize-none transition-all duration-300 text-sm placeholder:text-foreground/20 dark:placeholder:text-white/20"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'message' ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </div>

                {/* Submit */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="pt-2"
                >
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || isSubmitted}
                    className="group relative h-12 px-8 rounded-none bg-primary hover:bg-primary/90 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-[0_0_0_1px] shadow-primary/30 hover:shadow-[0_0_0_2px] hover:shadow-primary hover:scale-[1.02] [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]"
                  >
                    {/* Secondary accent on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Shimmer */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    
                    <span className="relative z-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-medium">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          {t('contact.form.sending')}
                        </>
                      ) : isSubmitted ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
                          {t('contact.form.sentButton')}
                        </>
                      ) : (
                        <>
                          {t('contact.form.sendButton')}
                          <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={2} />
                        </>
                      )}
                    </span>
                  </Button>
                </motion.div>

                {/* Privacy */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-[10px] text-foreground/30 dark:text-white/30 leading-relaxed"
                >
                  {t('contact.form.privacyNote')}
                </motion.p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Contact;