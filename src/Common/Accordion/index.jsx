import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionDetails, { accordionDetailsClasses } from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { MdExpandMore } from "react-icons/md";

export default function AccordionTransition({ summary, detail, isFirstItem = false }) {
    const [expanded, setExpanded] = React.useState(isFirstItem);

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    // Function to render the detail content
    const renderDetail = () => {
        if (typeof detail === 'function') {
            return detail();
        }
        return detail;
    };

    return (
        <Accordion
            expanded={expanded}
            onChange={handleExpansion}
            slots={{ transition: Fade }}
            slotProps={{ transition: { timeout: 400 } }}
            sx={[
                expanded
                    ? {
                        [`& .${accordionClasses.region}`]: {
                            height: 'auto',
                        },
                        [`& .${accordionDetailsClasses.root}`]: {
                            display: 'block',
                        },
                    }
                    : {
                        [`& .${accordionClasses.region}`]: {
                            height: 0,
                        },
                        [`& .${accordionDetailsClasses.root}`]: {
                            display: 'none',
                        },
                    },
                {
                    boxShadow: 'none',
                    // margin: '2px 0px',
                    '&::before': {
                        display: 'none',
                    },
                }
            ]}
        >
            <AccordionSummary
                expandIcon={<MdExpandMore color='#2C74BB' size={20} />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
                    background: '#f6f6f6',
                    borderRadius: '5px',
                    padding: '5px 10px',
                    color: '#2C74BB',
                }}
            >
                <Typography sx={{ fontSize: '15px' }} component="span"> {summary}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: '#707070', padding: '10px' }} >
                <Typography>
                    {renderDetail()}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}