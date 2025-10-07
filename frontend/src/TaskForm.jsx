import React, { useState } from 'react';
import axios from 'axios';
import { 
    TextField, 
    Button, 
    Card, 
    CardContent, 
    Typography, 
    Box, 
    Alert,
    CircularProgress,
    Divider,
    useTheme
} from '@mui/material';

// IMPORTANT: Update this to your live Cloud Function URL before final push!
const API_URL = 'http://127.0.0.1:5002/YOUR_PROJECT_ID/us-central1/createTask';

function TaskForm() {
    const theme = useTheme(); 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(null); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        
        try {
            // NOTE: Replace the placeholder with the actual project ID before testing/deployment
            const API_ENDPOINT = API_URL.replace('YOUR_PROJECT_ID', 'cloud-task-tracker-ci-cd'); 
            await axios.post(API_ENDPOINT, { title, description });
            
            setStatus('success');
            setTitle('');
            setDescription('');

        } catch (error) {
            console.error("API Error:", error.response || error);
            setStatus('error');
        }
    };

    return (
        <Card elevation={16} sx={{ 
            minWidth: 450, 
            borderRadius: '16px', 
            backgroundColor: theme.palette.background.paper, 
            transition: 'transform 0.3s, box-shadow 0.3s', 
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[20],
            }
        }}>
            <CardContent sx={{ p: 4 }}> 
                
                <Typography variant="h5" component="div" 
                    sx={{ 
                        fontWeight: 700, 
                        color: theme.palette.primary.main, 
                        mb: 0.5 
                    }}> 
                    New Microservice Task Request
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 3, display: 'block' }}>
                    Triggering the CI/CD-deployed Cloud Function API.
                </Typography>
                
                <Divider sx={{ mb: 3 }} />

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Task Title Input */}
                    <TextField
                        label="Task Title (Required)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        required
                        variant="outlined"
                        size="medium"
                        disabled={status === 'loading'}
                        sx={{ '.MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                    
                    {/* Description Input */}
                    <TextField
                        label="Detailed Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        disabled={status === 'loading'}
                        sx={{ '.MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                    
                    {/* Submit Button with Custom Theme */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        disabled={status === 'loading'}
                        sx={{ 
                            height: 55, 
                            fontWeight: 'bold', 
                            fontSize: '1rem',
                            borderRadius: '10px',
                            transition: 'background-color 0.2s',
                        }}
                    >
                        {status === 'loading' ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Execute Cloud Function (POST)'
                        )}
                    </Button>
                </Box>

                {/* Aesthetic Status Feedback */}
                {status && status !== 'loading' && (
                    <Box sx={{ mt: 3 }}>
                        <Alert severity={status === 'success' ? 'success' : 'error'} variant="filled">
                            {status === 'success' ? 'SUCCESS: Task record created in Firestore.' : 'ERROR: Failed to reach microservice. Check console for details.'}
                        </Alert>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}

export default TaskForm;