import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CircularProgress from './CircularProgress';

describe('CircularProgress', () => {
  it('renders without crashing', () => {
    render(<CircularProgress />);
    expect(screen.getByTestId('circular-progress')).toBeInTheDocument();
  });

  it('renders with correct default styles', () => {
    render(<CircularProgress />);
    const wrapper = screen.getByTestId('circular-progress');
    expect(wrapper).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    });
  });

  it('renders with custom percentage', () => {
    render(<CircularProgress percentage={75} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('renders with custom color', () => {
    const customColor = '#ff0000';
    render(<CircularProgress color={customColor} />);
    const circle = screen.getByTestId('progress-circle');
    expect(circle).toHaveAttribute('stroke', customColor);
  });
});