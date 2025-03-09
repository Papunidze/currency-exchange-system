import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Backdrop from './backdrop';

describe('Backdrop Component', () => {
  const defaultProps = {
    isOpen: true,
  };

  beforeEach(() => {
    document.body.style.overflow = '';
  });

  it('renders when isOpen is true', () => {
    render(
      <Backdrop {...defaultProps}>
        <div>Backdrop content</div>
      </Backdrop>,
    );

    expect(screen.getByText('Backdrop content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Backdrop {...defaultProps} isOpen={false}>
        <div>Backdrop content</div>
      </Backdrop>,
    );

    expect(screen.queryByText('Backdrop content')).not.toBeInTheDocument();
  });

  it('applies blur class when blur prop is true', () => {
    const { container } = render(
      <Backdrop {...defaultProps} blur>
        <div>Backdrop content</div>
      </Backdrop>,
    );

    expect(container.firstChild).toHaveClass('blur');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Backdrop {...defaultProps} className="custom-backdrop">
        <div>Backdrop content</div>
      </Backdrop>,
    );

    expect(container.firstChild).toHaveClass('custom-backdrop');
  });

  it('applies custom opacity', () => {
    const { container } = render(
      <Backdrop {...defaultProps} opacity={75}>
        <div>Backdrop content</div>
      </Backdrop>,
    );

    expect(container.firstChild).toHaveStyle({
      '--backdrop-opacity': '0.75',
    });
  });

  it('applies custom z-index', () => {
    const { container } = render(
      <Backdrop {...defaultProps} zIndex={100}>
        <div>Backdrop content</div>
      </Backdrop>,
    );

    expect(container.firstChild).toHaveStyle({
      zIndex: 100,
    });
  });

  it('calls onClick when backdrop is clicked', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <Backdrop {...defaultProps} onClick={handleClick}>
        <div>Backdrop content</div>
      </Backdrop>,
    );

    fireEvent.click(container.firstChild!);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('prevents event propagation when content is clicked', () => {
    const handleClick = jest.fn();
    render(
      <Backdrop {...defaultProps} onClick={handleClick}>
        <div>Backdrop content</div>
      </Backdrop>,
    );

    const content = screen.getByText('Backdrop content');
    fireEvent.click(content);
    expect(handleClick).not.toHaveBeenCalled();
  });

  describe('scroll behavior', () => {
    it('disables body scroll when opened with disableScroll true', () => {
      render(
        <Backdrop {...defaultProps} disableScroll>
          <div>Backdrop content</div>
        </Backdrop>,
      );

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('does not disable body scroll when disableScroll is false', () => {
      render(
        <Backdrop {...defaultProps} disableScroll={false}>
          <div>Backdrop content</div>
        </Backdrop>,
      );

      expect(document.body.style.overflow).toBe('');
    });

    it('restores body scroll when closed', () => {
      const { rerender } = render(
        <Backdrop {...defaultProps} disableScroll>
          <div>Backdrop content</div>
        </Backdrop>,
      );

      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <Backdrop {...defaultProps} isOpen={false} disableScroll>
          <div>Backdrop content</div>
        </Backdrop>,
      );

      expect(document.body.style.overflow).toBe('');
    });

    it('restores body scroll on unmount', () => {
      const { unmount } = render(
        <Backdrop {...defaultProps} disableScroll>
          <div>Backdrop content</div>
        </Backdrop>,
      );

      expect(document.body.style.overflow).toBe('hidden');

      unmount();

      expect(document.body.style.overflow).toBe('');
    });
  });
});
