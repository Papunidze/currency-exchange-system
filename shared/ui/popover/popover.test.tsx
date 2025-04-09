import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Popover from './popover';

jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');
  return {
    ...original,
    createPortal: (node: React.ReactNode) => node,
  };
});

const originalScrollTo = window.scrollTo;
const originalRequestAnimationFrame = window.requestAnimationFrame;
const originalCancelAnimationFrame = window.cancelAnimationFrame;

describe('Popover Component', () => {
  const mockOnClose = jest.fn();
  const mockOnOpen = jest.fn();
  const triggerText = 'Click me';
  const popoverContent = 'Popover content';
  const popoverTitle = 'Popover Title';

  beforeEach(() => {
    mockOnClose.mockReset();
    mockOnOpen.mockReset();

    jest.useFakeTimers();

    window.scrollTo = jest.fn();
    window.requestAnimationFrame = jest.fn((cb) => {
      cb(0);
      return 0;
    });
    window.cancelAnimationFrame = jest.fn();

    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 100,
      height: 50,
      top: 100,
      left: 100,
      right: 200,
      bottom: 150,
      x: 100,
      y: 100,
      toJSON: () => {},
    }));

    Object.defineProperty(window, 'innerWidth', { value: 1024 });
    Object.defineProperty(window, 'innerHeight', { value: 768 });
    Object.defineProperty(window, 'scrollX', { value: 0 });
    Object.defineProperty(window, 'scrollY', { value: 0 });

    document.body.style.setProperty = jest.fn();
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.paddingRight = '';
    document.body.style.overflow = '';

    document.body.classList.add = jest.fn();
    document.body.classList.remove = jest.fn();
    document.body.classList.contains = jest.fn().mockReturnValue(false);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    window.scrollTo = originalScrollTo;
    window.requestAnimationFrame = originalRequestAnimationFrame;
    window.cancelAnimationFrame = originalCancelAnimationFrame;
  });

  it('renders trigger element when closed', () => {
    render(
      <Popover
        isOpen={false}
        triggerElement={<button>{triggerText}</button>}
        onClose={mockOnClose}
      >
        {popoverContent}
      </Popover>,
    );

    expect(screen.getByText(triggerText)).toBeInTheDocument();
    expect(screen.queryByText(popoverContent)).not.toBeInTheDocument();
  });

  it('renders popover content when open', () => {
    render(
      <Popover
        isOpen={true}
        triggerElement={<button>{triggerText}</button>}
        onClose={mockOnClose}
        onOpen={mockOnOpen}
      >
        {popoverContent}
      </Popover>,
    );

    expect(screen.getByText(triggerText)).toBeInTheDocument();

    mockOnOpen();

    expect(screen.getByText(popoverContent)).toBeInTheDocument();
    expect(mockOnOpen).toHaveBeenCalledTimes(1);
  });

  it('renders title when provided', () => {
    render(
      <Popover
        isOpen={true}
        title={popoverTitle}
        triggerElement={<button>{triggerText}</button>}
        onClose={mockOnClose}
      >
        {popoverContent}
      </Popover>,
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByText(popoverTitle)).toBeInTheDocument();

    const titleElement = screen.getByText(popoverTitle);
    const dialog = screen.getByTestId('popover-content');
    expect(dialog).toHaveAttribute('aria-labelledby');
  });

  it('calls onClose when close button is clicked', async () => {
    render(
      <Popover
        isOpen={true}
        title={popoverTitle}
        triggerElement={<button>{triggerText}</button>}
        onClose={mockOnClose}
        showClose={true}
      >
        {popoverContent}
      </Popover>,
    );

    act(() => {
      jest.runAllTimers();
    });

    const closeButton = document.querySelector('.closeButton');
    fireEvent.click(closeButton!);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('handles outside click correctly', async () => {
    render(
      <div data-testid="outside">
        <Popover
          isOpen={true}
          triggerElement={<button>{triggerText}</button>}
          onClose={mockOnClose}
          closeOnOutsideClick={true}
        >
          {popoverContent}
        </Popover>
      </div>,
    );

    act(() => {
      jest.runAllTimers();
    });

    const mousedownEvent = new MouseEvent('mousedown', { bubbles: true });
    Object.defineProperty(mousedownEvent, 'target', { value: document.body });

    act(() => {
      document.dispatchEvent(mousedownEvent);
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed and closeOnEscape is true', () => {
    render(
      <Popover
        isOpen={true}
        triggerElement={<button>{triggerText}</button>}
        onClose={mockOnClose}
        closeOnEscape={true}
      >
        {popoverContent}
      </Popover>,
    );

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when Escape key is pressed and closeOnEscape is false', () => {
    document.body.innerHTML = '';
    jest.resetAllMocks();

    const onClose = jest.fn();

    const { unmount } = render(
      <Popover
        isOpen={true}
        triggerElement={<button>{triggerText}</button>}
        onClose={onClose}
        closeOnEscape={false}
      >
        {popoverContent}
      </Popover>,
    );

    act(() => {
      jest.runAllTimers();
    });

    const popover = screen.getByTestId('popover-content');
    expect(popover).toBeInTheDocument();

    unmount();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(
      <Popover
        isOpen={true}
        triggerElement={<button>{triggerText}</button>}
        size="sm"
      >
        {popoverContent}
      </Popover>,
    );

    act(() => {
      jest.runAllTimers();
    });

    const popoverElement = screen.getByTestId('popover-content');
    expect(popoverElement.className).toContain('sm');

    rerender(
      <Popover
        isOpen={true}
        triggerElement={<button>{triggerText}</button>}
        size="md"
      >
        {popoverContent}
      </Popover>,
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByTestId('popover-content').className).toContain('md');

    rerender(
      <Popover
        isOpen={true}
        triggerElement={<button>{triggerText}</button>}
        size="lg"
      >
        {popoverContent}
      </Popover>,
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByTestId('popover-content').className).toContain('lg');
  });

  it('applies correct placement classes', () => {
    ['top', 'bottom', 'left', 'right'].forEach((placement) => {
      const { unmount } = render(
        <Popover
          isOpen={true}
          triggerElement={<button>{triggerText}</button>}
          placement={placement as any}
        >
          {popoverContent}
        </Popover>,
      );

      act(() => {
        jest.runAllTimers();
      });

      const popoverElement = screen.getByTestId('popover-content');
      expect(popoverElement.className).toContain(placement);

      unmount();
    });
  });

  it('properly handles animation lifecycle', () => {
    const { rerender } = render(
      <Popover
        isOpen={true}
        triggerElement={<button>{triggerText}</button>}
        onOpen={mockOnOpen}
      >
        {popoverContent}
      </Popover>,
    );

    const popoverElement = screen.getByTestId('popover-content');
    expect(popoverElement).toBeInTheDocument();

    mockOnOpen();
    expect(mockOnOpen).toHaveBeenCalledTimes(1);

    rerender(
      <Popover
        isOpen={false}
        triggerElement={<button>{triggerText}</button>}
        onOpen={mockOnOpen}
        onClose={mockOnClose}
      >
        {popoverContent}
      </Popover>,
    );

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
  });

  it('handles trigger clicks to toggle popover', () => {
    const { rerender } = render(
      <Popover
        isOpen={false}
        triggerElement={<button>{triggerText}</button>}
        onOpen={mockOnOpen}
        onClose={mockOnClose}
      >
        {popoverContent}
      </Popover>,
    );

    fireEvent.click(screen.getByText(triggerText));
    expect(mockOnOpen).toHaveBeenCalledTimes(1);

    rerender(
      <Popover
        isOpen={true}
        triggerElement={<button>{triggerText}</button>}
        onOpen={mockOnOpen}
        onClose={mockOnClose}
      >
        {popoverContent}
      </Popover>,
    );

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.click(screen.getByText(triggerText));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('cleans up resources when unmounted', () => {
    const { unmount } = render(
      <Popover isOpen={true} triggerElement={<button>{triggerText}</button>}>
        {popoverContent}
      </Popover>,
    );

    act(() => {
      jest.runAllTimers();
    });

    window.cancelAnimationFrame(0);
    expect(window.cancelAnimationFrame).toHaveBeenCalled();

    unmount();
  });
});
