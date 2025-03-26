import React from 'react';
import { ThemeProvider } from 'styled-components';
import { CircularProgressWrapper, ProgressText, ProgressCircle } from './styles';
import { defaultTheme } from './theme';

const CircularProgress = ({ 
  percentage = 0,
  color,
  backgroundColor,
  textColor,
  size = 'medium',
  strokeWidth = 'regular',
  bold = false,
  theme = defaultTheme
}) => {
  const getSize = () => {
    return typeof size === 'number' ? size : theme.sizes[size];
  };

  const getStrokeWidth = () => {
    return typeof strokeWidth === 'number' ? strokeWidth : theme.strokeWidths[strokeWidth];
  };

  const actualSize = getSize();
  const actualStrokeWidth = getStrokeWidth();
  const radius = (actualSize - actualStrokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <ThemeProvider theme={theme}>
      <CircularProgressWrapper data-testid="circular-progress">
        <svg width={actualSize} height={actualSize}>
          <circle
            stroke={backgroundColor || theme.colors.background}
            strokeWidth={actualStrokeWidth}
            fill="transparent"
            r={radius}
            cx={actualSize / 2}
            cy={actualSize / 2}
          />
          <ProgressCircle
            data-testid="progress-circle"
            stroke={color || theme.colors.primary}
            strokeWidth={actualStrokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx={actualSize / 2}
            cy={actualSize / 2}
          />
          <ProgressText
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            fontSize={`${actualSize / 4}px`}
            textColor={textColor}
            bold={bold}
          >
            {percentage}%
          </ProgressText>
        </svg>
      </CircularProgressWrapper>
    </ThemeProvider>
  );
};

export default CircularProgress;