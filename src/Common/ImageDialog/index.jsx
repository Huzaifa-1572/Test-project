import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from 'src/Assets/images/closeicon.png'
import FallBack from 'src/Assets/images/fallback.webp'
import { styled } from "@mui/material/styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function ImageDailog({ openDailog, handleDailogClose, title, documentImg }) {

    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleDailogClose}
                aria-labelledby="customized-dialog-title"
                open={openDailog}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {title}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleDailogClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <img height={'30px'} src={CloseIcon} alt='Close Icon' />
                </IconButton>
                <DialogContent>
                    <img style={{ maxHeight: '500px', height: 'auto', width: "400px" }} src={documentImg || FallBack} alt='image' />
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
}
