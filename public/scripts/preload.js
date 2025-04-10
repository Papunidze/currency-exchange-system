/**
 * Preload Script
 * This script helps preload critical resources to improve page load performance
 */

// Preload critical font resources
function preloadFontResources() {
  const fontDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://fonts.cdnfonts.com',
    'https://cdnfonts.com'
  ];

  // Preconnect to each domain
  fontDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    if (domain !== 'https://fonts.googleapis.com') {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });

  // DNS-prefetch for the same domains (fallback for browsers that don't support preconnect)
  fontDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
}

// Initialize preloading
preloadFontResources(); 