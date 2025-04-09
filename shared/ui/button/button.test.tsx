import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './button';

describe('Button component', () => {
  it('renders with the correct text content', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('renders children inside a span with buttonContent class', () => {
    render(<Button>Click me</Button>);
    const contentSpan = screen.getByText('Click me');
    expect(contentSpan).toBeInTheDocument();
    expect(contentSpan).toHaveClass('buttonContent');
  });

  it('applies the primary variant class by default', () => {
    render(<Button>Default Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('primary');
  });

  it('applies the correct class based on the variant prop', () => {
    const { rerender } = render(<Button variant="danger">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('danger');

    rerender(<Button variant="success">Save</Button>);
    expect(screen.getByRole('button')).toHaveClass('success');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('secondary');

    rerender(<Button variant="warning">Warning</Button>);
    expect(screen.getByRole('button')).toHaveClass('warning');

    rerender(<Button variant="outlined">Outlined</Button>);
    expect(screen.getByRole('button')).toHaveClass('outlined');

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('ghost');
  });

  it('applies medium size class by default', () => {
    render(<Button>Medium Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('medium');
  });

  it('applies the correct size class based on size prop', () => {
    const { rerender } = render(<Button size="small">Small Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('small');

    rerender(<Button size="large">Large Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('large');
  });

  it('applies loading class and disables the button when loading', () => {
    render(<Button isLoading>Loading Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('loading');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('applies fullWidth class when fullWidth prop is true', () => {
    render(<Button fullWidth>Full Width Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('fullWidth');
  });

  it('renders startIcon when provided', () => {
    const IconMock = () => <svg data-testid="start-icon" />;
    render(<Button startIcon={<IconMock />}>With Icon</Button>);
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('start-icon').closest('div')).toHaveClass(
      'buttonIcon',
    );
  });

  it('renders endIcon when provided', () => {
    const IconMock = () => <svg data-testid="end-icon" />;
    render(<Button endIcon={<IconMock />}>With End Icon</Button>);
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-icon').closest('div')).toHaveClass(
      'buttonIconEnd',
    );
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("doesn't call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("doesn't call onClick when loading", () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} isLoading>
        Loading
      </Button>,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should be focusable', () => {
    render(<Button>Focusable Button</Button>);
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
  });

  it('passes additional props to the button element', () => {
    render(
      <Button data-testid="custom-button" aria-label="custom button">
        Props Button
      </Button>,
    );
    const buttonElement = screen.getByTestId('custom-button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('aria-label', 'custom button');
  });

  it('should handle keyboard events through native browser behavior', () => {
    const handleKeyDown = jest.fn();
    render(<Button onKeyDown={handleKeyDown}>Key Events</Button>);
    const button = screen.getByRole('button');

    fireEvent.keyDown(button, { key: ' ', code: 'Space' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledTimes(2);
  });

  it('should show loading spinner when isLoading is true', () => {
    render(<Button isLoading>Loading State</Button>);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveClass('spinner');
  });
});
