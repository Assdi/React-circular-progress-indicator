import React, { useState, useEffect } from 'react';
import CircularProgress from './components/CircularProgress/CircularProgress';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './components/CircularProgress/theme';
import './App.css';

function App() {
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [multiRingProgress, setMultiRingProgress] = useState([
    { percentage: 0, color: '#007AFF' },
    { percentage: 0, color: '#FF9500' },
    { percentage: 0, color: '#4CD964' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress1(prev => (prev >= 100 ? 0 : prev + 10));
      setProgress2(prev => (prev >= 100 ? 0 : prev + 5));
      setMultiRingProgress(prev => prev.map((ring, index) => ({
        ...ring,
        percentage: ring.percentage >= 100 ? 0 : ring.percentage + (3 * (index + 1))
      })));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
        <header className="App-header">
          <h2>Basic Progress Rings</h2>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
            <CircularProgress 
              percentage={progress1}
              color="#007AFF"
              animationDuration={0.5}
              size={100}
            />
            <CircularProgress 
              percentage={progress2}
              color="#FF9500"
              animationDuration={0.8}
              size={100}
            />
          </div>

          <h2>Multi-Ring Progress</h2>
          <div style={{ marginBottom: '40px' }}>
            <CircularProgress 
              multiRing
              rings={multiRingProgress}
              size={150}
              strokeWidth={8}
              animationDuration={0.5}
            />
          </div>

          <h2>Responsive Rings</h2>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
            <CircularProgress 
              percentage={75}
              color="#4CD964"
              responsive
              mobileOptimized
              size={120}
            />
            <CircularProgress 
              percentage={90}
              color="#5856D6"
              responsive
              mobileOptimized
              size="large"
              bold
            />
          </div>

          <h2>Different Sizes & Styles</h2>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <CircularProgress 
              percentage={60}
              size="small"
              color="#FF2D55"
            />
            <CircularProgress 
              percentage={80}
              size="medium"
              color="#5856D6"
              bold
              backgroundColor="#E5E5EA"
            />
            <CircularProgress 
              percentage={95}
              size="large"
              color="#007AFF"
              strokeWidth={15}
            />
          </div>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
