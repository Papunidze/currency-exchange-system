import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover } from './popover';

// Mock createPortal
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

// Mock window dimensions and scroll
const mockWindow = () => {
  window.innerWidth = 1024;
  window.innerHeight = 768;
  window.scrollX = 0;
  window.scrollY = 0;
};

describe('Popover Component', () => {
  const defaultProps = {
    content: <div>Popover content</div>,
    children: <button>Trigger</button>,
  };

  beforeEach(() => {
    mockWindow();
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders trigger element', () => {
    render(<Popover {...defaultProps} />);
    expect(screen.getByText('Trigger')).toBeInTheDocument();
  });

  it('shows content when clicked (default trigger)', async () => {
    render(<Popover {...defaultProps} />);
    await userEvent.click(screen.getByText('Trigger'));
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  it('hides content when clicked again', async () => {
    render(<Popover {...defaultProps} />);
    await userEvent.click(screen.getByText('Trigger'));
    await userEvent.click(screen.getByText('Trigger'));
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
  });

  it('shows content on hover when trigger is "hover"', () => {
    render(<Popover {...defaultProps} trigger="hover" />);
    fireEvent.mouseEnter(screen.getByText('Trigger'));
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  it('hides content after hover out with delay', () => {
    render(<Popover {...defaultProps} trigger="hover" />);
    const trigger = screen.getByText('Trigger');

    fireEvent.mouseEnter(trigger);
    expect(screen.getByText('Popover content')).toBeInTheDocument();

    fireEvent.mouseLeave(trigger);
    expect(screen.getByText('Popover content')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(150);
    });

    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
  });

  it('cancels hide timeout when hovering back quickly', () => {
    render(<Popover {...defaultProps} trigger="hover" />);
    const trigger = screen.getByText('Trigger');

    fireEvent.mouseEnter(trigger);
    fireEvent.mouseLeave(trigger);
    fireEvent.mouseEnter(trigger);

    act(() => {
      jest.advanceTimersByTime(150);
    });

    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  it('shows arrow by default', async () => {
    render(<Popover {...defaultProps} />);
    await userEvent.click(screen.getByText('Trigger'));
    expect(
      screen.getByText('Popover content').parentElement?.querySelector('.tail'),
    ).toBeInTheDocument();
  });

  it('hides arrow when showArrow is false', async () => {
    render(<Popover {...defaultProps} showArrow={false} />);
    await userEvent.click(screen.getByText('Trigger'));
    expect(
      screen.getByText('Popover content').parentElement?.querySelector('.tail'),
    ).not.toBeInTheDocument();
  });

  it('applies different placements', async () => {
    const placements = ['top', 'bottom', 'left', 'right'] as const;
    const { rerender } = render(<Popover {...defaultProps} />);

    for (const placement of placements) {
      rerender(<Popover {...defaultProps} placement={placement} />);
      await userEvent.click(screen.getByText('Trigger'));
      const content = screen.getByText('Popover content').parentElement;
      expect(content).toHaveClass(placement);
      await userEvent.click(screen.getByText('Trigger')); // Close popover
    }
  });

  it('applies custom className and contentClassName', async () => {
    render(
      <Popover
        {...defaultProps}
        className="custom-trigger"
        contentClassName="custom-content"
      />,
    );
    expect(screen.getByText('Trigger').parentElement).toHaveClass(
      'custom-trigger',
    );
    await userEvent.click(screen.getByText('Trigger'));
    expect(screen.getByText('Popover content').parentElement).toHaveClass(
      'custom-content',
    );
  });

  it('applies custom tailClassName', async () => {
    render(<Popover {...defaultProps} tailClassName="custom-tail" />);
    await userEvent.click(screen.getByText('Trigger'));
    expect(
      screen.getByText('Popover content').parentElement?.querySelector('.tail'),
    ).toHaveClass('custom-tail');
  });

  it('shows backdrop when hasBackdrop is true and trigger is click', async () => {
    render(<Popover {...defaultProps} hasBackdrop />);
    await userEvent.click(screen.getByText('Trigger'));
    expect(document.querySelector('.backdrop')).toBeInTheDocument();
  });

  it('does not show backdrop when hasBackdrop is false', async () => {
    render(<Popover {...defaultProps} hasBackdrop={false} />);
    await userEvent.click(screen.getByText('Trigger'));
    expect(document.querySelector('.backdrop')).not.toBeInTheDocument();
  });

  it('does not show backdrop when trigger is hover', () => {
    render(<Popover {...defaultProps} trigger="hover" hasBackdrop />);
    fireEvent.mouseEnter(screen.getByText('Trigger'));
    expect(document.querySelector('.backdrop')).not.toBeInTheDocument();
  });

  it('closes on backdrop click', async () => {
    render(<Popover {...defaultProps} hasBackdrop />);
    await userEvent.click(screen.getByText('Trigger'));
    fireEvent.click(document.querySelector('.portalContainer')!);
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
  });

  it('calls onOpenChange when opening and closing', async () => {
    const onOpenChange = jest.fn();
    render(<Popover {...defaultProps} onOpenChange={onOpenChange} />);

    await userEvent.click(screen.getByText('Trigger'));
    expect(onOpenChange).toHaveBeenCalledWith(true);

    await userEvent.click(screen.getByText('Trigger'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('updates position on scroll', async () => {
    render(<Popover {...defaultProps} />);
    await userEvent.click(screen.getByText('Trigger'));

    act(() => {
      window.scrollY = 100;
      fireEvent.scroll(window);
    });

    const content = screen.getByText('Popover content').parentElement;
    expect(content).toHaveStyle({ top: expect.any(String) });
  });

  it('updates position on resize', async () => {
    render(<Popover {...defaultProps} />);
    await userEvent.click(screen.getByText('Trigger'));

    act(() => {
      window.innerWidth = 800;
      window.innerHeight = 600;
      fireEvent.resize(window);
    });

    const content = screen.getByText('Popover content').parentElement;
    expect(content).toHaveStyle({
      top: expect.any(String),
      left: expect.any(String),
    });
  });

  it('works with controlled isOpen prop', () => {
    const { rerender } = render(<Popover {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();

    rerender(<Popover {...defaultProps} isOpen={true} />);
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  it('prevents event propagation when clicking content', async () => {
    render(<Popover {...defaultProps} />);
    await userEvent.click(screen.getByText('Trigger'));

    const content = screen.getByText('Popover content');
    const mockStopPropagation = jest.fn();

    fireEvent.click(content, {
      stopPropagation: mockStopPropagation,
    });

    expect(mockStopPropagation).toHaveBeenCalled();
  });

  it('applies custom offset', async () => {
    render(<Popover {...defaultProps} offset={16} />);
    await userEvent.click(screen.getByText('Trigger'));

    const content = screen.getByText('Popover content').parentElement;
    expect(content).toHaveStyle({
      top: expect.any(String),
      left: expect.any(String),
    });
  });
});
