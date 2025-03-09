
import type { SocialProvider, SocialImageConfig } from '../config';
import FacebookIcon from '@app-image/social/facebook.png';
import GoogleIcon from '@app-image/social/google.png';
import AppleIcon from '@app-image/social/apple.png';

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