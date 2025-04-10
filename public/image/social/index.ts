import type { SocialProvider, SocialImageConfig } from '../config';

// Instead of importing images directly, use URLs
// This ensures they work properly in both dev and production
const FacebookIcon = '/image/social/facebook.png';
const GoogleIcon = '/image/social/google.png';
const AppleIcon = '/image/social/apple.png';

export const socialImages: Record<SocialProvider, SocialImageConfig> = {
  facebook: {
    src: FacebookIcon,
    alt: 'Continue with Facebook',
    width: 24,
    height: 24,
    category: 'social',
    provider: 'facebook',
  },
  google: {
    src: GoogleIcon,
    alt: 'Continue with Google',
    width: 24,
    height: 24,
    category: 'social',
    provider: 'google',
  },
  apple: {
    src: AppleIcon,
    alt: 'Continue with Apple',
    width: 24,
    height: 24,
    category: 'social',
    provider: 'apple',
  },
};

export default socialImages;