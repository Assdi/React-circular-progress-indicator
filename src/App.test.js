import { render, screen } from '@testing-library/react';
import App from './App';

test('renders circular progress component', () => {
  render(<App />);
  const circularProgressElement = screen.getByTestId('circular-progress');
  expect(circularProgressElement).toBeInTheDocument();
});
