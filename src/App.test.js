import { render, screen, act } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders circular progress components', () => {
    render(<App />);
    const circularProgressElements = screen.getAllByTestId('circular-progress');
    expect(circularProgressElements.length).toBe(2);
    expect(circularProgressElements[0]).toBeInTheDocument();
    expect(circularProgressElements[1]).toBeInTheDocument();
  });

  test('updates progress values over time', () => {
    render(<App />);
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const progressTexts = screen.getAllByTestId('progress-text');
    expect(progressTexts[0]).toHaveTextContent('10%');
    expect(progressTexts[1]).toHaveTextContent('5%');
  });

  test('resets progress when reaching 100%', () => {
    render(<App />);
    
    // Advance time to reach over 100%
    act(() => {
      jest.advanceTimersByTime(11000);
    });

    const progressTexts = screen.getAllByTestId('progress-text');
    expect(progressTexts[0]).toHaveTextContent('0%');
  });

  test('cleans up interval on unmount', () => {
    const { unmount } = render(<App />);
    unmount();
    // Ensure no memory leaks
    expect(jest.getTimerCount()).toBe(0);
  });
});
