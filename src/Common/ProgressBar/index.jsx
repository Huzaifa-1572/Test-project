import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
// import { useSelector } from 'react-redux';
import { CircularProgressBar } from 'src/Common/ProgressBar/CircularProgressBar';
// import { getScreenProgress } from 'src/Utils/CommonFunctions/helper';


const ProgressBar = () => {
    // const CURRENT_SCREEN = useSelector((state) => state?.screenState);
    // const progress = getScreenProgress(CURRENT_SCREEN);
    return (
        <Paper elevation={0} sx={{ border: '1px solid #f4f4f4', maxWidth: '400px', width: '100%', borderRadius: '7px' }}>
            <Box sx={{
                display: 'flex',
                padding: '10px',
                borderRadius: '8px',
                gap: '16px'
            }}>
                <CircularProgressBar value={34} />
                <Box>
                    <Box sx={{ color: '#e8927c', fontFamily: 'poppins-Medium' }}>Application In Progress.</Box>
                    <Box sx={{ fontFamily: 'poppins-Medium', fontSize: 'clamp(8px,2.8vw,12px)' }} >
                        Your application is in progress. Kindly proceed to complete the necessary steps.
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}
export default ProgressBar;

