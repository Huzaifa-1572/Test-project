import {
  AppBar,
  Drawer,
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { LINKS_TO_DASHBOARD_FORMS } from "src/Utils/Constants";
import CDNSLOGO from "src/Assets/images/cdnsLogo.png";

const drawerWidth = 300;

const DashboardLayout = (props) => {
  const { window } = props;
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();

  const handleListItemClick = (index, link) => {
    setSelectedIndex(index);
    navigate(link);
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    // Find the index of the current route
    const currentIndex = LINKS_TO_DASHBOARD_FORMS?.findIndex((item) =>
      pathname?.includes(item.link)
    );
    setSelectedIndex(currentIndex);
  }, [pathname]); // Update selected index when pathname changes

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {LINKS_TO_DASHBOARD_FORMS?.map((item, index) => (
          <ListItem
            button
            selected={index === selectedIndex}
            onClick={() => handleListItemClick(index, item.link)}
            key={index}
            sx={{
              color: "#484e53",
              fontWeight: index === selectedIndex ? "bolder !important" : 900,
              background:
                index === selectedIndex ? "#eaeaea !important" : "transparent",
            }}
          >
            {item?.icon}
            <ListItemText primary={item?.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <IoMenu />
          </IconButton>
          <Link to={"/"}>
            <img src={CDNSLOGO} alt="National Savings Logo" />
          </Link>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
