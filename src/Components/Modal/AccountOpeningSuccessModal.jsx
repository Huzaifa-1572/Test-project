import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import { FiCheckCircle } from "react-icons/fi";

export default function AccountOpeningSuccessModal({ open, handleClose }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "25px",
          }}
        >
          <Box>
            <FiCheckCircle style={{ color: "#5093e0", fontSize: "100px" }} />
          </Box>

          <Box
            sx={{
              textAlign: "center",
              color: "#484e53",
              fontSize: "clamp(12px,4vw,26px)",
              fontWeight: "bold",
            }}
          >
            Application Submitted Successfully!
          </Box>

          <Box
            sx={{
              textAlign: "center",
              color: "#484e53",
              fontSize: "clamp(12px,4vw,26px)",
              fontWeight: "bold",
            }}
          >
            Dear customer, Your tracking id for digital account opening is 1234
          </Box>

          <Box
            sx={{
              fontWeight: "500",
              fontSize: "clamp(10px,3vw,11px)",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            Thank you for applying for a digital account with Cerisma. We have
            received your application and it is now being processed. Our team
            will review your details and get back to you soon.
            <br />
            <br />
            In case of any assistance please call Cerisma helpline 000 000 000
            or email us at digitalaccount@cerisma.pk.
            <br />
            <br />
            We appreciate your interest in opening an account with us and look
            forward to serving you.
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
