import React, { useEffect, useState } from 'react';
import { CircularProgressWrapper } from './styles';
import { defaultTheme } from './theme';

const CircularProgress = ({ 
  percentage = 0, 
  color = '#007AFF',
  size = 100,
  strokeWidth = 10,
  animationDuration = 0.3,
  backgroundColor,
  bold = false,
  theme = defaultTheme
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setCurrentPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  // Handle theme-based sizing
  const getSize = () => {
    if (typeof size === 'string' && theme.sizes[size]) {
      return theme.sizes[size];
    }
    return size;
  };

  const actualSize = getSize();
  const radius = (actualSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (currentPercentage / 100) * circumference;

  const progressStyle = {
    transform: 'rotate(-90deg)',
    transformOrigin: '50% 50%',
    transition: `stroke-dashoffset ${animationDuration}s ease-in-out`
  };

  const containerStyle = {
    opacity: isVisible ? 1 : 0,
    transform: `scale(${isVisible ? 1 : 0.8})`,
    transition: `opacity ${animationDuration}s ease-in-out, transform ${animationDuration}s ease-in-out`
  };

  return (
    <CircularProgressWrapper data-testid="circular-progress" style={containerStyle}>
      <svg width={actualSize} height={actualSize}>
        <circle
          data-testid="background-circle"
          stroke={backgroundColor || theme.colors.background}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={actualSize / 2}
          cy={actualSize / 2}
        />
        <circle
          data-testid="progress-circle"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={actualSize / 2}
          cy={actualSize / 2}
          style={progressStyle}
        />
        <text 
          data-testid="progress-text"
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize={`${size / 4}px`}
          fontWeight={bold ? '600' : '400'}
          style={{
            transition: `opacity ${animationDuration}s ease-in-out`
          }}
        >
          {Math.round(percentage)}%
        </text>
      </svg>
    </CircularProgressWrapper>
  );
};

export default CircularProgress;