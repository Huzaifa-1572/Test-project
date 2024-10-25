import { Box } from '@mui/material'
import React from 'react'

function MutedText({ text, customText, textColor }) {
    return (
        <Box sx={
            { 
            fontSize: '9px', 
            color: textColor ? textColor : 'gray', 
            marginTop: '3px' }
            }>
            {
                customText ? customText : `Please Select ${text} To Enable this Field`
            }
        </Box>
    )
}

export default MutedText