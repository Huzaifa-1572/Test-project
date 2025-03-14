import * as React from 'react';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails, {
    accordionDetailsClasses,
} from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import { MdExpandMore } from "react-icons/md";


export default function AccordionTransition() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    return (
        <>
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
                        margin: '20px 0px',
                    }
                ]}
            >
                <AccordionSummary
                    expandIcon={<MdExpandMore color='white' size={30} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ background: '#e8927c', borderRadius: '3px', padding: '7px 10px', color: 'white' }}
                >
                    <Typography sx={{ fontSize: '17px' }} component="span">Custom transition using Fade</Typography>
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
                        boxShadow: 'none',
                        margin: '20px 0px',
                    }
                ]}
            >
                <AccordionSummary
                    expandIcon={<MdExpandMore color='white' size={30} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ background: '#e8927c', borderRadius: '3px', padding: '7px 10px', color: 'white' }}
                >
                    <Typography sx={{ fontSize: '17px' }} component="span">Custom transition using Fade</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    );
}
