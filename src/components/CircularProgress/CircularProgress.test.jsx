/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CircularProgress from './CircularProgress';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './theme';

// Wrapper component to provide theme
const renderWithTheme = (ui) => {
  return render(
    <ThemeProvider theme={defaultTheme}>
      {ui}
    </ThemeProvider>
  );
};

describe('CircularProgress', () => {
  it('renders without crashing', () => {
    renderWithTheme(<CircularProgress />);
    expect(screen.getByTestId('circular-progress')).toBeInTheDocument();
  });

  it('renders with correct default styles', () => {
    renderWithTheme(<CircularProgress />);
    const wrapper = screen.getByTestId('circular-progress');
    expect(wrapper).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    });
  });

  it('renders with custom percentage', () => {
    renderWithTheme(<CircularProgress percentage={75} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('renders with custom color', () => {
    renderWithTheme(<CircularProgress color="#ff0000" />);
    const circle = screen.getByTestId('progress-circle');
    expect(circle).toHaveAttribute('stroke', '#ff0000');
  });

  it('calculates stroke-dashoffset correctly', async () => {
    renderWithTheme(<CircularProgress percentage={50} size={100} strokeWidth={10} />);
    const circle = screen.getByTestId('progress-circle');
    const radius = 45; // (100 - 10) / 2
    const circumference = radius * 2 * Math.PI;
    const expectedOffset = circumference - (50 / 100) * circumference;
    
    // Wait for the animation to complete
    await new Promise(resolve => setTimeout(resolve, 150));
    
    expect(circle).toHaveAttribute('stroke-dashoffset', expectedOffset.toString());
  });

  it('renders with custom size', () => {
    renderWithTheme(<CircularProgress size={200} />);
    const svg = screen.getByTestId('circular-progress').querySelector('svg');
    expect(svg).toHaveAttribute('width', '200');
    expect(svg).toHaveAttribute('height', '200');
  });

  it('applies theme-based sizing', () => {
    renderWithTheme(<CircularProgress size="large" />);
    const svg = screen.getByTestId('circular-progress').querySelector('svg');
    expect(svg).toHaveAttribute('width', '150');
    expect(svg).toHaveAttribute('height', '150');
  });

  it('applies custom background color', () => {
    const backgroundColor = '#cccccc';
    renderWithTheme(<CircularProgress backgroundColor={backgroundColor} />);
    const backgroundCircle = screen.getByTestId('background-circle');
    expect(backgroundCircle).toHaveAttribute('stroke', backgroundColor);
  });

  it('renders bold text when specified', () => {
    renderWithTheme(<CircularProgress percentage={50} bold />);
    const text = screen.getByTestId('progress-text');
    expect(text).toHaveAttribute('font-weight', '600');
  });

  it('applies animation duration from props', () => {
    renderWithTheme(<CircularProgress animationDuration={0.5} />);
    const circle = screen.getByTestId('progress-circle');
    expect(circle).toHaveStyle({
      transition: 'stroke-dashoffset 0.5s ease-in-out'
    });
  });

  it('animates on mount', () => {
    renderWithTheme(<CircularProgress percentage={50} />);
    const wrapper = screen.getByTestId('circular-progress');
    expect(wrapper).toHaveStyle({
      opacity: '1',
      transform: 'scale(1)'
    });
  });
});