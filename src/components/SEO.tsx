import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  schema?: object;
}

export default function SEO({
  title,
  description,
  keywords,
  ogImage = 'https://strict-dev.com/og-image.png',
  canonicalUrl = 'https://strict-dev.com',
  noindex = false,
  schema
}: SEOProps) {
  const { language } = useLanguage();

  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }

    // Update meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Update robots meta tag
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    const robotsContent = noindex 
      ? 'noindex, nofollow' 
      : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
    robotsMeta.setAttribute('content', robotsContent);

    // Update OG tags
    const updateMetaTag = (property: string, content: string, isProperty = true) => {
      const attribute = isProperty ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    if (title) {
      updateMetaTag('og:title', title);
      updateMetaTag('twitter:title', false, false);
      updateMetaTag('title', title, false);
    }

    if (description) {
      updateMetaTag('og:description', description);
      updateMetaTag('twitter:description', description, false);
    }

    updateMetaTag('og:image', ogImage);
    updateMetaTag('twitter:image', ogImage, false);
    updateMetaTag('og:url', canonicalUrl);
    updateMetaTag('twitter:url', canonicalUrl, false);
    updateMetaTag('og:type', 'website');
    updateMetaTag('twitter:card', 'summary_large_image', false);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Update language and hreflang
    const langCode = language === 'pt' ? 'pt-PT' : 'en';
    document.documentElement.setAttribute('lang', langCode);
    
    // Update hreflang tags
    const updateHreflang = (hreflang: string, href: string) => {
      let link = document.querySelector(`link[hreflang="${hreflang}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hreflang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    updateHreflang('en', 'https://strict-dev.com/en');
    updateHreflang('pt', 'https://strict-dev.com/pt');
    updateHreflang('x-default', 'https://strict-dev.com');

    // Add custom schema if provided
    if (schema) {
      const schemaId = 'custom-schema-json-ld';
      let schemaScript = document.getElementById(schemaId);
      
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = schemaId;
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      
      schemaScript.textContent = JSON.stringify(schema);
    }

    // Update Open Graph locale
    updateMetaTag('og:locale', language === 'pt' ? 'pt_PT' : 'en_US');
    updateMetaTag('og:locale:alternate', language === 'pt' ? 'en_US' : 'pt_PT');

  }, [title, description, keywords, ogImage, canonicalUrl, language, noindex, schema]);

  return null;
}
