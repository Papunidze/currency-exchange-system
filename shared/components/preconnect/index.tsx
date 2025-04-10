import React from 'react';

export const Preconnect = () => {
  return (
    <>
      {/* Font Preconnect Resource Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        rel="preconnect"
        href="https://fonts.cdnfonts.com"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="https://fonts.cdnfonts.com" />
      <link rel="dns-prefetch" href="https://cdnfonts.com" />
    </>
  );
};
