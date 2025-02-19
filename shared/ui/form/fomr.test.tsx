import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from './form';
import { VALIDATORS } from '@app-shared/constants';
import { SCHEMA_BUILDER } from '@app-shared/constants/schema';

const mockSchema = SCHEMA_BUILDER.Object({
  name: SCHEMA_BUILDER.name('name')
    .label('Name')
    .type('text')
    .validation(
      VALIDATORS.string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters')
        .build(),
    )
    .add(),

  email: SCHEMA_BUILDER.name('email')
    .label('Email')
    .type('email')
    .validation(
      VALIDATORS.string()
        .required('Email is required')
        .email('Please enter a valid email address')
        .build(),
    )
    .add(),

  password: SCHEMA_BUILDER.name('password')
    .label('Password')
    .type('password')
    .validation(
      VALIDATORS.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .build(),
    )
    .add(),
});

describe('Form component with mockSchema', () => {
  it('renders all form controls based on the mockSchema', () => {
    render(
      <Form
        schema={mockSchema}
        onSubmit={jest.fn()}
        submitButtonLabel="Submit"
      />,
    );

    mockSchema.forEach((field) => {
      const input = screen.getByLabelText(field.label);
      expect(input).toBeInTheDocument();
    });

    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeInTheDocument();
  });

  it('shows validation errors when required fields are empty', async () => {
    const mockSubmit = jest.fn();
    render(
      <Form
        schema={mockSchema}
        onSubmit={mockSubmit}
        submitButtonLabel="Submit"
      />,
    );

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  it('calls the onSubmit handler when the form is valid', async () => {
    const mockSubmit = jest.fn();
    render(
      <Form
        schema={mockSchema}
        onSubmit={mockSubmit}
        submitButtonLabel="Submit"
      />,
    );

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Password123' },
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'Password123',
      });
    });
  });

  it('disables the submit button when the form is submitting (loading state)', () => {
    const mockSubmit = jest.fn();
    render(
      <Form
        schema={mockSchema}
        onSubmit={mockSubmit}
        submitButtonLabel="Submit"
        isLoading={true}
      />,
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('clears validation errors when a user starts typing', async () => {
    const mockSubmit = jest.fn();
    render(
      <Form
        schema={mockSchema}
        onSubmit={mockSubmit}
        submitButtonLabel="Submit"
      />,
    );

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John' },
    });

    await waitFor(() => {
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    });
  });

  it('applies custom button styles when props are passed', () => {
    render(
      <Form
        schema={mockSchema}
        onSubmit={jest.fn()}
        submitButtonLabel="Submit"
        btnStyle="btn-secondary"
      />,
    );

    const submitButton = screen.getByText('Submit').closest('button');
    expect(submitButton).toHaveClass('btn-secondary');
  });
});
