import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

interface LoaderProps {
  loading: boolean;
}

const CommonLoader: React.FC<LoaderProps> = ({ loading }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: "blur(0.5px)",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
      open={loading}
    >
      <CircularProgress color="inherit" size={30} />
    </Backdrop>
  );
};

export default CommonLoader;
