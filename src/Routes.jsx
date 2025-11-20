import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CertificateGeneration from './pages/certificate-generation';
import LoginPage from './pages/login';
import UserManagement from './pages/user-management';
import Dashboard from './pages/dashboard';
import HouseholdManagement from './pages/household-management';
import ResidentManagement from './pages/resident-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/certificate-generation" element={<CertificateGeneration />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/household-management" element={<HouseholdManagement />} />
        <Route path="/resident-management" element={<ResidentManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
