import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TopNavBar from "../components/TopNavBar";
import "@fontsource/poppins"; // default weight 400
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { Link } from "@mui/material";
export interface MainLayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  hideFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  fullWidth = false,
  hideFooter = false,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <TopNavBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#ffffff",
          pt: { xs: 8, sm: 9 },
          mt: { lg: 1 },
        }}
      >
        {fullWidth ? (
          children
        ) : (
          <Container
            maxWidth="lg"
            sx={{
              py: { xs: 2, sm: 2 },
            }}
          >
            {children}
          </Container>
        )}
      </Box>
      {/* Footer can be conditionally rendered here in the future when footer component is added */}
      {!hideFooter && (
        <Box sx={{ py: 2, textAlign: "center", backgroundColor: "#FFFFFF" }}>
          <div>
            © 2025{" "}
            <Link
              href="https://cascadedafo.com"
              color="#0088CB"
              target="_blank"
              rel="noopener"
              sx={{ fontWeight: 400, fontSize: "16px" }}
            >
              CascadeDAFO
            </Link>
            . All rights reserved.
          </div>
        </Box>
      )}
    </Box>
  );
};

export default MainLayout;
