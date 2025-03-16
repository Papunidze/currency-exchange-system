import type { LogoVariant, LogoImageConfig } from '../config';
import PrimaryLogo from '@app-image/logo/primary.svg';

export const logoImages: Record<LogoVariant, LogoImageConfig> = {
  primary: {
    priority: true,
    src: PrimaryLogo,
    alt: 'Currency Exchange System',
    width: 60,
    height: 60,
    category: 'logo',
    variant: 'primary',
  },
};

export default logoImages; 