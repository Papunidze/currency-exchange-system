import React from 'react';
import { render, screen } from '@testing-library/react';
import Drawer from './drawer';
import '@testing-library/jest-dom';

jest.mock('../backdrop', () => ({
  __esModule: true,
  default: ({
    children,
    isOpen,
  }: {
    children: React.ReactNode;
    isOpen: boolean;
  }) => (isOpen ? children : null),
}));

describe('Drawer Component', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    onCloseMock.mockReset();
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

  test('should apply visible class when isOpen is true', () => {
    render(
      <Drawer isOpen={true} onClose={onCloseMock}>
        <div>Content</div>
      </Drawer>,
    );

    const drawerElement = document.querySelector('[class*="drawer"]');
    expect(drawerElement).toHaveClass('visible');
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
});
