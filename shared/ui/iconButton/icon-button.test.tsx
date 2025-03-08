import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import IconButton from './icon-button';

describe('IconButton component', () => {
  const mockIcon = <svg data-testid="test-icon" />;

  it('renders with the icon', () => {
    render(<IconButton icon={mockIcon} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('applies the correct variant class', () => {
    const { rerender } = render(
      <IconButton icon={mockIcon} variant="danger" />,
    );
    expect(screen.getByRole('button')).toHaveClass('danger');

    rerender(<IconButton icon={mockIcon} variant="success" />);
    expect(screen.getByRole('button')).toHaveClass('success');
  });

  it('applies the correct size class', () => {
    const { rerender } = render(<IconButton icon={mockIcon} size="small" />);
    expect(screen.getByRole('button')).toHaveClass('small');

    rerender(<IconButton icon={mockIcon} size="large" />);
    expect(screen.getByRole('button')).toHaveClass('large');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<IconButton icon={mockIcon} onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('accepts additional props', () => {
    render(
      <IconButton
        icon={mockIcon}
        data-testid="custom-button"
        aria-label="custom icon button"
      />,
    );
    const button = screen.getByTestId('custom-button');
    expect(button).toHaveAttribute('aria-label', 'custom icon button');
  });

  it('applies loading class and sets aria-busy when isLoading is true', () => {
    render(<IconButton icon={mockIcon} isLoading />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('loading');
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('disables the button when isLoading is true', () => {
    render(<IconButton icon={mockIcon} isLoading />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  // Badge tests
  it('renders badge when badgeCount is greater than 0', () => {
    render(<IconButton icon={mockIcon} badgeCount={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('does not render badge when badgeCount is 0', () => {
    render(<IconButton icon={mockIcon} badgeCount={0} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('does not render badge when badgeCount is undefined', () => {
    render(<IconButton icon={mockIcon} />);
    expect(document.querySelector('.badge')).not.toBeInTheDocument();
  });

  it('shows "99+" when badgeCount is greater than 99', () => {
    render(<IconButton icon={mockIcon} badgeCount={100} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('sets aria-label on the badge for accessibility', () => {
    render(<IconButton icon={mockIcon} badgeCount={5} />);
    expect(screen.getByText('5')).toHaveAttribute(
      'aria-label',
      '5 notifications',
    );
  });

  it('uses ariaLabel prop for button aria-label', () => {
    render(<IconButton icon={mockIcon} ariaLabel="Close dialog" />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Close dialog',
    );
  });

  it('applies disabled attribute when disabled prop is true', () => {
    render(<IconButton icon={mockIcon} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not trigger click event when disabled', () => {
    const handleClick = jest.fn();
    render(<IconButton icon={mockIcon} onClick={handleClick} disabled />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
