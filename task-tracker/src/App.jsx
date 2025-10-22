import React, { useState, useEffect } from 'react';
import { getTasks, addTask, deleteTask } from './firebaseConfig';
import { 
    Typography, 
    ThemeProvider, 
    createTheme, 
    CssBaseline, 
    Container,
    Box,
    Paper,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// 1. YOUR CUSTOM THEME
const customTheme = createTheme({
  palette: {
    mode: 'light', 
    primary: {
      main: '#13294B', // Deep Navy Blue
    },
    secondary: {
      main: '#00BFFF', // A bright accent color
    },
    background: {
      default: '#F7F9FC', // Light, clean background
      paper: '#FFFFFF', 
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
    h3: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
      color: '#13294B',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', 
          textTransform: 'none',
          padding: '10px 20px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px', 
        }
      }
    }
  },
});

function App() {
  // 2. OUR TASK TRACKER STATE AND LOGIC
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks on load
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getTasks();
        setTasks(result.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks. Please try again.");
      }
      setLoading(false);
    };
    fetchTasks();
  }, []);

  // Add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    
    // --- DEBUG LOG ---
    // See what the 'newTask' state is right before submitting
    console.log("Submitting task with text:", newTask);
    // -----------------

    if (newTask.trim() === '') return;

    try {
      const result = await addTask({ text: newTask });
      const addedTask = { 
        id: result.data.id, 
        text: newTask, 
        completed: false 
      };
      setTasks(prevTasks => [addedTask, ...prevTasks]);
      setNewTask('');
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Failed to add task.");
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask({ id: id });
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task.");
    }
  };


  // 3. MERGED JSX
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline /> 
      
      <Box 
        sx={{ 
          minHeight: '100vh', 
          width: '100vw', 
          py: 6, 
          backgroundColor: customTheme.palette.background.default, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}
      >
        {/* Aesthetic Header */}
        <Typography variant="h3" component="h1" gutterBottom 
          sx={{ 
              mb: 4, 
              fontWeight: '900', 
              color: 'primary.main',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
          CI/CD Cloud Microservice Dashboard
        </Typography>

        {/* Content Container (holds our two cards) */}
        <Container maxWidth="md">
          
          {/* ---- CARD 1: ADD TASK FORM ---- */}
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Add New Task
            </Typography>
            <Box 
              component="form" 
              onSubmit={handleAddTask} 
              sx={{ 
                display: 'flex', 
                gap: 2 
              }}
            >
              <TextField
                label="New Task Description"
                variant="outlined"
                fullWidth
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="contained" 
                endIcon={<AddIcon />}
                sx={{ whiteSpace: 'nowrap' }}
              >
                Add Task
              </Button>
            </Box>
          </Paper>

          {/* ---- CARD 2: TASK LIST ---- */}
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
              Current Tasks
            </Typography>

            {error && (
              <Typography color="error" align="center" gutterBottom>
                {error}
              </Typography>
            )}

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <List sx={{ maxHeight: '50vh', overflow: 'auto' }}>
                {tasks.map((task) => (
                  <Paper
                    key={task.id}
                    component={ListItem}
                    elevation={1}
                    sx={{
                      mb: 1.5,
                      borderRadius: 1.5,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <ListItemText 
                      primary={task.text} 
                      sx={{ wordBreak: 'break-word', mr: 2 }}
                    />
                    <IconButton 
                      edge="end" 
                      aria-label="delete" 
                      onClick={() => handleDeleteTask(task.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Paper>
                ))}
              </List>
            )}
          </Paper>

        </Container>
        
      </Box>
    </ThemeProvider>
  );
}

export default App;