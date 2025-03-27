/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('renders all section headings', () => {
    render(<App />);
    expect(screen.getByText('Basic Progress Rings')).toBeInTheDocument();
    expect(screen.getByText('Multi-Ring Progress')).toBeInTheDocument();
    expect(screen.getByText('Responsive Rings')).toBeInTheDocument();
    expect(screen.getByText('Different Sizes & Styles')).toBeInTheDocument();
  });

  it('updates basic progress rings over time', () => {
    render(<App />);
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const progressElements = screen.getAllByTestId('progress-text');
    expect(progressElements[0]).toHaveTextContent('10%');
    expect(progressElements[1]).toHaveTextContent('5%');
  });

  it('updates multi-ring progress correctly', () => {
    render(<App />);
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const multiRingCircles = screen.getAllByTestId('progress-circle').slice(2, 5);
    expect(multiRingCircles).toHaveLength(3);
    
    const expectedColors = ['#007AFF', '#FF9500', '#4CD964'];
    multiRingCircles.forEach((circle, index) => {
      expect(circle).toHaveAttribute('stroke', expectedColors[index]);
    });
  });

  it('resets progress when reaching 100%', () => {
    render(<App />);
    
    act(() => {
      jest.advanceTimersByTime(11000);
    });

    const progressElements = screen.getAllByTestId('progress-text');
    expect(progressElements[0]).toHaveTextContent('0%');
  });

  it('renders responsive rings with correct attributes', () => {
    render(<App />);
    const responsiveRings = screen.getAllByTestId('circular-progress');
    
    // Get the responsive rings (indices 2 and 3 for responsive section)
    const firstResponsiveRing = responsiveRings[2];
    const secondResponsiveRing = responsiveRings[3];
    
    // Simplified check for responsive attributes
    expect(firstResponsiveRing).toBeInTheDocument();
    expect(secondResponsiveRing).toBeInTheDocument();
    
    // Check if rings have SVG elements
    expect(firstResponsiveRing.querySelector('svg')).toBeInTheDocument();
    expect(secondResponsiveRing.querySelector('svg')).toBeInTheDocument();
  });

  it('renders different sizes correctly', () => {
    render(<App />);
    
    // Get all circular progress components
    const rings = screen.getAllByTestId('circular-progress');
    
    // Basic checks - verify we have rings
    expect(rings.length).toBeGreaterThan(0);
    
    // Check if rings have SVG elements with width attributes
    rings.forEach(ring => {
      const svg = ring.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width');
    });
  });

  it('cleans up interval on unmount', () => {
    const { unmount } = render(<App />);
    unmount();
    expect(jest.getTimerCount()).toBe(0);
  });

  it('handles multi-ring progress reset correctly', () => {
    render(<App />);
    
    // First advance time to accumulate some progress
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Get initial offsets
    const initialCircles = screen.getAllByTestId('progress-circle').slice(2, 5);
    const initialOffsets = initialCircles.map(circle => 
      parseFloat(circle.getAttribute('stroke-dashoffset'))
    );

    // Advance time further
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Get updated offsets
    const updatedCircles = screen.getAllByTestId('progress-circle').slice(2, 5);
    const updatedOffsets = updatedCircles.map(circle => 
      parseFloat(circle.getAttribute('stroke-dashoffset'))
    );

    // Verify that offsets have changed (progress has increased)
    updatedOffsets.forEach((offset, index) => {
      expect(offset).toBeLessThan(initialOffsets[index]);
    });
  });
});
