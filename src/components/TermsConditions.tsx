import { motion } from 'motion/react';
import { X, FileText, Scale, AlertTriangle, Shield, CheckCircle2, Ban } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TermsConditionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsConditions({ isOpen, onClose }: TermsConditionsProps) {
  const { language } = useLanguage();

  if (!isOpen) return null;

  const content = {
    pt: {
      title: 'Termos e Condições',
      lastUpdated: 'Última atualização: 4 de Dezembro de 2025',
      sections: {
        acceptance: {
          title: 'Aceitação dos Termos',
          content: 'Ao aceder e utilizar o website Strict.Dev, você concorda em cumprir e estar vinculado a estes Termos e Condições. Se não concordar com qualquer parte destes termos, não deve utilizar este website.'
        },
        services: {
          title: 'Serviços Oferecidos',
          content: 'A Strict.Dev oferece serviços de desenvolvimento web e aplicações, incluindo mas não limitado a:',
          items: [
            'Desenvolvimento de websites personalizados',
            'Desenvolvimento de aplicações móveis',
            'Otimização de performance e SEO',
            'Consultoria técnica e suporte',
            'Manutenção e atualizações'
          ]
        },
        intellectualProperty: {
          title: 'Propriedade Intelectual',
          content: 'Todo o conteúdo deste website, incluindo design, código, texto, gráficos e logotipos, é propriedade da Strict.Dev e está protegido por leis de direitos de autor e propriedade intelectual. É proibida a reprodução sem autorização expressa.'
        },
        useOfWebsite: {
          title: 'Utilização do Website',
          content: 'Ao utilizar este website, você compromete-se a:',
          items: [
            'Não utilizar o site para fins ilegais ou não autorizados',
            'Não tentar aceder a áreas restritas do sistema',
            'Não transmitir vírus ou código malicioso',
            'Fornecer informações verdadeiras no formulário de contacto',
            'Respeitar os direitos de propriedade intelectual'
          ]
        },
        projectEngagement: {
          title: 'Compromisso de Projetos',
          content: 'Para projetos de desenvolvimento, os termos específicos, prazos, preços e entregáveis serão acordados através de proposta formal ou contrato separado. Este website serve apenas para apresentação e contacto inicial.'
        },
        limitations: {
          title: 'Limitação de Responsabilidade',
          content: 'A Strict.Dev não se responsabiliza por:',
          items: [
            'Interrupções temporárias do website',
            'Erros ou omissões no conteúdo informativo',
            'Problemas técnicos fora do nosso controlo',
            'Danos indiretos resultantes do uso do website',
            'Links externos para websites de terceiros'
          ]
        },
        warranty: {
          title: 'Garantias e Isenções',
          content: 'Este website é fornecido "tal como está". Embora nos esforcemos para manter informações precisas e atualizadas, não garantimos a completude ou exatidão de todo o conteúdo. Serviços profissionais são garantidos através de contratos específicos.'
        },
        privacy: {
          title: 'Privacidade e Dados',
          content: 'A recolha e processamento de dados pessoais está sujeita à nossa Política de Privacidade, que pode ser consultada separadamente. Estamos em conformidade com o RGPD.'
        },
        cookies: {
          title: 'Política de Cookies',
          content: 'Utilizamos cookies para melhorar a experiência do utilizador. Pode gerir as suas preferências de cookies através do banner apresentado no website.'
        },
        modifications: {
          title: 'Modificações aos Termos',
          content: 'Reservamo-nos o direito de modificar estes Termos e Condições a qualquer momento. Alterações significativas serão comunicadas através do website. A utilização continuada após alterações constitui aceitação dos novos termos.'
        },
        termination: {
          title: 'Rescisão de Acesso',
          content: 'Reservamo-nos o direito de suspender ou terminar o acesso de qualquer utilizador que viole estes termos, sem aviso prévio e a nosso exclusivo critério.'
        },
        governingLaw: {
          title: 'Lei Aplicável',
          content: 'Estes Termos e Condições são regidos pelas leis de Portugal. Qualquer disputa será resolvida nos tribunais competentes portugueses.'
        },
        contact: {
          title: 'Contacto',
          content: 'Para questões sobre estes Termos e Condições, contacte-nos através de info@strict-dev.com ou utilize o formulário de contacto disponível no website.'
        },
        severability: {
          title: 'Divisibilidade',
          content: 'Se qualquer disposição destes termos for considerada inválida ou inexequível, as restantes disposições continuarão em pleno vigor e efeito.'
        }
      }
    },
    en: {
      title: 'Terms and Conditions',
      lastUpdated: 'Last updated: December 4, 2025',
      sections: {
        acceptance: {
          title: 'Acceptance of Terms',
          content: 'By accessing and using the Strict.Dev website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you should not use this website.'
        },
        services: {
          title: 'Services Offered',
          content: 'Strict.Dev offers web and application development services, including but not limited to:',
          items: [
            'Custom website development',
            'Mobile application development',
            'Performance optimization and SEO',
            'Technical consulting and support',
            'Maintenance and updates'
          ]
        },
        intellectualProperty: {
          title: 'Intellectual Property',
          content: 'All content on this website, including design, code, text, graphics, and logos, is the property of Strict.Dev and is protected by copyright and intellectual property laws. Reproduction without express authorization is prohibited.'
        },
        useOfWebsite: {
          title: 'Use of Website',
          content: 'By using this website, you agree to:',
          items: [
            'Not use the site for illegal or unauthorized purposes',
            'Not attempt to access restricted areas of the system',
            'Not transmit viruses or malicious code',
            'Provide truthful information in the contact form',
            'Respect intellectual property rights'
          ]
        },
        projectEngagement: {
          title: 'Project Engagement',
          content: 'For development projects, specific terms, timelines, prices, and deliverables will be agreed upon through a formal proposal or separate contract. This website serves only for presentation and initial contact.'
        },
        limitations: {
          title: 'Limitation of Liability',
          content: 'Strict.Dev is not responsible for:',
          items: [
            'Temporary website interruptions',
            'Errors or omissions in informational content',
            'Technical issues beyond our control',
            'Indirect damages resulting from website use',
            'External links to third-party websites'
          ]
        },
        warranty: {
          title: 'Warranties and Disclaimers',
          content: 'This website is provided "as is". While we strive to maintain accurate and up-to-date information, we do not guarantee the completeness or accuracy of all content. Professional services are guaranteed through specific contracts.'
        },
        privacy: {
          title: 'Privacy and Data',
          content: 'The collection and processing of personal data is subject to our Privacy Policy, which can be consulted separately. We are GDPR compliant.'
        },
        cookies: {
          title: 'Cookie Policy',
          content: 'We use cookies to improve user experience. You can manage your cookie preferences through the banner displayed on the website.'
        },
        modifications: {
          title: 'Modifications to Terms',
          content: 'We reserve the right to modify these Terms and Conditions at any time. Significant changes will be communicated through the website. Continued use after changes constitutes acceptance of the new terms.'
        },
        termination: {
          title: 'Termination of Access',
          content: 'We reserve the right to suspend or terminate access of any user who violates these terms, without prior notice and at our sole discretion.'
        },
        governingLaw: {
          title: 'Governing Law',
          content: 'These Terms and Conditions are governed by the laws of Portugal. Any dispute will be resolved in the competent Portuguese courts.'
        },
        contact: {
          title: 'Contact',
          content: 'For questions about these Terms and Conditions, contact us at info@strict-dev.com or use the contact form available on the website.'
        },
        severability: {
          title: 'Severability',
          content: 'If any provision of these terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.'
        }
      }
    }
  };

  const t = content[language];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card w-full max-w-4xl rounded-2xl shadow-2xl border border-border my-8"
      >
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-xl border-b border-border p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{t.title}</h2>
                <p className="text-xs text-muted-foreground mt-1">{t.lastUpdated}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* Acceptance */}
          <Section icon={CheckCircle2} title={t.sections.acceptance.title}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.sections.acceptance.content}
            </p>
          </Section>

          {/* Services */}
          <Section icon={FileText} title={t.sections.services.title}>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {t.sections.services.content}
            </p>
            <ul className="space-y-2">
              {t.sections.services.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Intellectual Property */}
          <Section icon={Shield} title={t.sections.intellectualProperty.title}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.sections.intellectualProperty.content}
            </p>
          </Section>

          {/* Use of Website */}
          <Section icon={CheckCircle2} title={t.sections.useOfWebsite.title}>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {t.sections.useOfWebsite.content}
            </p>
            <ul className="space-y-2">
              {t.sections.useOfWebsite.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Project Engagement */}
          <Section icon={FileText} title={t.sections.projectEngagement.title}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.sections.projectEngagement.content}
            </p>
          </Section>

          {/* Limitations */}
          <Section icon={AlertTriangle} title={t.sections.limitations.title}>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {t.sections.limitations.content}
            </p>
            <ul className="space-y-2">
              {t.sections.limitations.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Warranty */}
          <Section icon={Shield} title={t.sections.warranty.title}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.sections.warranty.content}
            </p>
          </Section>

          {/* Privacy */}
          <Section icon={Shield} title={t.sections.privacy.title}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.sections.privacy.content}
            </p>
          </Section>

          {/* Cookies */}
          <Section icon={CheckCircle2} title={t.sections.cookies.title}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.sections.cookies.content}
            </p>
          </Section>

          {/* Modifications */}
          <Section icon={FileText} title={t.sections.modifications.title}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.sections.modifications.content}
            </p>
          </Section>

          {/* Termination */}
          <Section icon={Ban} title={t.sections.termination.title}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.sections.termination.content}
            </p>
          </Section>

          {/* Governing Law */}
          <Section icon={Scale} title={t.sections.governingLaw.title}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.sections.governingLaw.content}
            </p>
          </Section>

          {/* Contact */}
          <Section icon={FileText} title={t.sections.contact.title}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.sections.contact.content}
            </p>
          </Section>

          {/* Severability */}
          <Section icon={Scale} title={t.sections.severability.title}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.sections.severability.content}
            </p>
          </Section>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 bg-muted/50 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {language === 'pt' 
                ? 'Lei Portuguesa Aplicável'
                : 'Portuguese Law Applicable'}
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-semibold"
            >
              {language === 'pt' ? 'Fechar' : 'Close'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface SectionProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}

function Section({ icon: Icon, title, children }: SectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-primary" />
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}
