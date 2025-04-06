import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Popover from './popover';
import Button from '../button';

jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');
  return {
    ...original,
    createPortal: (node: React.ReactNode) => node,
  };
});

describe('Popover', () => {
  beforeAll(() => {
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 100,
      height: 50,
      top: 100,
      left: 100,
      bottom: 150,
      right: 200,
      x: 100,
      y: 100,
      toJSON: () => {},
    }));

    global.innerWidth = 1024;
    global.innerHeight = 768;
    global.scrollX = 0;
    global.scrollY = 0;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the trigger element when closed', () => {
    render(
      <Popover
        isOpen={false}
        triggerElement={<Button>Click me</Button>}
        onClose={() => {}}
      >
        <p>Popover content</p>
      </Popover>,
    );

    expect(screen.getByText('Click me')).toBeInTheDocument();
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
  });

  it('renders the popover content when open', () => {
    render(
      <Popover
        isOpen={true}
        triggerElement={<Button>Click me</Button>}
        onClose={() => {}}
      >
        <p>Popover content</p>
      </Popover>,
    );

    expect(screen.getByText('Click me')).toBeInTheDocument();
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  it('renders with a title when provided', () => {
    render(
      <Popover
        isOpen={true}
        title="Popover Title"
        triggerElement={<Button>Click me</Button>}
        onClose={() => {}}
      >
        <p>Popover content</p>
      </Popover>,
    );

    expect(screen.getByText('Popover Title')).toBeInTheDocument();
  });

  it('shows close button by default', () => {
    render(
      <Popover
        isOpen={true}
        triggerElement={<Button>Click me</Button>}
        onClose={() => {}}
      >
        <p>Popover content</p>
      </Popover>,
    );

    expect(screen.getByLabelText('Close popover')).toBeInTheDocument();
  });

  it('hides close button when showClose is false', () => {
    render(
      <Popover
        isOpen={true}
        showClose={false}
        triggerElement={<Button>Click me</Button>}
        onClose={() => {}}
      >
        <p>Popover content</p>
      </Popover>,
    );

    expect(screen.queryByLabelText('Close popover')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();

    render(
      <Popover
        isOpen={true}
        triggerElement={<Button>Click me</Button>}
        onClose={onClose}
      >
        <p>Popover content</p>
      </Popover>,
    );

    fireEvent.click(screen.getByLabelText('Close popover'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('displays different variants correctly', () => {
    const { rerender } = render(
      <Popover
        isOpen={true}
        variant="primary"
        triggerElement={<Button>Click me</Button>}
        onClose={() => {}}
      >
        <p>Popover content</p>
      </Popover>,
    );

    const popover = screen.getByRole('dialog');
    expect(popover).toHaveClass('primary');

    // Test all variants
    const variants = [
      'secondary',
      'danger',
      'success',
      'warning',
      'outlined',
      'ghost',
    ] as const;
    variants.forEach((variant) => {
      rerender(
        <Popover
          isOpen={true}
          variant={variant}
          triggerElement={<Button>Click me</Button>}
          onClose={() => {}}
        >
          <p>Popover content</p>
        </Popover>,
      );
      expect(popover).toHaveClass(variant);
    });
  });

  it('applies different size classes correctly', () => {
    const { rerender } = render(
      <Popover
        isOpen={true}
        size="sm"
        triggerElement={<Button>Click me</Button>}
        onClose={() => {}}
      >
        <p>Popover content</p>
      </Popover>,
    );

    const popover = screen.getByRole('dialog');
    expect(popover).toHaveClass('sm');

    rerender(
      <Popover
        isOpen={true}
        size="md"
        triggerElement={<Button>Click me</Button>}
        onClose={() => {}}
      >
        <p>Popover content</p>
      </Popover>,
    );
    expect(popover).toHaveClass('md');

    rerender(
      <Popover
        isOpen={true}
        size="lg"
        triggerElement={<Button>Click me</Button>}
        onClose={() => {}}
      >
        <p>Popover content</p>
      </Popover>,
    );
    expect(popover).toHaveClass('lg');
  });

  it('applies custom className when provided', () => {
    render(
      <Popover
        isOpen={true}
        className="custom-class"
        triggerElement={<Button>Click me</Button>}
        onClose={() => {}}
      >
        <p>Popover content</p>
      </Popover>,
    );

    expect(screen.getByRole('dialog')).toHaveClass('custom-class');
  });

  it('applies custom contentClassName when provided', () => {
    render(
      <Popover
        isOpen={true}
        contentClassName="custom-content-class"
        triggerElement={<Button>Click me</Button>}
        onClose={() => {}}
      >
        <p>Popover content</p>
      </Popover>,
    );

    const content = screen.getByText('Popover content').closest('div');
    expect(content).toHaveClass('custom-content-class');
  });

  it('calls onOpen when popover opens', () => {
    const onOpen = jest.fn();

    render(
      <Popover
        isOpen={true}
        triggerElement={<Button>Click me</Button>}
        onClose={() => {}}
        onOpen={onOpen}
      >
        <p>Popover content</p>
      </Popover>,
    );

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('positions popover correctly based on placement', async () => {
    const { rerender } = render(
      <Popover
        isOpen={true}
        placement="bottom"
        triggerElement={<Button>Click me</Button>}
        onClose={() => {}}
      >
        <p>Popover content</p>
      </Popover>,
    );

    let popover = screen.getByRole('dialog');
    expect(popover).toHaveClass('bottom');

    rerender(
      <Popover
        isOpen={true}
        placement="top"
        triggerElement={<Button>Click me</Button>}
        onClose={() => {}}
      >
        <p>Popover content</p>
      </Popover>,
    );

    expect(popover).toHaveClass('top');
  });

  it('hides tail when showTail is false', () => {
    render(
      <Popover
        isOpen={true}
        triggerElement={<Button>Click me</Button>}
        onClose={() => {}}
      >
        <p>Popover content</p>
      </Popover>,
    );

    expect(screen.getByRole('dialog')).not.toHaveClass('withTail');
  });
});

export const PopoverExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1>Popover Example</h1>

      <div style={{ margin: '100px' }}>
        <Popover
          isOpen={isOpen}
          triggerElement={
            <Button onClick={() => setIsOpen(!isOpen)} variant="primary">
              Toggle Popover
            </Button>
          }
          onClose={() => setIsOpen(false)}
          title="Popover Title"
          placement="top"
          variant="primary"
          size="md"
        >
          <div style={{ padding: '10px' }}>
            <p>This is a popover with modern styling and improved UX.</p>
            <p>It has proper semantics and accessibility features.</p>
            <Button
              onClick={() => setIsOpen(false)}
              variant="outlined"
              size="small"
              fullWidth
            >
              Close Popover
            </Button>
          </div>
        </Popover>
      </div>
    </div>
  );
};
