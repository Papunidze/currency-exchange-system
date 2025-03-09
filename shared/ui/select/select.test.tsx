import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from './select';
import { SelectOption } from './select.interfaces';

describe('Select Component', () => {
  const options: SelectOption[] = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3', disabled: true },
  ];

  it('renders with default props', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<Select options={options} placeholder="Choose an option" />);
    expect(screen.getByText('Choose an option')).toBeInTheDocument();
  });

  it('shows required asterisk when required prop is true', () => {
    render(<Select options={options} label="Test Label" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Select options={options} error="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<Select options={options} helperText="Helper text" />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('opens dropdown on click', async () => {
    render(<Select options={options} />);
    const select = screen.getByRole('combobox');

    await userEvent.click(select);

    const dropdown = screen.getByRole('listbox');
    expect(dropdown).toBeInTheDocument();
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('selects an option when clicked', async () => {
    const handleChange = jest.fn();
    render(<Select options={options} onChange={handleChange} />);

    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByText('Option 1'));

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledWith('1');
  });

  it('does not select disabled options', async () => {
    const handleChange = jest.fn();
    render(<Select options={options} onChange={handleChange} />);

    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByText('Option 3'));

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('closes dropdown when clicking outside', () => {
    render(<Select options={options} />);
    const select = screen.getByRole('combobox');

    fireEvent.click(select);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('updates value when controlled value prop changes', () => {
    const { rerender } = render(<Select options={options} value="1" />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();

    rerender(<Select options={options} value="2" />);
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Select options={options} variant="primary" />);
    expect(screen.getByRole('combobox')).toHaveClass('primary');

    rerender(<Select options={options} variant="secondary" />);
    expect(screen.getByRole('combobox')).toHaveClass('secondary');

    rerender(<Select options={options} variant="success" />);
    expect(screen.getByRole('combobox')).toHaveClass('success');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Select options={options} size="small" />);
    expect(screen.getByRole('combobox')).toHaveClass('small');

    rerender(<Select options={options} size="medium" />);
    expect(screen.getByRole('combobox')).toHaveClass('medium');

    rerender(<Select options={options} size="large" />);
    expect(screen.getByRole('combobox')).toHaveClass('large');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Select options={options} disabled />);
    const select = screen.getByRole('combobox');

    expect(select.parentElement).toHaveClass('disabled');
    fireEvent.click(select);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('shows checkmark for selected option', async () => {
    render(<Select options={options} value="1" />);

    await userEvent.click(screen.getByRole('combobox'));

    const selectedOption = screen.getByRole('option', { selected: true });
    expect(selectedOption).toHaveClass('selected');
    expect(selectedOption.querySelector('.checkmark')).toBeInTheDocument();
  });
});
