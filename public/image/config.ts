import type { StaticImageData } from 'next/image';

export type ImageCategory = 'social' | 'logo' | 'banner' | 'avatar' | 'icon';

export interface BaseImageConfig {
  src: StaticImageData;
  alt: string;
  width: number;
  height: number;
  category: ImageCategory;
}

export type SocialProvider = 'facebook' | 'google' | 'apple';
export interface SocialImageConfig extends BaseImageConfig {
  category: 'social';
  provider: SocialProvider;
}

export type LogoVariant = 'default' | 'light' | 'dark';
export interface LogoImageConfig extends BaseImageConfig {
  category: 'logo';
  variant: LogoVariant;
}

export type BannerPosition = 'top' | 'center' | 'bottom';
export interface BannerImageConfig extends BaseImageConfig {
  category: 'banner';
  position: BannerPosition;
}

export interface AvatarImageConfig extends BaseImageConfig {
  category: 'avatar';
  fallback?: string;
}

export type IconType = 'ui' | 'action' | 'navigation';
export interface IconImageConfig extends BaseImageConfig {
  category: 'icon';
  type: IconType;
}

export type ImageConfig =
  | SocialImageConfig
  | LogoImageConfig
  | BannerImageConfig
  | AvatarImageConfig
  | IconImageConfig;

export const isSocialImage = (config: ImageConfig): config is SocialImageConfig => 
  config.category === 'social';

export const isLogoImage = (config: ImageConfig): config is LogoImageConfig => 
  config.category === 'logo';

export const isBannerImage = (config: ImageConfig): config is BannerImageConfig => 
  config.category === 'banner';

export const isAvatarImage = (config: ImageConfig): config is AvatarImageConfig => 
  config.category === 'avatar';

export const isIconImage = (config: ImageConfig): config is IconImageConfig => 
  config.category === 'icon'; 