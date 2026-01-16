import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";

export interface ProtectedRouteProps {
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectTo = "/login",
}) => {
  const isAuthenticated = useIsAuthenticated();
  const { inProgress } = useMsal();

  // Prevent redirect while MSAL is initializing
  if (inProgress !== InteractionStatus.None) {
    return null;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={redirectTo} replace />
  );
};

export default ProtectedRoute;
