import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
// import cascadeLogo from "../assets/cascade-logo.png";
import cascadeLogo from "../assets/cascade-header-logo.svg";

export interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { label: "Home", path: "/dashboard" },
  { label: "Products", path: "/products" },
  { label: "Orders", path: "/orders" },
  { label: "Templates", path: "/templates" },
];

const TopNavBar: React.FC<{ hideMenuNavigations?: boolean }> = ({ hideMenuNavigations = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleNavClick = (path: string): void => {
    navigate(path);
    setDrawerOpen(false);
  };

  const renderNavButtons = () =>
    navItems.map((item) => {
      const active = location.pathname === item.path;
      return (
        <Button
          key={item.label}
          component={NavLink}
          to={item.path}
          disableRipple
          sx={{
            color: "#ffffff",
            textTransform: "none",
            fontWeight: active ? 600 : 400,
            fontSize: 14,
            fontFamily: 'Poppins, sans-serif',
            px: 2,
            borderRadius: 0,
            borderBottom: active
              ? "2px solid #ffffff"
              : "2px solid transparent",
            // "&:hover": {
            //   backgroundColor: "rgba(255,255,255,0.08)",
            // },
            width: 42,
            mr: 6,
            lineHeight: 1.2,
          }}
        >
          {item.label}
        </Button>
      );
    });

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#2d5499",
          boxShadow: "0 2px 8px rgba(15, 23, 42, 0.25)",
        }}
      >
        <Toolbar
          sx={{
            minHeight: 64,
            px: { xs: 2, sm: 3 },
          }}
        >
          {/* Logo area */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: 4,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: 1.5,
                mr: 0.5,
              }}
            >
              <a href="https://cascadedafo.com" target="_blank" rel="noopener">
                <img src={cascadeLogo} alt="Cascade" style={{ height: 60, width: 87 }} />
              </a>
            </Typography>
          </Box>

          {/* Desktop navigation */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {renderNavButtons()}
            </Box>
          )}

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Right side */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <IconButton size="large" sx={{ color: "#ffffff" }}>
                <Badge badgeContent={0} color="error">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
              <IconButton size="large" sx={{ color: "#ffffff" }}>
                <ShoppingCartOutlinedIcon />
              </IconButton>
              <UserMenu />
            </Box>
          )}

          {/* Mobile menu button */}
          {isMobile && (
            <IconButton
              size="large"
              edge="end"
              onClick={toggleDrawer(true)}
              sx={{ color: "#ffffff" }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 260 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <Box sx={{ p: 2 }}>
            <UserMenu />
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => handleNavClick(item.path)}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default TopNavBar;
