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

  it('calculates stroke-dashoffset correctly', () => {
    const percentage = 50;
    render(<CircularProgress percentage={percentage} size={100} strokeWidth={10} />);
    const circle = screen.getByTestId('progress-circle');
    const radius = 45; // (100 - 10) / 2
    const circumference = radius * 2 * Math.PI;
    const expectedOffset = circumference - (percentage / 100) * circumference;
    
    expect(circle).toHaveAttribute('stroke-dashoffset', expectedOffset.toString());
  });

  it('renders with custom size', () => {
    const size = 200;
    render(<CircularProgress size={size} />);
    const svg = screen.getByTestId('circular-progress').querySelector('svg');
    expect(svg).toHaveAttribute('width', size.toString());
    expect(svg).toHaveAttribute('height', size.toString());
  });
});