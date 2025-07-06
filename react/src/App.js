import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import './App.css';
import { Box, Button, Grid, Paper, Typography, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f5f5f5',
    },
    secondary: {
      main: '#e0e0e0',
    },
    action: {
      disabledBackground: '#c0c0c0',
      disabled: '#808080',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.2rem',
          height: '60px',
          borderRadius: '4px',
          textTransform: 'none',
          boxShadow: '0 2px 2px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            boxShadow: '0 4px 4px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
  },
});

function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);
  const [error, setError] = useState('');

  const handleNumberClick = (value) => {
    if (error) {
      setError('');
      setDisplay('0');
    }

    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      if (value === '.' && display.includes('.')) {
        return;
      }
      setDisplay(display + value);
    }
  };

  const handleOperationClick = (op) => {
    if (error) {
      setError('');
    }

    setPreviousValue(parseFloat(display));
    setOperation(op);
    setWaitingForSecondValue(true);
    setDisplay('0');
  };

  const handleEqualsClick = () => {
    if (!previousValue || !operation) return;

    const currentValue = parseFloat(display);
    let result = 0;

    if (operation === '+') {
      result = previousValue + currentValue;
    } else if (operation === '-') {
      result = previousValue - currentValue;
    } else if (operation === '*') {
      result = previousValue * currentValue;
    } else if (operation === '/') {
      if (currentValue === 0) {
        setError('Cannot divide by zero');
        setDisplay('Error');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForSecondValue(false);
        return;
      }
      result = previousValue / currentValue;
    }

    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  const handleClearClick = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
    setError('');
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', 'C', '+',
    '='
  ];

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            backgroundColor: '#f0f0f0' 
          }}
        >
          <Paper 
            elevation={6} 
            sx={{ 
              width: '320px', 
              backgroundColor: '#f5f5f5', 
              borderRadius: '8px', 
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
            }}
          >
            <Box 
              sx={{ 
                backgroundColor: '#e0e0e0', 
                padding: '20px', 
                textAlign: 'right',
                minHeight: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                borderBottom: '1px solid #ccc'
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  fontFamily: 'Segoe UI', 
                  fontWeight: '400', 
                  color: error ? '#d32f2f' : '#333' 
                }}
              >
                {display}
              </Typography>
            </Box>
            <Grid container spacing={1} sx={{ padding: '16px' }}>
              {buttons.map((btn) => (
                <Grid item xs={3} key={btn}>
                  <Button
                    variant="contained"
                    fullWidth
                    color={['+', '-', '*', '/'].includes(btn) ? 'secondary' : 'primary'}
                    sx={{
                      backgroundColor: btn === '=' ? '#4caf50' : undefined,
                      '&:hover': {
                        backgroundColor: btn === '=' ? '#45a049' : undefined,
                      },
                    }}
                    onClick={() => {
                      if (btn === 'C') handleClearClick();
                      else if (btn === '=') handleEqualsClick();
                      else if (['+', '-', '*', '/'].includes(btn)) handleOperationClick(btn);
                      else handleNumberClick(btn);
                    }}
                  >
                    {btn}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
