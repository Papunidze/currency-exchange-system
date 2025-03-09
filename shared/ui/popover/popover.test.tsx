import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popover from './popover';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

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
  });

  describe('Rendering', () => {
    it('renders trigger element', () => {
      render(<Popover {...defaultProps} />);
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('does not render content by default', () => {
      render(<Popover {...defaultProps} />);
      expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
    });

    it('renders content when isOpen prop is true', () => {
      render(<Popover {...defaultProps} isOpen={true} />);
      expect(screen.getByText('Popover content')).toBeInTheDocument();
    });
  });

  describe('Click Trigger', () => {
    it('shows content when clicked', async () => {
      const user = userEvent.setup();
      render(<Popover {...defaultProps} />);
      await user.click(screen.getByText('Trigger'));
      expect(screen.getByText('Popover content')).toBeInTheDocument();
    });

    it('hides content when clicked again', async () => {
      const user = userEvent.setup();
      render(<Popover {...defaultProps} />);
      await user.click(screen.getByText('Trigger'));
      await user.click(screen.getByText('Trigger'));
      expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
    });

    it('calls onOpenChange when clicked', async () => {
      const onOpenChange = jest.fn();
      render(<Popover {...defaultProps} onOpenChange={onOpenChange} />);
      const trigger = screen.getByText('Trigger');

      await userEvent.click(trigger);
      expect(onOpenChange).toHaveBeenCalledWith(true);
      expect(onOpenChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Hover Trigger', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('shows content on hover', () => {
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

    it('keeps content visible when quickly moving between trigger and content', () => {
      render(<Popover {...defaultProps} trigger="hover" />);
      const trigger = screen.getByText('Trigger');

      fireEvent.mouseEnter(trigger);
      fireEvent.mouseLeave(trigger);

      const content = screen.getByText('Popover content');
      fireEvent.mouseEnter(content.parentElement!);

      act(() => {
        jest.advanceTimersByTime(150);
      });

      expect(content).toBeInTheDocument();
    });
  });

  describe('Backdrop', () => {
    it('shows backdrop when hasBackdrop is true and trigger is click', async () => {
      const user = userEvent.setup();
      render(<Popover {...defaultProps} hasBackdrop />);
      await user.click(screen.getByText('Trigger'));
      expect(document.querySelector('.backdrop')).toBeInTheDocument();
    });

    it('does not show backdrop when hasBackdrop is false', async () => {
      const user = userEvent.setup();
      render(<Popover {...defaultProps} hasBackdrop={false} />);
      await user.click(screen.getByText('Trigger'));
      expect(document.querySelector('.backdrop')).not.toBeInTheDocument();
    });

    it('does not show backdrop when trigger is hover', () => {
      render(<Popover {...defaultProps} trigger="hover" hasBackdrop />);
      fireEvent.mouseEnter(screen.getByText('Trigger'));
      expect(document.querySelector('.backdrop')).not.toBeInTheDocument();
    });

    it('closes popover when clicking backdrop', async () => {
      const user = userEvent.setup();
      render(<Popover {...defaultProps} hasBackdrop />);
      await user.click(screen.getByText('Trigger'));
      await user.click(document.querySelector('.portalContainer')!);
      expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
    });
  });

  describe('Positioning', () => {
    it('applies different placements', async () => {
      const placements = ['top', 'bottom', 'left', 'right'] as const;
      const { rerender } = render(<Popover {...defaultProps} />);

      for (const placement of placements) {
        rerender(<Popover {...defaultProps} placement={placement} isOpen />);
        const content = screen.getByText('Popover content').parentElement;
        expect(content).toHaveClass(placement);
      }
    });

    it('updates position on window resize', async () => {
      render(<Popover {...defaultProps} isOpen placement="bottom" />);
      const content = screen.getByText('Popover content').parentElement!;
      expect(content).toHaveClass('bottom');

      act(() => {
        window.innerHeight = 100;
        window.innerWidth = 100;
        fireEvent.resize(window);
      });

      expect(content).toHaveClass('bottom');
    });

    it('updates position on scroll', async () => {
      render(<Popover {...defaultProps} isOpen placement="bottom" />);
      const content = screen.getByText('Popover content').parentElement!;
      expect(content).toHaveClass('bottom');

      act(() => {
        window.scrollY = 500;
        window.scrollX = 500;
        fireEvent.scroll(window);
      });

      expect(content).toHaveClass('bottom');
    });
  });

  describe('Styling', () => {
    it('applies custom className to trigger', () => {
      render(<Popover {...defaultProps} className="custom-trigger" />);
      expect(screen.getByText('Trigger').parentElement).toHaveClass(
        'custom-trigger',
      );
    });

    it('applies custom contentClassName to content', async () => {
      render(
        <Popover {...defaultProps} contentClassName="custom-content" isOpen />,
      );
      expect(screen.getByText('Popover content').parentElement).toHaveClass(
        'custom-content',
      );
    });

    it('applies custom tailClassName to arrow', async () => {
      render(<Popover {...defaultProps} tailClassName="custom-tail" isOpen />);
      expect(document.querySelector('.tail')).toHaveClass('custom-tail');
    });

    it('shows arrow by default', async () => {
      render(<Popover {...defaultProps} isOpen />);
      expect(document.querySelector('.tail')).toBeInTheDocument();
    });

    it('hides arrow when showArrow is false', async () => {
      render(<Popover {...defaultProps} showArrow={false} isOpen />);
      expect(document.querySelector('.tail')).not.toBeInTheDocument();
    });
  });
});
