import { Box, Card, Typography } from "@mui/material";
import loginBg from "../assets/login-bg-new.png";
import cascadeDafoLogo from "../assets/cascade-logo-svg.svg";
import SignUpFlow from "../sections/SignUpFlow";
import "../components/SignUp/signup.css";
import { useState } from "react";
import { screens } from "../components/SignUp/model";

const SignUp = () => {
  const [activeScreen, setActiveScreen] = useState<string>(screens.signUp); // screens.signUp

  // to make certain customisation for screens
  const getCardHeight = () => {
    switch (activeScreen) {
      // case screens.signUp:
      //   return "auto";
      case screens.addNewContact || screens?.newAccountRequest:
        return 780;
      default:
        return "auto";
    }
  };
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
      <Card
        elevation={6}
        className="signup-card-container"
        sx={{
          height: getCardHeight(),
          transition: "height 0.3s ease",
          width: { md: "auto", lg: "100%" },
        }} // Smooth transition
      >
        <Box
          sx={{
            textAlign: "center",
            mb: 1,
            flexShrink: 0,
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
                style={{
                  height: 106,
                  width: 156,
                  display: "block",
                }}
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
        <SignUpFlow
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
        />
      </Card>
    </Box>
  );
};

export default SignUp;
