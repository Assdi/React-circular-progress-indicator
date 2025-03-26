import React from 'react';
import { CircularProgressWrapper } from './styles';

const CircularProgress = ({ percentage = 0, color = '#007AFF' }) => {
  return (
    <CircularProgressWrapper data-testid="circular-progress">
      <svg width="100" height="100">
        <circle
          data-testid="progress-circle" // Make sure this matches the test
          stroke={color}
          strokeWidth="10"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <text x="50" y="50" textAnchor="middle" dy=".3em">
          {percentage}%
        </text>
      </svg>
    </CircularProgressWrapper>
  );
};

export default CircularProgress;