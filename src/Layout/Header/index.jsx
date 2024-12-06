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
              margin: '0px',
            }}
          >
            Cerisma
          </h1>
        </Link>
      </Box>
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
                    margin: '0px',
                  }}
                >
                  Cerisma
                </h1>
              </Link>
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
                    margin: '0px',
                  }}
                >
                  Cerisma
                </h1>
              </Link>
            </Box>
          </Typography>
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
    </Box>
  );
}

export default Header;
