import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AdminHomePage from "../pages/AdminHomePage";
import PlantTreesPage from "../pages/PlantTreesPage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EnvironmentalNewsPage from "../pages/EnvironmentalNewsPage";
import WasteManagementPage from "../pages/WasteManagementPage";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";

// Layout wrapper with navbar and footer
const Layout = ({ children }) => (
  <div className="flex flex-col h-screen">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout>
                <AdminHomePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/plant-trees"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Layout>
                <PlantTreesPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/environmentalnews"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Layout>
                <EnvironmentalNewsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/waste-management"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Layout>
                <WasteManagementPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Default Redirect */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Navigate to="/" />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
