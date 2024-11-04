import { IoMenu as MenuIcon } from "react-icons/io5";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import VideoFile from "src/Assets/videos/customerjourney.mp4";
import UserInformationModal from "src/Components/Modal/UserInformationModal";
import { headerModalData } from "./headerModalData";
import Logo from "src/Assets/images/Logo.png";
import styles from "./index.module.scss";

const drawerWidth = 240;
const navItems = [
  { id: "1", value: "Contact us" },
  { id: "2", value: "FAQs" },
  { id: "3", value: "Eligibility Criteria" },
  { id: "4", value: "Customer Journey" },
];

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userInfoModal, setuserInfoModal] = useState(false);
  const [userInfoModalData, setuserInfoModalData] = useState({});
  const [openCustJourney, seopenCustJourney] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleModalopen = (id) => {
    if (id === "4") {
      seopenCustJourney(true);
    } else {
      setuserInfoModalData(headerModalData[id]);
      setuserInfoModal(true);
    }
  };

  const handleModalClose = () => {
    setuserInfoModal(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleCustomerJourneyClose = () => {
    seopenCustJourney(false);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box className={styles.drawer}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <h1
            style={{
              fontSize: "28px",
              color: "#5093e0",
              textTransform: "uppercase",
            }}
          >
            Cerisma
          </h1>
        </Link>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item?.id} disablePadding>
            <Button
              variant="contained"
              onClick={() => handleModalopen(item?.id)}
              size="small"
              sx={{
                fontSize: "clamp(10px,3vw,12px)",
                color: "white",
                margin: "2px 5px",
                height: "40px",
              }}
            >
              {item?.value}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ background: "white", boxShadow: "none" }}>
        <Toolbar>
          {/* FOR SMALLER SCREENS */}
          <Box sx={{ mr: 2, width: "100%", display: { md: "none" } }}>
            <Box className={styles.toolbarSM}>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <h1
                  style={{
                    fontSize: "28px",
                    color: "#5093e0",
                    textTransform: "uppercase",
                  }}
                >
                  Cerisma
                </h1>
              </Link>

              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { md: "none" } }}
              >
                <MenuIcon sx={{ fontSize: "40px", color: "black" }} />
              </IconButton>
            </Box>
          </Box>

          {/* FOR LARGE SCREEN */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}
          >
            <Box className={styles.toolbarLS}>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <h1
                  style={{
                    fontSize: "28px",
                    color: "#5093e0",
                    textTransform: "uppercase",
                  }}
                >
                  Cerisma
                </h1>
              </Link>
            </Box>
          </Typography>
          {/* <Box sx={{ display: { xs: "none", md: "block" } }}>
            {navItems.map((item) => (
              <Button
                variant="contained"
                onClick={() => handleModalopen(item?.id)}
                size="small"
                key={item?.value}
                sx={{
                  fontSize: "clamp(10px,3vw,12px)",
                  color: "white",
                  margin: "2px 5px",
                  height: "35px",
                }}
              >
                {item?.value}
              </Button>
            ))}
          </Box> */}
        </Toolbar>
      </AppBar>

      {/* THIS IS MOBILE SCREEN DRAWER */}
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      <Box component="main">
        <Toolbar />
      </Box>

      {userInfoModal && (
        <UserInformationModal
          open={userInfoModal}
          handleClose={handleModalClose}
          title={userInfoModalData?.title || "N/A"}
          content={userInfoModalData?.content || "N/A"}
        />
      )}

      {/* VIDEO DAILOG */}
      <>
        <Dialog
          fullScreen={fullScreen}
          open={openCustJourney}
          onClose={handleCustomerJourneyClose}
          maxWidth={"lg"}
          BackdropProps={{
            style: { backgroundColor: "rgba(0, 0, 0, 0.7)" }, // Adjust the background opacity
          }}
        >
          {/* Close Button */}
          <DialogActions>
            <Button
              size="small"
              sx={{ height: "30px" }}
              variant="contained"
              autoFocus
              onClick={handleCustomerJourneyClose}
            >
              Close
            </Button>
          </DialogActions>

          {/* Dialog Content */}
          <DialogContent
            sx={{
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
              p: 0, // Remove padding to ensure video fills space
              minWidth: { xs: "90vw", sm: "80vw", md: "70vw" }, // Adjust width based on screen size
              minHeight: "50vh", // Set minimum height
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", sm: "95%", md: "90%", lg: "85%" }, // Adjust video width
                  height: "auto",
                  maxWidth: "1200px",
                  margin: "0 auto",
                }}
              >
                <video
                  width="100%"
                  height="auto"
                  controls
                  preload="metadata"
                  autoPlay
                  style={{
                    borderRadius: "8px",
                    outline: "none",
                    border: "none",
                    padding: "0",
                    margin: "0",
                    display: "block",
                    boxShadow: "none", // Ensure no shadow
                  }}
                >
                  <source src={VideoFile} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    </Box>
  );
}

export default Header;
