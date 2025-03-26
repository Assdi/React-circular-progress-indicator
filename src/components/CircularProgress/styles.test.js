import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { CircularProgressWrapper } from './styles';
import { defaultTheme } from './theme';

describe('Styled Components', () => {
  it('renders CircularProgressWrapper with correct styles', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <CircularProgressWrapper />
      </ThemeProvider>
    );
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    });
  });

  it('renders CircularProgressWrapper with custom styles', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <CircularProgressWrapper style={{ backgroundColor: 'red' }} />
      </ThemeProvider>
    );
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveStyle({
      backgroundColor: 'red'
    });
  });
});