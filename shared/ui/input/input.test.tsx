import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './input';

describe('Input component', () => {
  it('displays helper text when provided', () => {
    render(<Input label="Username" helperText="Enter your username" />);
    expect(screen.getByText('Enter your username')).toBeInTheDocument();
  });

  it('displays error message when isInvalid is true', () => {
    render(
      <Input
        label="Username"
        isInvalid={true}
        errorMessage="Username is required"
      />,
    );
    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByText('Username is required')).toHaveClass('errorText');
  });

  it('prioritizes error message over helper text when isInvalid is true', () => {
    render(
      <Input
        label="Username"
        helperText="Enter your username"
        errorMessage="Username is required"
        isInvalid={true}
      />,
    );
    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.queryByText('Enter your username')).not.toBeInTheDocument();
  });

  it('applies medium size class by default', () => {
    render(<Input label="Username" />);
    const inputWrapper = screen.getByLabelText('Username').closest('div');
    expect(inputWrapper?.parentElement).toHaveClass('medium');
  });

  it('applies the correct size class based on size prop', () => {
    const { rerender } = render(<Input label="Username" size="small" />);
    let inputWrapper = screen.getByLabelText('Username').closest('div');
    expect(inputWrapper?.parentElement).toHaveClass('small');

    rerender(<Input label="Username" size="large" />);
    inputWrapper = screen.getByLabelText('Username').closest('div');
    expect(inputWrapper?.parentElement).toHaveClass('large');
  });

  it('applies fullWidth class by default', () => {
    render(<Input label="Username" />);
    const container = screen.getByLabelText('Username').closest('div')
      ?.parentElement?.parentElement;
    expect(container).toHaveClass('fullWidth');
  });

  it("doesn't apply fullWidth class when fullWidth=false", () => {
    render(<Input label="Username" fullWidth={false} />);
    const container = screen.getByLabelText('Username').closest('div')
      ?.parentElement?.parentElement;
    expect(container).not.toHaveClass('fullWidth');
  });

  it('sets disabled attribute on input element when disabled=true', () => {
    render(<Input label="Username" disabled />);
    expect(screen.getByLabelText('Username')).toBeDisabled();
    const container = screen.getByLabelText('Username').closest('div')
      ?.parentElement?.parentElement;
    expect(container).toHaveClass('disabled');
  });

  it('applies valid class when isValid=true', () => {
    render(<Input label="Username" isValid={true} />);
    const inputWrapper = screen.getByLabelText('Username').closest('div');
    expect(inputWrapper?.parentElement).toHaveClass('valid');
  });

  // ARIA attributes
  it('sets aria-invalid attribute when isInvalid=true', () => {
    render(<Input label="Username" isInvalid={true} />);
    expect(screen.getByLabelText('Username')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('sets aria-describedby attribute when helper text is provided', () => {
    render(<Input label="Username" helperText="Helper text" />);
    const input = screen.getByLabelText('Username');
    expect(input).toHaveAttribute('aria-describedby');
    const describedById = input.getAttribute('aria-describedby');
    expect(screen.getByText('Helper text').id).toBe(describedById);
  });

  // Event handlers
  it('should call onFocus when input is focused', () => {
    const handleFocus = jest.fn();
    render(<Input label="Username" onFocus={handleFocus} />);
    const inputElement = screen.getByLabelText('Username');

    fireEvent.focus(inputElement);
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('should call onBlur when input loses focus', () => {
    const handleBlur = jest.fn();
    render(<Input label="Username" onBlur={handleBlur} />);
    const inputElement = screen.getByLabelText('Username');

    fireEvent.focus(inputElement);
    fireEvent.blur(inputElement);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('should handle controlled input value changes', () => {
    const handleChange = jest.fn();
    const { rerender } = render(
      <Input label="Username" value="initial" onChange={handleChange} />,
    );
    const input = screen.getByLabelText('Username');

    expect(input).toHaveValue('initial');

    rerender(
      <Input label="Username" value="updated" onChange={handleChange} />,
    );
    expect(input).toHaveValue('updated');
  });

  it('should handle different input types', () => {
    const { rerender } = render(<Input label="Number" type="number" />);
    expect(screen.getByLabelText('Number')).toHaveAttribute('type', 'number');

    rerender(<Input label="Password" type="password" />);
    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'type',
      'password',
    );

    rerender(<Input label="Email" type="email" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
  });

  it('should handle maxLength restriction', () => {
    render(<Input label="Limited" maxLength={5} />);
    const input = screen.getByLabelText('Limited');

    fireEvent.change(input, { target: { value: '123456' } });
    expect(input).toHaveValue('12345');
  });

  it('should handle placeholder changes', () => {
    const { rerender } = render(
      <Input label="Dynamic" placeholder="Initial placeholder" />,
    );
    expect(
      screen.getByPlaceholderText('Initial placeholder'),
    ).toBeInTheDocument();

    rerender(<Input label="Dynamic" placeholder="Updated placeholder" />);
    expect(
      screen.getByPlaceholderText('Updated placeholder'),
    ).toBeInTheDocument();
  });
});
