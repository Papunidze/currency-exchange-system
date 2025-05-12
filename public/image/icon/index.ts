import type { IconType, IconImageConfig } from '../config';

const CheckIcon = '/image/icon/check.png';
const CloseIcon = '/image/icon/close.png';


export const iconImages: Record<IconType, IconImageConfig> = {
    check:{
        src: CheckIcon,
        alt: 'Check',
        width: 24,
        height: 24,
        category: 'icon',
        type: 'check',
    },
    close:{
        src: CloseIcon,
        alt: 'Close',
        width: 24,
        height: 24,
        category: 'icon',
        type: 'close',
    },

};

export default iconImages;