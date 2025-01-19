import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { IoMdClose } from "react-icons/io";
import { Skeleton } from "@mui/material";



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
        <>
            <BootstrapDialog
                onClose={handleDailogClose}
                aria-labelledby="customized-dialog-title"
                open={openDailog}
            >
                <DialogTitle sx={{ m: 0, p: 2, fontSize: "clamp(12px,3vw,25px)", color: '#666666', textTransform: 'capitalize' }} id="customized-dialog-title">
                    {`${title} Preview`}
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
                    <IoMdClose />
                </IconButton>
                <DialogContent>
                    {
                        !documentImg ?
                            <Skeleton variant="rectangular" sx={{ maxHeight: '500px', height: 'auto', maxWidth: '550px', width: "100%" }} />
                            :
                            <img style={{ maxHeight: '500px', height: 'auto', maxWidth: '550px', width: "100%" }} src={documentImg} alt='image' />
                    }
                </DialogContent>
            </BootstrapDialog>
        </>
    );
}
