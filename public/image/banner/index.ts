import type { BannerImageConfig } from '../config';

// Using direct paths to ensure compatibility with production builds
const HeroBanner = '/image/banner/hero.png';
const WelcomeBanner = '/image/banner/welcome.png';
const AuthBanner = '/image/banner/auth.png';

export type BannerKey = 'hero' | 'welcome' | 'auth';

export const bannerImages: Record<BannerKey, BannerImageConfig> = {
  hero: {
    src: HeroBanner,
    alt: 'Hero Banner',
    width: 1920,
    height: 600,
    category: 'banner',
    position: 'center',
  },
  welcome: {
    src: WelcomeBanner,
    alt: 'Welcome Banner',
    width: 1920,
    height: 400,
    category: 'banner',
    position: 'center',
  },
  auth: {
    src: AuthBanner,
    alt: 'Authentication Banner',
    width: 1920,
    height: 1080,
    category: 'banner',
    position: 'center',
  },
}; 