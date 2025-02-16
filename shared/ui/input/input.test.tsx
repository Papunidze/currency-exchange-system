import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "./input";

describe("Input component", () => {
  it("renders with the correct label text", () => {
    render(<Input label="Username" />);
    const labelElement = screen.getByText("Username");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement.tagName).toBe("SPAN");
  });

  it("applies the correct placeholder when not provided", () => {
    render(<Input label="Username" placeholder="" />);
    const inputElement = screen.getByPlaceholderText("");
    expect(inputElement).toBeInTheDocument();
  });

  it("renders with the correct value when passed", () => {
    render(<Input label="Username" value="testuser" />);
    const inputElement = screen.getByDisplayValue("testuser");
    expect(inputElement).toBeInTheDocument();
  });

  it("should call onChange when the input value changes", () => {
    const handleChange = jest.fn();
    render(<Input label="Username" onChange={handleChange} />);
    const inputElement = screen.getByLabelText("Username");
    fireEvent.change(inputElement, { target: { value: "newvalue" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("applies additional props to the input element", () => {
    render(
      <Input
        label="Username"
        data-testid="custom-input"
        aria-label="custom input"
      />
    );
    const inputElement = screen.getByTestId("custom-input");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("aria-label", "custom input");
  });

  it("should be focusable", () => {
    render(<Input label="Username" />);
    const inputElement = screen.getByLabelText("Username");
    inputElement.focus();
    expect(inputElement).toHaveFocus();
  });
});
