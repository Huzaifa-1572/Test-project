import * as React from 'react';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails, {
    accordionDetailsClasses,
} from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { MdExpandMore } from "react-icons/md";
import Fade from '@mui/material/Fade';

export default function AccordionTransition() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    return (
        <div>
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
                        // Remove Paper background and elevation
                        boxShadow: 'none',
                        background: 'none',
                    },
                ]}
            >
                <AccordionSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ background: '#e8927c', color: 'white', padding: '10px', borderRadius: '7px', margin: '20px 0px' }}
                >
                    <Typography component="span"> Lorem ipsum dolor sit amet</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>

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
                        // Remove Paper background and elevation
                        boxShadow: 'none',
                        background: 'none',
                    },
                ]}
            >
                <AccordionSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ background: '#e8927c', color: 'white', padding: '10px', borderRadius: '7px', margin: '20px 0px' }}
                >
                    <Typography component="span"> Lorem ipsum dolor sit amet</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion
                sx={{
                    // Remove Paper background and elevation
                    boxShadow: 'none',
                    background: 'none',
                }}
            >
                <AccordionSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography component="span"> Lorem ipsum dolor sit amet</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div >
    );
}