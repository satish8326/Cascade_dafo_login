import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";

const PublicRoute = () => {
  const isAuthenticated = useIsAuthenticated();
  const { inProgress } = useMsal();

  // Prevent redirect flicker while MSAL initializes
  if (inProgress !== InteractionStatus.None) {
    return null;
  }

  // If already authenticated → dashboard
  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
