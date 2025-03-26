import styled, { css } from 'styled-components';

export const CircularProgressWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const ProgressText = styled.text`
  font-weight: ${props => props.bold ? '600' : '400'};
  fill: ${props => props.textColor || props.theme.colors.text};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

export const ProgressCircle = styled.circle`
  transition: stroke-dashoffset 0.3s ease;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
`;