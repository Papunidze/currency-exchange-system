import type { BannerImageConfig } from '../config';

// Using direct paths to ensure compatibility with production builds
const kiosky = '/image/banner/kiosky.jpg';

export type BannerKey = 'kiosky'

export const bannerImages: Record<BannerKey, BannerImageConfig> = {
  kiosky: {
    src: kiosky,
    alt: 'Hero Banner',
    width: 1920,
    height: 600,
    category: 'banner',
    position: 'center',
  },

}; 