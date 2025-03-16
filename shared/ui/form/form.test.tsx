import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './form';
import { SchemaField } from '@app-shared/services/schema';

describe('Form Component', () => {
  const mockSchema: SchemaField[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      validators: (value: string) => {
        if (!value.includes('@')) return 'Invalid email format';
        return undefined;
      },
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      required: true,
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
      ],
    },
  ];

  const defaultProps = {
    schema: mockSchema,
    onSubmit: jest.fn(),
    title: 'Test Form',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders form with title', () => {
      render(<Form {...defaultProps} />);
      expect(screen.getByText('Test Form')).toBeInTheDocument();
    });

    it('renders all fields from schema', () => {
      render(<Form {...defaultProps} />);
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(
        screen.getByRole('combobox', { name: 'Role *' }),
      ).toBeInTheDocument();
    });

    it('renders submit button with custom label', () => {
      render(<Form {...defaultProps} submitLabel="Save" />);
      expect(screen.getByText('Save')).toBeInTheDocument();
    });

    it('renders with default values', () => {
      const defaultValues = {
        name: 'John Doe',
        email: 'john@example.com',
      };
      render(<Form {...defaultProps} defaultValues={defaultValues} />);
      expect(screen.getByLabelText('Name')).toHaveValue('John Doe');
      expect(screen.getByLabelText('Email')).toHaveValue('john@example.com');
    });
  });

  describe('Validation', () => {
    it('shows required field errors on empty submission', async () => {
      render(<Form {...defaultProps} />);
      await userEvent.click(screen.getByText('Submit'));

      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Role is required')).toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    it('calls onSubmit with form data when valid', async () => {
      render(<Form {...defaultProps} />);

      await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
      await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');

      const combobox = screen.getByRole('combobox', { name: 'Role *' });
      await userEvent.click(combobox);
      await userEvent.click(screen.getByText('Admin'));

      await userEvent.click(screen.getByText('Submit'));

      expect(defaultProps.onSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
      });
    });

    it('does not call onSubmit when form is invalid', async () => {
      render(<Form {...defaultProps} />);
      await userEvent.click(screen.getByText('Submit'));
      expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    });

    it('disables submit button when loading', () => {
      render(<Form {...defaultProps} isLoading />);
      const submitButton = screen.getByRole('button');
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Styling', () => {
    it('applies size prop to all fields', () => {
      render(<Form {...defaultProps} size="large" />);
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach((input) => {
        expect(input.parentElement?.parentElement).toHaveClass('large');
      });
    });

    it('applies variant props to select and button', () => {
      render(
        <Form
          {...defaultProps}
          selectVariant="secondary"
          buttonVariant="secondary"
        />,
      );
      expect(screen.getByRole('combobox')).toHaveClass('secondary');
      expect(screen.getByRole('button')).toHaveClass('secondary');
    });
  });

  describe('Additional Content', () => {
    it('renders additional content', () => {
      render(
        <Form
          {...defaultProps}
          content={<div data-testid="extra-content">Extra Content</div>}
        />,
      );
      expect(screen.getByTestId('extra-content')).toBeInTheDocument();
    });
  });
});
