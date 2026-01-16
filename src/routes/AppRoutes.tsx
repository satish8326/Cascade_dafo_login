import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { FallbackInitialPageLoader } from "../components/Loaders/FallbackInitialPageLoader";
import ProtectedRoute from "../auth/ProtectedRoute";
import PublicRoute from "../auth/publicRoute";
const LoginPage = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<FallbackInitialPageLoader />}>
      <Routes>
      <Route element={<PublicRoute />}>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
    </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
