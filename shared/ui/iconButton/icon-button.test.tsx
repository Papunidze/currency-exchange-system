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
});
