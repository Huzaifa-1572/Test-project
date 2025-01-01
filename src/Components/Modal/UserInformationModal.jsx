// import { IoClose as CloseIcon } from "react-icons/io5";
import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import * as React from "react";

// Custom CSS for scrollbar
const scrollbarStyle = `
  /* Style the scrollbar for WebKit-based browsers */
  ::-webkit-scrollbar {
    width: 6px; /* Set the width of the scrollbar */
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* Set the background color of the scrollbar track */
  }

  ::-webkit-scrollbar-thumb {
    background-color: silver; /* Set the color of the scrollbar thumb */
    border-radius: 3px; /* Set the border radius of the scrollbar thumb */
  }
`;

const StyledBox = styled(Box)(scrollbarStyle);

const StyledBoxstyles = {
  color: "#484e53",
  fontWeight: 500,
  marginTop: "-15px",
  fontSize: "12px",
};
const Dialogstyles = {
  textAlign: "center",
  fontWeight: "bolder",
  fontSize: "clamp(12px,3vw,22px)",
  color: "#5093e0",
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    padding: theme.spacing(1),
    position: "absolute",
    top: "30px",
    right: "0px",
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          {/* <CloseIcon /> */} icon ayega
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function UserInformationModal({
  open,
  handleClose,
  title,
  content,
}) {
  const isContentFunction = typeof content === "function";

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <StyledBox sx={{ maxHeight: "400px", overflowY: "auto" }}>
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            <Box sx={Dialogstyles}>{title}</Box>
          </BootstrapDialogTitle>

          <Box sx={{ padding: "20px" }}>
            <Box sx={StyledBoxstyles}>
              {isContentFunction ? content() : content}
            </Box>
          </Box>
        </StyledBox>
      </BootstrapDialog>
    </div>
  );
}
