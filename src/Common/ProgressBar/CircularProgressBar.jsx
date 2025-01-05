import React from 'react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export const CircularProgressBar = ({ value }) => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
        }}>
            <CircularProgress
                variant="determinate"
                sx={{ color: '#F4F4F4' }}
                size={60}
                thickness={3}
                value={100}
            />
            <CircularProgress
                variant="determinate"
                sx={{
                    color: '#e8927c',
                    position: 'absolute',
                    left: 0,
                }}
                size={60}
                thickness={3}
                value={value}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{ color: '#5b5b5b', fontFamily: 'poppins-Medium' }}
                >
                    {`${value}%`}
                </Typography>
            </Box>
        </Box>
    );
}