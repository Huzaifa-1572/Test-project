import { Box, LinearProgress, Typography, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { getScreenProgress } from 'src/Utils/Helpers';

const ProgressBar = () => {
    const CURRENT_SCREEN = useSelector((state) => state?.currentScreenState);
    const progress = getScreenProgress(CURRENT_SCREEN);

    return (
        <Paper elevation={0} sx={{ border: '2px solid #f4f4f4', maxWidth: '400px', width: '100%', borderRadius: '7px', padding: '16px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Typography variant="body1" sx={{ fontFamily: 'Poppins-Medium', color: '#e8927c' }}>
                    Application Progress
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        height: '10px',
                        borderRadius: '5px',
                        backgroundColor: '#f0f0f0',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#e8927c',
                        },
                    }}
                />
                <Typography
                    variant="body2"
                    sx={{
                        fontFamily: 'Poppins-Regular',
                        color: '#555',
                        textAlign: 'right',
                    }}
                >
                    {progress.toFixed(0)}%
                </Typography>
            </Box>
        </Paper>
    );
};

export default ProgressBar;
