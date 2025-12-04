// 🔥 Google Analytics 4 - Event Tracking Utilities

/**
 * Type-safe Google Analytics event tracking
 */

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Track a custom event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: any;
  }
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
    console.log('📊 GA4 Event:', eventName, eventParams);
  }
};

/**
 * Track form submission
 */
export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submission', {
    event_category: 'Contact',
    event_label: `${formName} - Strict.Dev`,
    value: 1,
  });
};

/**
 * Track conversion
 */
export const trackConversion = (conversionType: string) => {
  trackEvent('conversion', {
    send_to: 'G-D6X8BXE242',
    event_category: 'Lead',
    event_label: conversionType,
  });
};

/**
 * Track WhatsApp click
 */
export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', {
    event_category: 'Contact',
    event_label: 'WhatsApp Button Click',
    value: 1,
  });
};

/**
 * Track CTA button click
 */
export const trackCTAClick = (buttonLabel: string, location: string) => {
  trackEvent('cta_click', {
    event_category: 'Engagement',
    event_label: buttonLabel,
    location: location,
  });
};

/**
 * Track service card click
 */
export const trackServiceClick = (serviceName: string) => {
  trackEvent('service_click', {
    event_category: 'Services',
    event_label: serviceName,
  });
};

/**
 * Track theme change
 */
export const trackThemeChange = (theme: string, mode: 'light' | 'dark') => {
  trackEvent('theme_change', {
    event_category: 'Customization',
    event_label: `${theme} - ${mode}`,
  });
};

/**
 * Track language change
 */
export const trackLanguageChange = (language: string) => {
  trackEvent('language_change', {
    event_category: 'Customization',
    event_label: language,
  });
};

/**
 * Track exit intent popup
 */
export const trackExitIntent = (action: 'shown' | 'dismissed' | 'converted') => {
  trackEvent('exit_intent', {
    event_category: 'Engagement',
    event_label: action,
  });
};

/**
 * Track newsletter signup
 */
export const trackNewsletterSignup = () => {
  trackEvent('newsletter_signup', {
    event_category: 'Lead',
    event_label: 'Newsletter Subscription',
    value: 1,
  });
};

/**
 * Track download
 */
export const trackDownload = (fileName: string) => {
  trackEvent('file_download', {
    event_category: 'Engagement',
    event_label: fileName,
  });
};

/**
 * Track video play
 */
export const trackVideoPlay = (videoName: string) => {
  trackEvent('video_play', {
    event_category: 'Engagement',
    event_label: videoName,
  });
};

/**
 * Track external link click
 */
export const trackExternalLink = (url: string) => {
  trackEvent('external_link_click', {
    event_category: 'Outbound',
    event_label: url,
  });
};

/**
 * Track social media click
 */
export const trackSocialClick = (platform: string) => {
  trackEvent('social_click', {
    event_category: 'Social',
    event_label: platform,
  });
};

/**
 * Track time on page
 */
export const trackTimeOnPage = (seconds: number) => {
  trackEvent('time_on_page', {
    event_category: 'Engagement',
    value: seconds,
  });
};

/**
 * Track error
 */
export const trackError = (errorMessage: string, errorLocation: string) => {
  trackEvent('error', {
    event_category: 'Error',
    event_label: errorMessage,
    location: errorLocation,
  });
};
