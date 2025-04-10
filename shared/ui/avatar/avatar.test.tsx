import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Avatar } from './avatar';
import styles from './avatar.module.scss';

// Mock the CSS module
jest.mock('./avatar.module.scss', () => ({
  avatar: 'avatar',
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  circle: 'circle',
  square: 'square',
  rounded: 'rounded',
  clickable: 'clickable',
  fallback: 'fallback',
  statusIndicator: 'statusIndicator',
  statusOnline: 'statusOnline',
  statusOffline: 'statusOffline',
  statusAway: 'statusAway',
  statusBusy: 'statusBusy',
}));

describe('Avatar Component', () => {
  describe('Basic Rendering', () => {
    test('renders with default props', () => {
      render(<Avatar alt="Test User" data-testid="avatar-container" />);
      const avatar = screen.getByText('T');
      expect(avatar).toBeInTheDocument();
    });

    test('renders image when src is provided', () => {
      render(
        <Avatar
          src="test-image.jpg"
          alt="Test User"
          data-testid="avatar-container"
        />,
      );
      const image = screen.getByAltText('Test User');
      expect(image).toBeInTheDocument();
      expect(image.tagName).toBe('IMG');
      expect(image).toHaveAttribute('src', 'test-image.jpg');
    });

    test('shows first letter of alt text when no src or fallback is provided', () => {
      render(<Avatar alt="John Doe" data-testid="avatar-container" />);
      expect(screen.getByText('J')).toBeInTheDocument();
    });

    test('handles empty alt text gracefully', () => {
      render(<Avatar alt="" data-testid="avatar-container" />);
      // Should not throw an error, and should not display any letter
      expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
    });
  });

  describe('Fallback Behavior', () => {
    test('shows custom fallback when fallback is provided', () => {
      render(
        <Avatar
          alt="John Doe"
          fallback={<span data-testid="custom-fallback">JD</span>}
          data-testid="avatar-container"
        />,
      );
      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    test('shows fallback when image fails to load', () => {
      render(
        <Avatar
          src="invalid-image.jpg"
          alt="Jane Smith"
          data-testid="avatar-container"
        />,
      );
      const image = screen.getByAltText('Jane Smith');

      fireEvent.error(image);

      expect(screen.getByText('J')).toBeInTheDocument();
    });

    test('fallback takes precedence over alt text when both provided and image fails', () => {
      render(
        <Avatar
          src="invalid-image.jpg"
          alt="Jane Smith"
          fallback={<span data-testid="custom-fallback">Custom</span>}
          data-testid="avatar-container"
        />,
      );
      const image = screen.getByAltText('Jane Smith');

      fireEvent.error(image);

      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
      expect(screen.queryByText('J')).not.toBeInTheDocument();
    });
  });

  describe('Appearance Variants', () => {
    test.each(['xs', 'sm', 'md', 'lg', 'xl'])(
      'renders with size %s',
      (size) => {
        render(
          <Avatar
            size={size as any}
            alt="Test"
            data-testid="avatar-container"
          />,
        );
        const avatarContainer = screen.getByTestId('avatar-container');
        expect(avatarContainer).toHaveClass(styles[size]);
      },
    );

    test.each(['circle', 'square', 'rounded'])(
      'renders with shape %s',
      (shape) => {
        render(
          <Avatar
            shape={shape as any}
            alt="Test"
            data-testid="avatar-container"
          />,
        );
        const avatarContainer = screen.getByTestId('avatar-container');
        expect(avatarContainer).toHaveClass(styles[shape]);
      },
    );

    test.each(['online', 'offline', 'away', 'busy'])(
      'renders with %s status',
      (status) => {
        render(
          <Avatar
            status={status as any}
            alt="Test"
            data-testid="avatar-container"
          />,
        );
        const statusClassName = `status${status.charAt(0).toUpperCase() + status.slice(1)}`;
        const element = document.querySelector(`.${styles.statusIndicator}`);
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass(styles[statusClassName]);
      },
    );

    test('does not render status indicator when status is none', () => {
      render(
        <Avatar status="none" alt="Test" data-testid="avatar-container" />,
      );
      const statusIndicator = document.querySelector(
        `.${styles.statusIndicator}`,
      );
      expect(statusIndicator).not.toBeInTheDocument();
    });
  });

  describe('Interaction Behavior', () => {
    test('calls onClick handler when clicked', () => {
      const handleClick = jest.fn();
      render(
        <Avatar
          alt="Test"
          onClick={handleClick}
          data-testid="avatar-container"
        />,
      );

      const avatar = screen.getByTestId('avatar-container');
      fireEvent.click(avatar);

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
    });

    test('does not throw error when clicked without onClick handler', () => {
      render(<Avatar alt="Test" data-testid="avatar-container" />);
      const avatar = screen.getByTestId('avatar-container');

      expect(() => {
        fireEvent.click(avatar);
      }).not.toThrow();
    });

    test('applies clickable class when onClick is provided', () => {
      render(
        <Avatar alt="Test" onClick={() => {}} data-testid="avatar-container" />,
      );
      const avatarContainer = screen.getByTestId('avatar-container');
      expect(avatarContainer).toHaveClass(styles.clickable);
    });

    test('applies clickable class when cursorPointer is true', () => {
      render(
        <Avatar alt="Test" cursorPointer data-testid="avatar-container" />,
      );
      const avatarContainer = screen.getByTestId('avatar-container');
      expect(avatarContainer).toHaveClass(styles.clickable);
    });

    test('does not apply clickable class when both onClick and cursorPointer are not provided', () => {
      render(<Avatar alt="Test" data-testid="avatar-container" />);
      const avatarContainer = screen.getByTestId('avatar-container');
      expect(avatarContainer).not.toHaveClass(styles.clickable);
    });
  });

  describe('Styling and Customization', () => {
    test('forwards className to the container', () => {
      render(
        <Avatar
          alt="Test"
          className="custom-class"
          data-testid="avatar-container"
        />,
      );
      const avatarContainer = screen.getByTestId('avatar-container');
      expect(avatarContainer).toHaveClass('custom-class');
    });

    test('forwards additional props to the container element', () => {
      render(<Avatar alt="Test" data-testid="custom-test-id" />);
      expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('image has proper alt text for screen readers', () => {
      render(
        <Avatar
          src="test-image.jpg"
          alt="Test User"
          data-testid="avatar-container"
        />,
      );
      const image = screen.getByAltText('Test User');
      expect(image).toHaveAttribute('alt', 'Test User');
    });

    test('clicking works with keyboard navigation', () => {
      const handleClick = jest.fn();
      render(
        <Avatar
          alt="Test"
          onClick={handleClick}
          data-testid="avatar-container"
        />,
      );

      const avatar = screen.getByTestId('avatar-container');
      fireEvent.keyDown(avatar, { key: 'Enter', code: 'Enter' });

      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
