import React from 'react';
import TaskForm from './TaskForm';
import { 
    Typography, 
    ThemeProvider, 
    createTheme, 
    CssBaseline, 
    Container,
    Box
} from '@mui/material';

// Define a custom theme for a premium, enterprise-grade feel
const customTheme = createTheme({
  palette: {
    mode: 'light', 
    primary: {
      main: '#13294B', // Deep Navy Blue (Professional/ServiceNow aesthetic)
    },
    secondary: {
      main: '#00BFFF', 
    },
    background: {
      default: '#F7F9FC', 
      paper: '#FFFFFF', 
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
    h3: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', 
          textTransform: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline /> 
      
      <Box 
        sx={{ 
          minHeight: '100vh', 
          width: '100vw', 
          padding: '50px 20px', 
          backgroundColor: customTheme.palette.background.default, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}
      >
        {/* Aesthetic Header */}
        <Typography variant="h3" component="h1" gutterBottom 
          sx={{ 
              mb: 6, 
              fontWeight: '900', 
              color: 'primary.main',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
          CI/CD Cloud Microservice Dashboard
        </Typography>

        {/* TaskForm: Rendered inside a small MUI Container for perfect centering */}
        <Container maxWidth="sm" sx={{ mt: 2 }}>
            <TaskForm />
        </Container>
        
      </Box>
    </ThemeProvider>
  );
}

export default App;