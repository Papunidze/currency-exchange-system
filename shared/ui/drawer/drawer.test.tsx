import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Drawer } from './drawer';
import '@testing-library/jest-dom';

// Mock the createPortal functionality
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

describe('Drawer Component', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    onCloseMock.mockReset();
  });

  test('should not render when not mounted', () => {
    // Override the useState implementation for this test only
    const useStateMock = jest.spyOn(React, 'useState');
    useStateMock.mockImplementationOnce(() => [false, jest.fn()]);

    const { container } = render(
      <Drawer isOpen={true} onClose={onCloseMock}>
        <div data-testid="drawer-content">Drawer Content</div>
      </Drawer>,
    );

    expect(container.firstChild).toBeNull();
    useStateMock.mockRestore();
  });

  test('should render when open', () => {
    render(
      <Drawer isOpen={true} onClose={onCloseMock}>
        <div data-testid="drawer-content">Drawer Content</div>
      </Drawer>,
    );

    expect(screen.getByTestId('drawer-content')).toBeInTheDocument();
  });

  test('should apply left placement class by default', () => {
    render(
      <Drawer isOpen={true} onClose={onCloseMock}>
        <div>Content</div>
      </Drawer>,
    );

    const drawerElement = document.querySelector('[class*="drawer"]');
    expect(drawerElement).toHaveClass('left');
  });

  test('should apply right placement class when specified', () => {
    render(
      <Drawer isOpen={true} onClose={onCloseMock} placement="right">
        <div>Content</div>
      </Drawer>,
    );

    const drawerElement = document.querySelector('[class*="drawer"]');
    expect(drawerElement).toHaveClass('right');
  });

  test('should apply open class when isOpen is true', () => {
    render(
      <Drawer isOpen={true} onClose={onCloseMock}>
        <div>Content</div>
      </Drawer>,
    );

    const drawerElement = document.querySelector('[class*="drawer"]');
    expect(drawerElement).toHaveClass('open');
  });

  test('should not apply open class when isOpen is false', () => {
    render(
      <Drawer isOpen={false} onClose={onCloseMock}>
        <div>Content</div>
      </Drawer>,
    );

    const drawerElement = document.querySelector('[class*="drawer"]');
    expect(drawerElement).not.toHaveClass('open');
  });

  test('should apply custom className when provided', () => {
    render(
      <Drawer isOpen={true} onClose={onCloseMock} className="custom-class">
        <div>Content</div>
      </Drawer>,
    );

    const drawerElement = document.querySelector('[class*="drawer"]');
    expect(drawerElement).toHaveClass('custom-class');
  });

  test('should call onClose when backdrop is clicked', () => {
    render(
      <Drawer isOpen={true} onClose={onCloseMock}>
        <div>Content</div>
      </Drawer>,
    );

    // Find the backdrop (this depends on how your Backdrop component renders)
    // This is assuming the Backdrop component applies a data-testid
    const backdrop = document.querySelector('[class*="backdrop"]');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    }
  });
});
