import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AuthLayout from "../layouts/AuthLayout";
import cascadeDafoLogo from "../assets/cascade-logo-svg.svg";
import LoginForm from "../sections/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <Box
        sx={{
          textAlign: "center",
          mb: 1,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            lineHeight: 0,
            m: 0,
            p: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a href="https://cascadedafo.com" target="_blank" rel="noopener">
            <img
              src={cascadeDafoLogo}
              alt="Cascade"
              style={{ height: 106, width: 156, display: "block" }}
            />
          </a>
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            fontSize: "22px",
            color: "#333946",
          }}
        >
          DAFO Now
        </Typography>
      </Box>

      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
