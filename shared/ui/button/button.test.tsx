import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./button";

describe("Button component", () => {
  it("renders with the correct text inside a span", () => {
    render(<Button>Click me</Button>);
    const spanElement = screen.getByText("Click me");
    expect(spanElement).toBeInTheDocument();
    expect(spanElement.tagName).toBe("SPAN");
  });

  it("applies the correct class based on the variant prop", () => {
    const { rerender } = render(<Button variant="btn-danger">Delete</Button>);
    const buttonElement = screen.getByText("Delete").closest("button");
    expect(buttonElement).toHaveClass("btn-danger");

    rerender(<Button variant="btn-success">Save</Button>);
    expect(screen.getByText("Save").closest("button")).toHaveClass(
      "btn-success"
    );
  });

  it("applies the default class when no variant is provided", () => {
    render(<Button>Default Button</Button>);
    const buttonElement = screen.getByText("Default Button").closest("button");
    expect(buttonElement).toHaveClass("btn-primary");
  });

  it("passes additional props to the button element", () => {
    render(
      <Button data-testid="custom-button" aria-label="custom button">
        Props Button
      </Button>
    );
    const buttonElement = screen.getByTestId("custom-button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute("aria-label", "custom button");
  });

  it("should be focusable", () => {
    render(<Button>Focusable Button</Button>);
    const button = screen.getByText("Focusable Button").closest("button");
    if (button) {
      button.focus();
      expect(button).toHaveFocus();
    }
  });
});
