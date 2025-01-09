import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EnvironmentalNewsPage from "../pages/EnvironmentalNewsPage";
import { layouts } from "chart.js";
import WasteManagementPage from "../pages/WasteManagementPage";
const AppRoutes = () => {
  // Layout wrapper with navbar and footer
  const Layout = ({ children }) => (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/environmentalnews"
        element={
          <Layout>
            <EnvironmentalNewsPage />
          </Layout>
        }
      />
      <Route
        path="/waste-management"
        element={
          <Layout>
            <WasteManagementPage />
          </Layout>
        }
      />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
