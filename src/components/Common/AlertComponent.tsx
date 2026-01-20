import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import type { AlertProps as MuiAlertProps } from "@mui/material/Alert";

interface AlertComponentProps {
  open: boolean;
  message: string;
  onClose: () => void;
  severity?: MuiAlertProps["severity"];
  variant?: MuiAlertProps["variant"];
  duration?: number;
}

export const AlertComponent: React.FC<AlertComponentProps> = ({
  open,
  message,
  onClose,
  severity = "success",
  variant = "filled",
  duration = 2000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ mt: 2 }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant={variant}
        sx={{ width: "100%", boxShadow: 3 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
