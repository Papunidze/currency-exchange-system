export interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'monochrome' | 'light';
  layout?: 'horizontal' | 'vertical';
  text?: string;
  showText?: boolean;
  className?: string;
  direction?: 'row' | 'column';
}
