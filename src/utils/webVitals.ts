/**
 * Web Vitals Tracking
 * Tracks Core Web Vitals (LCP, FID, CLS) and other metrics
 * 
 * To use with Google Analytics:
 * 1. Uncomment the analytics code in index.html
 * 2. Replace 'GA_MEASUREMENT_ID' with your actual ID
 * 3. The metrics will be sent automatically
 */

import type { Metric } from 'web-vitals';

// Thresholds for Core Web Vitals (Google's recommended values)
export const VITALS_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 },   // First Input Delay
  CLS: { good: 0.1, needsImprovement: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
  INP: { good: 200, needsImprovement: 500 },   // Interaction to Next Paint
};

// Color coding for console logs
const getMetricColor = (metric: Metric): string => {
  const threshold = VITALS_THRESHOLDS[metric.name as keyof typeof VITALS_THRESHOLDS];
  if (!threshold) return 'color: #888';
  
  if (metric.value <= threshold.good) return 'color: #0CCE6B'; // Good (green)
  if (metric.value <= threshold.needsImprovement) return 'color: #FFA400'; // Needs improvement (orange)
  return 'color: #FF4E42'; // Poor (red)
};

// Get rating based on thresholds
const getRating = (metric: Metric): 'good' | 'needs-improvement' | 'poor' => {
  const threshold = VITALS_THRESHOLDS[metric.name as keyof typeof VITALS_THRESHOLDS];
  if (!threshold) return 'good';
  
  if (metric.value <= threshold.good) return 'good';
  if (metric.value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
};

// Log to console (development only)
const logMetric = (metric: Metric) => {
  if (process.env.NODE_ENV === 'development') {
    const rating = getRating(metric);
    console.log(
      `%c${metric.name}: ${Math.round(metric.value)}ms (${rating})`,
      getMetricColor(metric)
    );
  }
};

// Send to analytics
const sendToAnalytics = (metric: Metric) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = (window as any).gtag;
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Custom analytics endpoint (if you have one)
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     name: metric.name,
  //     value: metric.value,
  //     rating: getRating(metric),
  //     id: metric.id,
  //     navigationType: metric.navigationType,
  //   }),
  //   headers: { 'Content-Type': 'application/json' },
  //   keepalive: true,
  // });
};

// Main handler for all metrics
export const reportWebVitals = (metric: Metric) => {
  logMetric(metric);
  sendToAnalytics(metric);
};

// Initialize Web Vitals tracking
export const initWebVitals = async () => {
  if (typeof window === 'undefined') return;

  try {
    const { onCLS, onFCP, onFID, onLCP, onTTFB, onINP } = await import('web-vitals');

    onCLS(reportWebVitals);
    onFCP(reportWebVitals);
    onFID(reportWebVitals);
    onLCP(reportWebVitals);
    onTTFB(reportWebVitals);
    onINP(reportWebVitals);
  } catch (error) {
    console.warn('Web Vitals tracking failed to load:', error);
  }
};

// Get performance metrics summary
export const getPerformanceSummary = () => {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  if (!navigation) return null;

  return {
    // DNS lookup time
    dns: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
    
    // TCP connection time
    tcp: Math.round(navigation.connectEnd - navigation.connectStart),
    
    // Request time
    request: Math.round(navigation.responseStart - navigation.requestStart),
    
    // Response time
    response: Math.round(navigation.responseEnd - navigation.responseStart),
    
    // DOM processing
    domProcessing: Math.round(navigation.domComplete - navigation.domInteractive),
    
    // Load complete
    loadComplete: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
    
    // Total time to DOM ready
    domReady: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
    
    // Total page load time
    loadTime: Math.round(navigation.loadEventEnd - navigation.fetchStart),
  };
};

// Log performance summary (development only)
export const logPerformanceSummary = () => {
  if (process.env.NODE_ENV !== 'development') return;

  const summary = getPerformanceSummary();
  if (!summary) return;

  console.group('%c📊 Performance Summary', 'color: #3b82f6; font-weight: bold');
  console.log(`DNS Lookup: ${summary.dns}ms`);
  console.log(`TCP Connection: ${summary.tcp}ms`);
  console.log(`Request: ${summary.request}ms`);
  console.log(`Response: ${summary.response}ms`);
  console.log(`DOM Processing: ${summary.domProcessing}ms`);
  console.log(`Load Complete: ${summary.loadComplete}ms`);
  console.log(`%cDOM Ready: ${summary.domReady}ms`, 'font-weight: bold');
  console.log(`%cTotal Load Time: ${summary.loadTime}ms`, 'font-weight: bold');
  console.groupEnd();
};

// Detect slow network
export const isSlowNetwork = (): boolean => {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return false;
  }

  const connection = (navigator as any).connection;
  
  // Check for slow connection types
  const slowTypes = ['slow-2g', '2g', '3g'];
  if (slowTypes.includes(connection.effectiveType)) {
    return true;
  }

  // Check for save-data preference
  if (connection.saveData) {
    return true;
  }

  return false;
};

// Detect low-end device
export const isLowEndDevice = (): boolean => {
  if (typeof navigator === 'undefined') return false;

  // Check number of CPU cores
  const cores = (navigator as any).hardwareConcurrency || 4;
  if (cores < 4) return true;

  // Check available memory (if available)
  const memory = (navigator as any).deviceMemory;
  if (memory && memory < 4) return true;

  return false;
};
