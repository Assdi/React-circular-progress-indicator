import React, { useEffect, useState, useCallback } from 'react';
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
  theme = defaultTheme,
  responsive = false,
  mobileOptimized = false,
  multiRing = false,
  rings = [],
  zIndex = 1
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [viewportSize, setViewportSize] = useState(window.innerWidth);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setCurrentPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const handleResize = useCallback(() => {
    setViewportSize(window.innerWidth);
  }, []);

  useEffect(() => {
    if (responsive) {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [responsive, handleResize]);

  const getResponsiveSize = () => {
    if (!responsive) return getSize();
    const baseSize = getSize();
    if (viewportSize < 768) {
      return Math.min(baseSize * 0.8, viewportSize * 0.8);
    }
    return Math.min(baseSize, viewportSize * 0.6);
  };

  const getSize = () => {
    if (typeof size === 'string' && theme.sizes[size]) {
      return theme.sizes[size];
    }
    return size;
  };

  const actualSize = getResponsiveSize();
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
    transition: `opacity ${animationDuration}s ease-in-out, transform ${animationDuration}s ease-in-out`,
    padding: mobileOptimized ? '10px' : '0',
    zIndex,
    ...(responsive && {
      width: `min(${actualSize}px, ${viewportSize < 768 ? '80vw' : '60vw'})`,
      height: `min(${actualSize}px, ${viewportSize < 768 ? '80vw' : '60vw'})`
    })
  };

  const renderRings = () => {
    if (!multiRing) {
      return (
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
      );
    }

    return rings.map((ring, index) => (
      <circle
        key={index}
        data-testid="progress-circle"
        stroke={ring.color || color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference - (ring.percentage / 100) * circumference}
        strokeLinecap="round"
        fill="transparent"
        r={radius - (index * strokeWidth)}
        cx={actualSize / 2}
        cy={actualSize / 2}
        style={{
          ...progressStyle,
          transform: `rotate(-90deg) scale(${1 - (index * 0.2)})`,
          zIndex: zIndex + index
        }}
      />
    ));
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
        {renderRings()}
        <text 
          data-testid="progress-text"
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize={`${actualSize / 4}px`}
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