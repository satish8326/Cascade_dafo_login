import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
// import loginBg from "../assets/thumbnail_Login.png";
import loginBg from '../assets/login-bg.png';
export interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        backgroundImage: `url(${loginBg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100% 100% !important",
        "@media (max-width: 768px)": {
          backgroundSize: "contain",
          backgroundPosition: "top center",
          backgroundColor: "#005cb9",
        },
      }}
    >
      {/* Centered card */}
      <Card
        elevation={6}
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 480,
          mx: 2,
          borderRadius: 0.8,
          paddingX: isSmall ? 4 : 4,
          paddingY: isSmall ? 3 : 3,
        }}
      >
        {children}
      </Card>
    </Box>
  );
};

export default AuthLayout;
