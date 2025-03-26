import React, { useState, useEffect } from 'react';
import CircularProgress from './components/CircularProgress/CircularProgress';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './components/CircularProgress/theme';
import './App.css';

function App() {
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress1(prev => (prev >= 100 ? 0 : prev + 10));
      setProgress2(prev => (prev >= 100 ? 0 : prev + 5));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
        <header className="App-header">
          <div style={{ display: 'flex', gap: '20px' }}>
            <CircularProgress 
              percentage={progress1}
              color="#007AFF"
              animationDuration={0.5}
            />
            <CircularProgress 
              percentage={progress2}
              color="#FF9500"
              animationDuration={0.8}
            />
          </div>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
