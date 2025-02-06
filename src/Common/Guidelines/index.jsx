import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { FaCheck } from "react-icons/fa";

const Guidelines = ({ guidelinePoints }) => {

    return (
        <Box>
            <Box sx={{ color: "#407ec9", fontWeight: "bold", fontSize: "16px", marginTop: '30px' }}>
                Guideline
            </Box>

            <List sx={{ margin: "7px 0", color: "#3b3b3b" }}>
                {guidelinePoints?.map((item, index) => (
                    <ListItem key={index} sx={{ padding: "4px 0" }}>
                        <ListItemIcon sx={{ minWidth: "30px" }}>
                            <FaCheck color='#e8927c' />
                        </ListItemIcon>
                        <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                                sx: { fontSize: "clamp(10px, 3vw, 14px)", lineHeight: "10px" },
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Guidelines;
