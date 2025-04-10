import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Badge } from './badge';
import styles from './badge.module.scss';

// Mock the CSS module
jest.mock('./badge.module.scss', () => ({
  badge: 'badge',
  badgeContainer: 'badgeContainer',
  badgeWrapper: 'badgeWrapper',
  small: 'small',
  medium: 'medium',
  large: 'large',
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
  dot: 'dot',
  rounded: 'rounded',
  standalone: 'standalone',
  'top-right': 'top-right',
  'top-left': 'top-left',
  'bottom-right': 'bottom-right',
  'bottom-left': 'bottom-left',
}));

describe('Badge Component', () => {
  test('renders with default props', () => {
    render(
      <Badge badgeContent={5}>
        <div data-testid="child">Content</div>
      </Badge>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('does not render badge when badgeContent is 0 and showZero is false', () => {
    render(
      <Badge badgeContent={0}>
        <div data-testid="child">Content</div>
      </Badge>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  test('renders badge when badgeContent is 0 and showZero is true', () => {
    render(
      <Badge badgeContent={0} showZero>
        <div data-testid="child">Content</div>
      </Badge>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('renders max+ when badgeContent exceeds max', () => {
    render(
      <Badge badgeContent={100} max={99}>
        <div>Content</div>
      </Badge>,
    );

    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  test('renders dot badge when dot is true', () => {
    render(
      <Badge dot>
        <div>Content</div>
      </Badge>,
    );

    const badge = document.querySelector(`.${styles.dot}`);
    expect(badge).toBeInTheDocument();
  });

  test.each(['small', 'medium', 'large'])('renders with size %s', (size) => {
    render(
      <Badge badgeContent={5} size={size as any}>
        <div>Content</div>
      </Badge>,
    );

    const badge = screen.getByText('5');
    expect(badge).toHaveClass(styles[size]);
  });

  test.each(['primary', 'secondary', 'success', 'warning', 'danger', 'info'])(
    'renders with variant %s',
    (variant) => {
      render(
        <Badge badgeContent={5} variant={variant as any}>
          <div>Content</div>
        </Badge>,
      );

      const badge = screen.getByText('5');
      expect(badge).toHaveClass(styles[variant]);
    },
  );

  test.each(['top-right', 'top-left', 'bottom-right', 'bottom-left'])(
    'renders with position %s',
    (position) => {
      render(
        <Badge badgeContent={5} position={position as any}>
          <div>Content</div>
        </Badge>,
      );

      const wrapper = document.querySelector(`.${styles.badgeWrapper}`);
      expect(wrapper).toHaveClass(styles[position]);
    },
  );

  test('renders standalone badge', () => {
    render(<Badge badgeContent={5} standalone />);

    const badge = screen.getByText('5');
    expect(badge).toHaveClass(styles.standalone);
    expect(
      document.querySelector(`.${styles.badgeContainer}`),
    ).not.toBeInTheDocument();
  });

  test('renders rounded badge', () => {
    render(
      <Badge badgeContent={5} rounded>
        <div>Content</div>
      </Badge>,
    );

    const badge = screen.getByText('5');
    expect(badge).toHaveClass(styles.rounded);
  });

  test('forwards className to the badge element', () => {
    render(
      <Badge badgeContent={5} className="custom-class">
        <div>Content</div>
      </Badge>,
    );

    const badge = screen.getByText('5');
    expect(badge).toHaveClass('custom-class');
  });
});
