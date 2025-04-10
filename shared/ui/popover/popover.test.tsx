import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Popover from './popover';

jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');
  return {
    ...original,
    createPortal: (node: React.ReactNode) => node,
  };
});

describe('Popover', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders trigger element correctly', () => {
    render(
      <Popover triggerElement={<button>Trigger</button>}>
        <div>Popover Content</div>
      </Popover>,
    );

    expect(screen.getByText('Trigger')).toBeInTheDocument();
  });

  it('does not show content by default', () => {
    render(
      <Popover triggerElement={<button>Trigger</button>}>
        <div>Popover Content</div>
      </Popover>,
    );

    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
  });

  it('shows content when trigger is clicked', async () => {
    render(
      <Popover triggerElement={<button>Trigger</button>}>
        <div>Popover Content</div>
      </Popover>,
    );

    fireEvent.click(screen.getByText('Trigger'));

    await waitFor(() => {
      expect(screen.getByText('Popover Content')).toBeInTheDocument();
    });
  });

  it('shows content on hover when trigger is "hover"', async () => {
    render(
      <Popover triggerElement={<button>Hover Me</button>} trigger="hover">
        <div>Hover Content</div>
      </Popover>,
    );

    fireEvent.mouseEnter(screen.getByText('Hover Me'));

    await waitFor(() => {
      expect(screen.getByText('Hover Content')).toBeInTheDocument();
    });
  });

  it('shows content on focus when trigger is "focus"', async () => {
    render(
      <Popover triggerElement={<button>Focus Me</button>} trigger="focus">
        <div>Focus Content</div>
      </Popover>,
    );

    fireEvent.focus(screen.getByText('Focus Me'));

    await waitFor(() => {
      expect(screen.getByText('Focus Content')).toBeInTheDocument();
    });
  });

  it('renders title when provided', async () => {
    render(
      <Popover triggerElement={<button>Trigger</button>} title="Popover Title">
        <div>Popover Content</div>
      </Popover>,
    );

    fireEvent.click(screen.getByText('Trigger'));

    await waitFor(() => {
      expect(screen.getByText('Popover Title')).toBeInTheDocument();
    });
  });

  it('renders with different variants', async () => {
    const { rerender } = render(
      <Popover
        triggerElement={<button>Trigger</button>}
        variant="primary"
        isOpen={true}
      >
        <div>Popover Content</div>
      </Popover>,
    );

    expect(document.querySelector('.popover-primary')).toBeInTheDocument();

    rerender(
      <Popover
        triggerElement={<button>Trigger</button>}
        variant="secondary"
        isOpen={true}
      >
        <div>Popover Content</div>
      </Popover>,
    );

    expect(document.querySelector('.popover-secondary')).toBeInTheDocument();
  });

  it('renders with different sizes', async () => {
    const { rerender } = render(
      <Popover
        triggerElement={<button>Trigger</button>}
        size="sm"
        isOpen={true}
      >
        <div>Popover Content</div>
      </Popover>,
    );

    expect(document.querySelector('.popover-sm')).toBeInTheDocument();

    rerender(
      <Popover
        triggerElement={<button>Trigger</button>}
        size="lg"
        isOpen={true}
      >
        <div>Popover Content</div>
      </Popover>,
    );

    expect(document.querySelector('.popover-lg')).toBeInTheDocument();
  });

  it('respects controlled isOpen prop', async () => {
    const { rerender } = render(
      <Popover triggerElement={<button>Trigger</button>} isOpen={false}>
        <div>Popover Content</div>
      </Popover>,
    );

    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();

    rerender(
      <Popover triggerElement={<button>Trigger</button>} isOpen={true}>
        <div>Popover Content</div>
      </Popover>,
    );

    expect(screen.getByText('Popover Content')).toBeInTheDocument();
  });

  it('calls onOpen and onClose callbacks', async () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();

    render(
      <Popover
        triggerElement={<button>Trigger</button>}
        onOpen={onOpen}
        onClose={onClose}
      >
        <div>Popover Content</div>
      </Popover>,
    );

    fireEvent.click(screen.getByText('Trigger'));
    expect(onOpen).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Trigger'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
