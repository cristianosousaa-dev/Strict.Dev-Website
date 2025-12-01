/**
 * Analytics Utilities
 * Ready-to-use functions for tracking user interactions
 * 
 * To enable:
 * 1. Uncomment Google Analytics code in /index.html
 * 2. Replace 'GA_MEASUREMENT_ID' with your actual ID
 * 3. These functions will work automatically
 */

// Type definitions for Google Analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Check if analytics is available
 */
export const isAnalyticsAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Track page view
 */
export const trackPageView = (url: string, title?: string) => {
  if (!isAnalyticsAvailable()) return;

  window.gtag!('event', 'page_view', {
    page_path: url,
    page_title: title || document.title,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Page View:', url, title);
  }
};

/**
 * Track custom event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: any;
  }
) => {
  if (!isAnalyticsAvailable()) return;

  window.gtag!('event', eventName, {
    event_category: eventParams?.category,
    event_label: eventParams?.label,
    value: eventParams?.value,
    ...eventParams,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Event:', eventName, eventParams);
  }
};

/**
 * Track CTA clicks
 */
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent('cta_click', {
    category: 'CTA',
    label: ctaName,
    location: location,
  });
};

/**
 * Track form submission
 */
export const trackFormSubmit = (formName: string, success: boolean = true) => {
  trackEvent('form_submit', {
    category: 'Form',
    label: formName,
    success: success,
  });
};

/**
 * Track language change
 */
export const trackLanguageChange = (fromLang: string, toLang: string) => {
  trackEvent('language_change', {
    category: 'User Preference',
    from_language: fromLang,
    to_language: toLang,
  });
};

/**
 * Track theme change
 */
export const trackThemeChange = (theme: string, mode: 'light' | 'dark') => {
  trackEvent('theme_change', {
    category: 'User Preference',
    theme: theme,
    mode: mode,
  });
};

/**
 * Track WhatsApp button click
 */
export const trackWhatsAppClick = (source: string) => {
  trackEvent('whatsapp_click', {
    category: 'Contact',
    label: 'WhatsApp',
    source: source,
  });
};

/**
 * Track scroll depth (25%, 50%, 75%, 100%)
 */
let scrollTracked = {
  '25': false,
  '50': false,
  '75': false,
  '100': false,
};

export const trackScrollDepth = () => {
  if (typeof window === 'undefined') return;

  const scrollPercentage = Math.round(
    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
  );

  const milestones = [25, 50, 75, 100];
  
  for (const milestone of milestones) {
    if (scrollPercentage >= milestone && !scrollTracked[milestone as keyof typeof scrollTracked]) {
      scrollTracked[milestone as keyof typeof scrollTracked] = true;
      
      trackEvent('scroll_depth', {
        category: 'Engagement',
        label: `${milestone}%`,
        value: milestone,
      });
    }
  }
};

/**
 * Track time on page
 */
let pageLoadTime = 0;

export const startTimeTracking = () => {
  pageLoadTime = Date.now();
};

export const trackTimeOnPage = () => {
  if (pageLoadTime === 0) return;

  const timeSpent = Math.round((Date.now() - pageLoadTime) / 1000); // seconds

  trackEvent('time_on_page', {
    category: 'Engagement',
    value: timeSpent,
    time_spent: timeSpent,
  });
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (url: string, linkText?: string) => {
  trackEvent('external_link_click', {
    category: 'Outbound',
    label: linkText || url,
    url: url,
  });
};

/**
 * Track file downloads
 */
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('file_download', {
    category: 'Download',
    label: fileName,
    file_type: fileType,
  });
};

/**
 * Track video plays (if you add videos)
 */
export const trackVideoPlay = (videoName: string, duration?: number) => {
  trackEvent('video_play', {
    category: 'Video',
    label: videoName,
    duration: duration,
  });
};

/**
 * Track search (if you add search)
 */
export const trackSearch = (searchTerm: string, resultsCount?: number) => {
  trackEvent('search', {
    category: 'Search',
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

/**
 * Track errors
 */
export const trackError = (error: Error, errorInfo?: string) => {
  trackEvent('error', {
    category: 'Error',
    label: error.message,
    error_stack: error.stack,
    error_info: errorInfo,
  });
};

/**
 * Track social share
 */
export const trackSocialShare = (platform: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp', url: string) => {
  trackEvent('social_share', {
    category: 'Social',
    label: platform,
    url: url,
  });
};

/**
 * Track exit intent
 */
export const trackExitIntent = (action: 'shown' | 'dismissed' | 'converted') => {
  trackEvent('exit_intent', {
    category: 'Engagement',
    action: action,
  });
};

/**
 * Track cookie consent
 */
export const trackCookieConsent = (accepted: boolean) => {
  trackEvent('cookie_consent', {
    category: 'Privacy',
    accepted: accepted,
  });
};

/**
 * Track portfolio item view
 */
export const trackPortfolioView = (projectName: string) => {
  trackEvent('portfolio_view', {
    category: 'Portfolio',
    label: projectName,
  });
};

/**
 * Track service interest
 */
export const trackServiceInterest = (serviceName: string) => {
  trackEvent('service_interest', {
    category: 'Services',
    label: serviceName,
  });
};

/**
 * Initialize scroll tracking
 * Call this once on app load
 */
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;

  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        trackScrollDepth();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Track time on page when user leaves
  window.addEventListener('beforeunload', () => {
    trackTimeOnPage();
  });

  // Start time tracking
  startTimeTracking();
};

/**
 * Example usage:
 * 
 * import { trackCTAClick, trackFormSubmit, initScrollTracking } from './utils/analytics';
 * 
 * // In App.tsx
 * useEffect(() => {
 *   initScrollTracking();
 * }, []);
 * 
 * // In a CTA button
 * <button onClick={() => {
 *   trackCTAClick('Get Started', 'Hero Section');
 *   // ... rest of logic
 * }}>
 * 
 * // In a form
 * const onSubmit = (data) => {
 *   try {
 *     // ... submit logic
 *     trackFormSubmit('Contact Form', true);
 *   } catch (error) {
 *     trackFormSubmit('Contact Form', false);
 *     trackError(error);
 *   }
 * };
 */

export default {
  isAnalyticsAvailable,
  trackPageView,
  trackEvent,
  trackCTAClick,
  trackFormSubmit,
  trackLanguageChange,
  trackThemeChange,
  trackWhatsAppClick,
  trackScrollDepth,
  trackTimeOnPage,
  trackExternalLink,
  trackDownload,
  trackVideoPlay,
  trackSearch,
  trackError,
  trackSocialShare,
  trackExitIntent,
  trackCookieConsent,
  trackPortfolioView,
  trackServiceInterest,
  initScrollTracking,
};
