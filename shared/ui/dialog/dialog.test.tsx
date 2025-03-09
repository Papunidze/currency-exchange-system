import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from './dialog';

// Mock createPortal
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

describe('Dialog Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(
      <Dialog {...defaultProps}>
        <div>Dialog content</div>
      </Dialog>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Dialog content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Dialog {...defaultProps} isOpen={false}>
        <div>Dialog content</div>
      </Dialog>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders title and description when provided', () => {
    render(
      <Dialog
        {...defaultProps}
        title="Test Title"
        description="Test Description"
      >
        <div>Dialog content</div>
      </Dialog>,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('shows close button by default', () => {
    render(
      <Dialog {...defaultProps}>
        <div>Dialog content</div>
      </Dialog>,
    );

    expect(screen.getByLabelText('Close dialog')).toBeInTheDocument();
  });

  it('hides close button when showClose is false', () => {
    render(
      <Dialog {...defaultProps} showClose={false}>
        <div>Dialog content</div>
      </Dialog>,
    );

    expect(screen.queryByLabelText('Close dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    render(
      <Dialog {...defaultProps}>
        <div>Dialog content</div>
      </Dialog>,
    );

    await userEvent.click(screen.getByLabelText('Close dialog'));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked and closeOnBackdrop is true', () => {
    render(
      <Dialog {...defaultProps} closeOnBackdrop>
        <div>Dialog content</div>
      </Dialog>,
    );

    fireEvent.click(screen.getByRole('dialog').parentElement!);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when backdrop is clicked and closeOnBackdrop is false', () => {
    render(
      <Dialog {...defaultProps} closeOnBackdrop={false}>
        <div>Dialog content</div>
      </Dialog>,
    );

    fireEvent.click(screen.getByRole('dialog').parentElement!);
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed and closeOnEscape is true', () => {
    render(
      <Dialog {...defaultProps} closeOnEscape>
        <div>Dialog content</div>
      </Dialog>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when Escape key is pressed and closeOnEscape is false', () => {
    render(
      <Dialog {...defaultProps} closeOnEscape={false}>
        <div>Dialog content</div>
      </Dialog>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('applies size class correctly', () => {
    const { rerender } = render(
      <Dialog {...defaultProps} size="sm">
        <div>Dialog content</div>
      </Dialog>,
    );

    expect(screen.getByRole('dialog')).toHaveClass('sm');

    rerender(
      <Dialog {...defaultProps} size="md">
        <div>Dialog content</div>
      </Dialog>,
    );

    expect(screen.getByRole('dialog')).toHaveClass('md');

    rerender(
      <Dialog {...defaultProps} size="lg">
        <div>Dialog content</div>
      </Dialog>,
    );

    expect(screen.getByRole('dialog')).toHaveClass('lg');
  });

  it('applies position class correctly', () => {
    const { rerender } = render(
      <Dialog {...defaultProps} position="center">
        <div>Dialog content</div>
      </Dialog>,
    );

    expect(screen.getByRole('dialog')).toHaveClass('center');

    rerender(
      <Dialog {...defaultProps} position="top">
        <div>Dialog content</div>
      </Dialog>,
    );

    expect(screen.getByRole('dialog')).toHaveClass('top');
  });

  it('applies custom className and contentClassName', () => {
    render(
      <Dialog
        {...defaultProps}
        className="custom-dialog"
        contentClassName="custom-content"
      >
        <div>Dialog content</div>
      </Dialog>,
    );

    expect(screen.getByRole('dialog')).toHaveClass('custom-dialog');
    expect(screen.getByRole('dialog').querySelector('.content')).toHaveClass(
      'custom-content',
    );
  });

  it('sets correct ARIA attributes', () => {
    render(
      <Dialog
        {...defaultProps}
        title="Test Title"
        description="Test Description"
      >
        <div>Dialog content</div>
      </Dialog>,
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'dialog-title');
    expect(dialog).toHaveAttribute('aria-describedby', 'dialog-description');
  });

  it('prevents event propagation when clicking content', () => {
    const { container } = render(
      <Dialog {...defaultProps}>
        <div>Dialog content</div>
      </Dialog>,
    );

    const content = container.querySelector('.content');
    const mockStopPropagation = jest.fn();

    fireEvent.click(content!, {
      stopPropagation: mockStopPropagation,
    });

    expect(mockStopPropagation).toHaveBeenCalled();
  });
});
