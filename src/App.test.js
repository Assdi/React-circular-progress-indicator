import { render, screen } from '@testing-library/react';
import App from './App';

test('renders circular progress components', () => {
  render(<App />);
  const circularProgressElements = screen.getAllByTestId('circular-progress');
  expect(circularProgressElements.length).toBe(2); // We expect 2 progress rings
  expect(circularProgressElements[0]).toBeInTheDocument();
  expect(circularProgressElements[1]).toBeInTheDocument();
});
