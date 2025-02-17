import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { z } from "zod";
import Form from "./form";

const mockSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
});

describe("Form component", () => {
  const mockSubmit = jest.fn();
  const defaultProps = {
    schema: mockSchema,
    initialValues: { name: "", email: "" },
    onSubmit: mockSubmit,
  };

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it("renders form controls for each field in initialValues", () => {
    render(<Form {...defaultProps} />);

    expect(screen.getByLabelText("name")).toBeInTheDocument();
    expect(screen.getByLabelText("email")).toBeInTheDocument();
  });

  it("updates form data when input values change", () => {
    render(<Form {...defaultProps} />);

    const nameInput = screen.getByLabelText("name");
    const emailInput = screen.getByLabelText("email");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });

    expect(nameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("john@example.com");
  });

  it("displays validation errors when form is submitted with invalid data", async () => {
    render(<Form {...defaultProps} />);

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });
  });

  it("calls onSubmit with valid form data", async () => {
    render(<Form {...defaultProps} />);

    const nameInput = screen.getByLabelText("name");
    const emailInput = screen.getByLabelText("email");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
      });
    });
  });

  it("renders with custom submit button label", () => {
    render(<Form {...defaultProps} submitButtonLabel="Save" />);
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("disables submit button when isLoading is true", () => {
    render(<Form {...defaultProps} isLoading={true} />);
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeDisabled();
  });

  it("applies the correct button variant when loading", () => {
    render(<Form {...defaultProps} isLoading={true} />);
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toHaveClass("btn-loading");
  });

  it("renders children components", () => {
    render(
      <Form {...defaultProps}>
        <p>Extra content</p>
      </Form>
    );
    expect(screen.getByText("Extra content")).toBeInTheDocument();
  });

  it("clears validation errors when valid data is entered", async () => {
    render(<Form {...defaultProps} />);

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText("name");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText("Name is required")).not.toBeInTheDocument();
    });
  });
});
