import { Box, LinearProgress, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import PROGRESSBAR_UNDRAW from 'src/Assets/images/progressUndraw.svg';
import { getScreenProgress } from 'src/Utils/Helpers';

const ProgressBar = () => {
    const CURRENT_SCREEN = useSelector((state) => state?.currentScreenState);
    const progress = getScreenProgress(CURRENT_SCREEN);

    return (
        <>
            {/* FOR LARGE SCREENS */}
            <Paper elevation={0} sx={{ background: '#dceeff', display: { xs: 'none', sm: 'flex' }, alignItems: 'center', maxWidth: '400px', width: '100%', borderRadius: '5px', padding: '12px' }}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ fontWeight: 'bold', marginBottom: '10px', color: '#407ec9', fontSize: 'clamp(12px,2.5vw,14px)' }}>
                        Application Progress...
                        <strong style={{ marginLeft: '7px', color: '#407ec9' }}>{progress.toFixed(0)}%</strong>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                            height: '10px',
                            borderRadius: '5px',
                            backgroundColor: 'white',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: '#407ec9',
                            },
                        }}
                    />
                </Box>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <img src={PROGRESSBAR_UNDRAW} height='50px' width='70px' />
                </Box>
            </Paper >

            {/* FOR SMALL SCREENS */}
            <Box sx={{ display: { xs: 'block', sm: 'none' }, width: '95%' }}>
                <Box sx={{ fontWeight: 'bold', marginBottom: '10px', color: '#407ec9', fontSize: 'clamp(12px,2.5vw,14px)' }}>
                    Application Progress...
                    <strong style={{ marginLeft: '7px', color: '#407ec9' }}>{progress.toFixed(0)}%</strong>
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        height: '10px',
                        borderRadius: '5px',
                        backgroundColor: '#dceeff',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#407ec9',
                        },
                    }}
                />
            </Box>
        </>

    );
};

export default ProgressBar;
