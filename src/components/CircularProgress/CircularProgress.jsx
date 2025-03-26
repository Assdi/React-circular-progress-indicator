import React from 'react';
import { CircularProgressWrapper } from './styles';

const CircularProgress = ({ 
  percentage = 0, 
  color = '#007AFF',
  size = 100,
  strokeWidth = 10 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <CircularProgressWrapper data-testid="circular-progress">
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          data-testid="progress-circle"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            transition: 'stroke-dashoffset 0.3s ease'
          }}
        />
        <text 
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize={`${size / 4}px`}
        >
          {percentage}%
        </text>
      </svg>
    </CircularProgressWrapper>
  );
};

export default CircularProgress;