// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import PublicLayout from "./components/PublicLayout";

export default function App() {
  return (
    
      <Routes>
        {/* Public (marketing) routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/pricing" element={<Pricing />} /> */}
          {/* <Route path="/blog" element={<Blog />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* …any other public pages */}
        </Route>

        {/* Protected dashboard routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    
  )
}