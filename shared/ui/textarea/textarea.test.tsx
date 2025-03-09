import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Textarea from './textarea';

describe('Textarea Component', () => {
  const defaultProps = {
    label: 'Test Label',
  };

  it('renders with default props', () => {
    render(<Textarea {...defaultProps} />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Textarea {...defaultProps} placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('shows required indicator when required prop is true', () => {
    render(<Textarea {...defaultProps} required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<Textarea {...defaultProps} helperText="Helper text" />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('shows error message when invalid', () => {
    render(
      <Textarea {...defaultProps} isInvalid errorMessage="Error message" />,
    );
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('shows character count when showCount is true', () => {
    render(<Textarea {...defaultProps} showCount value="Test" />);
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('shows character count with max length', () => {
    render(
      <Textarea {...defaultProps} showCount value="Test" maxLength={10} />,
    );
    expect(screen.getByText('4 / 10')).toBeInTheDocument();
  });

  it('handles value changes', async () => {
    const handleChange = jest.fn();
    render(<Textarea {...defaultProps} onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'Test input');

    expect(handleChange).toHaveBeenCalledTimes(10); // One call per character
    expect(textarea).toHaveValue('Test input');
  });

  it('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    render(
      <Textarea {...defaultProps} onFocus={handleFocus} onBlur={handleBlur} />,
    );

    const textarea = screen.getByRole('textbox');
    fireEvent.focus(textarea);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(textarea);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('applies disabled state', () => {
    render(<Textarea {...defaultProps} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies fullWidth class when fullWidth is true', () => {
    const { container } = render(<Textarea {...defaultProps} fullWidth />);
    expect(container.firstChild).toHaveClass('fullWidth');
  });

  it('applies different sizes', () => {
    const { rerender } = render(<Textarea {...defaultProps} size="small" />);
    expect(
      screen.getByRole('textbox').parentElement?.parentElement,
    ).toHaveClass('small');

    rerender(<Textarea {...defaultProps} size="medium" />);
    expect(
      screen.getByRole('textbox').parentElement?.parentElement,
    ).toHaveClass('medium');

    rerender(<Textarea {...defaultProps} size="large" />);
    expect(
      screen.getByRole('textbox').parentElement?.parentElement,
    ).toHaveClass('large');
  });

  it('applies custom className and contentClassName', () => {
    const { container } = render(
      <Textarea
        {...defaultProps}
        className="custom-container"
        contentClassName="custom-content"
      />,
    );
    expect(container.firstChild).toHaveClass('custom-container');
    expect(
      screen.getByRole('textbox').parentElement?.parentElement,
    ).toHaveClass('custom-content');
  });

  it('applies error styles when isInvalid is true', () => {
    render(<Textarea {...defaultProps} isInvalid />);
    expect(
      screen.getByRole('textbox').parentElement?.parentElement,
    ).toHaveClass('error');
  });

  it('applies valid styles when isValid is true', () => {
    render(<Textarea {...defaultProps} isValid />);
    expect(
      screen.getByRole('textbox').parentElement?.parentElement,
    ).toHaveClass('valid');
  });

  it('handles auto-resize', async () => {
    render(<Textarea {...defaultProps} autoResize />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;

    const initialHeight = textarea.style.height;
    await userEvent.type(textarea, 'Line 1\nLine 2\nLine 3');

    // We can't test the exact height as it depends on the browser,
    // but we can check if the height has changed
    expect(textarea.style.height).not.toBe(initialHeight);
  });

  it('forwards ref to textarea element', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea {...defaultProps} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('sets aria-invalid when isInvalid is true', () => {
    render(<Textarea {...defaultProps} isInvalid />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-describedby when helper text or error message is present', () => {
    const { rerender } = render(
      <Textarea {...defaultProps} helperText="Helper text" />,
    );
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-describedby');

    rerender(
      <Textarea {...defaultProps} isInvalid errorMessage="Error message" />,
    );
    expect(textarea).toHaveAttribute('aria-describedby');
  });

  it('should handle paste events correctly', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<Textarea {...defaultProps} onChange={handleChange} />);
    const textarea = screen.getByRole('textbox');

    fireEvent.paste(textarea, {
      clipboardData: { getData: () => 'Pasted content' },
    });
    fireEvent.change(textarea, { target: { value: 'Pasted content' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('should respect maxLength restriction', async () => {
    render(<Textarea {...defaultProps} maxLength={10} />);
    const textarea = screen.getByRole('textbox');

    await userEvent.type(textarea, '12345678901');
    expect(textarea).toHaveValue('1234567890');
  });

  it('should handle maxLength with paste events', async () => {
    render(<Textarea {...defaultProps} maxLength={5} />);
    const textarea = screen.getByRole('textbox');

    await userEvent.type(textarea, '123');
    await fireEvent.paste(textarea, {
      clipboardData: {
        getData: () => '456789',
      },
      target: { value: '12345' },
    });

    expect(textarea).toHaveValue('12345');
  });

  it('should maintain cursor position after maxLength truncation', async () => {
    render(<Textarea {...defaultProps} maxLength={5} />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;

    await userEvent.type(textarea, '123');
    textarea.setSelectionRange(1, 1);

    for (const char of '45678') {
      await userEvent.type(textarea, char);
      textarea.setSelectionRange(1, 1);
    }

    expect(textarea).toHaveValue('12345');
    expect(textarea.selectionStart).toBe(1);
    expect(textarea.selectionEnd).toBe(1);
  });
});
