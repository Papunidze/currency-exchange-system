import type { BannerImageConfig } from '../config';

const kiosky = '/image/banner/kiosky.jpg';
const placeholder = "/image/banner/placeholder.svg"
export type BannerKey = 'kiosky' | "placeholder"

export const bannerImages: Record<BannerKey, BannerImageConfig> = {
  kiosky: {
    src: kiosky,
    alt: 'Hero Banner',
    width: 1920,
    height: 600,
    category: 'banner',
    position: 'center',
  },
  placeholder: {
    src: placeholder,
    alt: 'Hero Banner',
    width: 1920,
    height: 600,
    category: 'banner',
    position: 'center',
  },
}; 