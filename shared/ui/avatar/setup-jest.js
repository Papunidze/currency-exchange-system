// This file will be run before running tests
import '@testing-library/jest-dom';

// Add custom matchers if needed in the future
// For example:
// expect.extend({
//   customMatcher(received, expected) {
//     // ...
//   }
// });

// Mock window methods that might not exist in the test environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
