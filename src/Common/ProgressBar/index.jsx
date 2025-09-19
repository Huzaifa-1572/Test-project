import { Box, LinearProgress, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import PROGRESSBAR_UNDRAW from 'src/Assets/images/progressUndraw.svg';
import { getScreenProgress } from 'src/Utils/Helpers';
import { SCREENS_FOR_PROGRESS_BAR } from 'src/Pages/CustomerOnboarding';

const ProgressBar = () => {
    const CURRENT_SCREEN = useSelector((state) => state?.currentScreenState);
    const progress = getScreenProgress(CURRENT_SCREEN);

    // Calculate step numbers
    const currentStepIndex = SCREENS_FOR_PROGRESS_BAR.indexOf(CURRENT_SCREEN);
    const currentStep = currentStepIndex === -1 ? 1 : currentStepIndex + 1;
    const totalSteps = SCREENS_FOR_PROGRESS_BAR.length;

    return (
        <>
            {/* FOR LARGE SCREENS */}
            <Paper elevation={0} sx={{ background: '#dceeff', display: { xs: 'none', sm: 'flex' }, alignItems: 'center', maxWidth: '400px', width: '100%', borderRadius: '5px', padding: '12px' }}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ fontWeight: 'bold', marginBottom: '10px', color: '#407ec9', fontSize: 'clamp(12px,2.5vw,14px)' }}>
                        Application Progress...
                        <strong style={{ marginLeft: '7px', color: '#407ec9' }}>{currentStep}/{totalSteps}</strong>
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
                <Box sx={{ fontWeight: 600, marginBottom: '10px', color: '#407ec9', fontSize: 'clamp(12px,2.5vw,14px)', textAlign: 'right' }}>
                    Step
                    <strong style={{ wordSpacing: '2px', marginLeft: '7px', color: '#3b3b3b', fontSize: 'clamp(15px,2.5vw,14px)' }}>{currentStep}/{totalSteps}</strong>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        height: '10px',
                        backgroundColor: '#dceeff',
                        borderRadius: '5px',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            width: `${progress}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #2c74bb 0%, #ed2227 100%)',
                            borderRadius: '5px',
                            transition: 'width 0.3s ease',
                        }}
                    />
                </Box>
            </Box>
        </>

    );
};

export default ProgressBar;
