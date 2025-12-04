import { motion } from 'motion/react';
import { X, Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicy({ isOpen, onClose }: PrivacyPolicyProps) {
  const { language } = useLanguage();

  if (!isOpen) return null;

  const content = {
    pt: {
      title: 'Política de Privacidade',
      lastUpdated: 'Última atualização: 4 de Dezembro de 2025',
      sections: {
        intro: {
          title: 'Introdução',
          content: 'A Strict.Dev está comprometida em proteger a sua privacidade. Esta política explica como recolhemos, usamos e protegemos os seus dados pessoais de acordo com o RGPD (Regulamento Geral de Proteção de Dados).'
        },
        dataController: {
          title: 'Responsável pelo Tratamento de Dados',
          content: 'Strict.Dev é o responsável pelo tratamento dos seus dados pessoais. Para questões relacionadas com privacidade, contacte-nos em info@strict-dev.com.'
        },
        dataCollected: {
          title: 'Dados Recolhidos',
          items: [
            'Nome e email fornecidos através do formulário de contacto',
            'Dados de navegação através do Google Analytics (anónimos)',
            'Preferências de cookies e tema do website',
            'Informações técnicas (browser, dispositivo, IP) para segurança'
          ]
        },
        dataUsage: {
          title: 'Como Utilizamos os Seus Dados',
          items: [
            'Responder às suas mensagens através do formulário de contacto',
            'Melhorar a experiência do utilizador no website',
            'Análise de tráfego e comportamento (Google Analytics 4)',
            'Segurança e prevenção de fraude'
          ]
        },
        legalBasis: {
          title: 'Base Legal',
          content: 'Processamos os seus dados com base no consentimento (cookies e analytics), interesse legítimo (segurança) e execução de contrato (resposta a contactos).'
        },
        dataSharing: {
          title: 'Partilha de Dados',
          items: [
            'Google Analytics - análise de tráfego anónimo',
            'Web3Forms - processamento de formulários de contacto',
            'Cloudflare Pages - hosting e CDN',
            'Não vendemos os seus dados a terceiros'
          ]
        },
        dataRetention: {
          title: 'Retenção de Dados',
          content: 'Os dados de contacto são mantidos por 2 anos. Dados analíticos são retidos por 14 meses (Google Analytics). Pode solicitar a eliminação a qualquer momento.'
        },
        yourRights: {
          title: 'Os Seus Direitos (RGPD)',
          items: [
            'Acesso aos seus dados pessoais',
            'Retificação de dados incorretos',
            'Eliminação dos seus dados ("direito ao esquecimento")',
            'Portabilidade dos dados',
            'Oposição ao processamento',
            'Retirar consentimento a qualquer momento'
          ]
        },
        cookies: {
          title: 'Cookies',
          content: 'Utilizamos cookies necessários (funcionamento do site), analíticos (Google Analytics) e de preferência (tema/idioma). Pode gerir as suas preferências no banner de cookies.'
        },
        security: {
          title: 'Segurança',
          content: 'Utilizamos HTTPS, Cloudflare CDN, e seguimos as melhores práticas de segurança para proteger os seus dados.'
        },
        changes: {
          title: 'Alterações a Esta Política',
          content: 'Reservamo-nos o direito de atualizar esta política. Alterações significativas serão comunicadas através do website.'
        },
        contact: {
          title: 'Contacto',
          content: 'Para exercer os seus direitos ou questões sobre privacidade, contacte info@strict-dev.com.'
        }
      }
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: December 4, 2025',
      sections: {
        intro: {
          title: 'Introduction',
          content: 'Strict.Dev is committed to protecting your privacy. This policy explains how we collect, use, and protect your personal data in accordance with GDPR (General Data Protection Regulation).'
        },
        dataController: {
          title: 'Data Controller',
          content: 'Strict.Dev is the data controller for your personal data. For privacy-related questions, contact us at info@strict-dev.com.'
        },
        dataCollected: {
          title: 'Data Collected',
          items: [
            'Name and email provided through the contact form',
            'Browsing data through Google Analytics (anonymous)',
            'Cookie preferences and website theme',
            'Technical information (browser, device, IP) for security'
          ]
        },
        dataUsage: {
          title: 'How We Use Your Data',
          items: [
            'Respond to your messages through the contact form',
            'Improve user experience on the website',
            'Traffic and behavior analysis (Google Analytics 4)',
            'Security and fraud prevention'
          ]
        },
        legalBasis: {
          title: 'Legal Basis',
          content: 'We process your data based on consent (cookies and analytics), legitimate interest (security), and contract execution (contact responses).'
        },
        dataSharing: {
          title: 'Data Sharing',
          items: [
            'Google Analytics - anonymous traffic analysis',
            'Web3Forms - contact form processing',
            'Cloudflare Pages - hosting and CDN',
            'We do not sell your data to third parties'
          ]
        },
        dataRetention: {
          title: 'Data Retention',
          content: 'Contact data is kept for 2 years. Analytics data is retained for 14 months (Google Analytics). You can request deletion at any time.'
        },
        yourRights: {
          title: 'Your Rights (GDPR)',
          items: [
            'Access your personal data',
            'Rectify incorrect data',
            'Delete your data ("right to be forgotten")',
            'Data portability',
            'Object to processing',
            'Withdraw consent at any time'
          ]
        },
        cookies: {
          title: 'Cookies',
          content: 'We use necessary cookies (site functionality), analytics (Google Analytics), and preference cookies (theme/language). You can manage your preferences in the cookie banner.'
        },
        security: {
          title: 'Security',
          content: 'We use HTTPS, Cloudflare CDN, and follow security best practices to protect your data.'
        },
        changes: {
          title: 'Changes to This Policy',
          content: 'We reserve the right to update this policy. Significant changes will be communicated through the website.'
        },
        contact: {
          title: 'Contact',
          content: 'To exercise your rights or privacy questions, contact info@strict-dev.com.'
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
                <Shield className="w-5 h-5 text-primary" />
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
          {/* Intro */}
          <Section icon={Shield} title={t.sections.intro.title}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.sections.intro.content}
            </p>
          </Section>

          {/* Data Controller */}
          <Section icon={UserCheck} title={t.sections.dataController.title}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.sections.dataController.content}
            </p>
          </Section>

          {/* Data Collected */}
          <Section icon={Database} title={t.sections.dataCollected.title}>
            <ul className="space-y-2">
              {t.sections.dataCollected.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Data Usage */}
          <Section icon={Eye} title={t.sections.dataUsage.title}>
            <ul className="space-y-2">
              {t.sections.dataUsage.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Legal Basis */}
          <Section icon={Shield} title={t.sections.legalBasis.title}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.sections.legalBasis.content}
            </p>
          </Section>

          {/* Data Sharing */}
          <Section icon={Database} title={t.sections.dataSharing.title}>
            <ul className="space-y-2">
              {t.sections.dataSharing.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Data Retention */}
          <Section icon={Database} title={t.sections.dataRetention.title}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.sections.dataRetention.content}
            </p>
          </Section>

          {/* Your Rights */}
          <Section icon={UserCheck} title={t.sections.yourRights.title}>
            <ul className="space-y-2">
              {t.sections.yourRights.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Cookies */}
          <Section icon={Lock} title={t.sections.cookies.title}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.sections.cookies.content}
            </p>
          </Section>

          {/* Security */}
          <Section icon={Lock} title={t.sections.security.title}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.sections.security.content}
            </p>
          </Section>

          {/* Changes */}
          <Section icon={Shield} title={t.sections.changes.title}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.sections.changes.content}
            </p>
          </Section>

          {/* Contact */}
          <Section icon={Mail} title={t.sections.contact.title}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.sections.contact.content}
            </p>
          </Section>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 bg-muted/50 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {language === 'pt' 
                ? 'Em conformidade com o RGPD (UE) 2016/679'
                : 'In compliance with GDPR (EU) 2016/679'}
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
