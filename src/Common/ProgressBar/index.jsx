import { Box, LinearProgress, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import PROGRESSBAR_UNDRAW from 'src/Assets/images/progressUndraw.svg';
import { getScreenProgress } from 'src/Utils/Helpers';

const ProgressBar = () => {
    const CURRENT_SCREEN = useSelector((state) => state?.currentScreenState);
    const progress = getScreenProgress(CURRENT_SCREEN);

    return (
        <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ececec', maxWidth: '400px', width: '100%', borderRadius: '8px', padding: '7px 12px' }}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ marginBottom: '10px', color: '#666666' }}>
                    Application Progress...
                    <span style={{ marginLeft: '7px', color: '#407ec9' }}>{progress.toFixed(0)}%</span>
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        height: '10px',
                        borderRadius: '5px',
                        backgroundColor: '#f0f0f0',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#407ec9',
                        },
                    }}
                />
            </Box>
            <img src={PROGRESSBAR_UNDRAW} height='70px' width='70px' />
        </Paper >
    );
};

export default ProgressBar;
