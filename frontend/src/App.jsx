import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Hero from "./components/Hero";
import Documentation from "./components/Documentation";
import TentangKami from "./components/TentangKami";
import Contact from "./components/Contact";
import DocumentasiDetail from "./components/DocumentasiDetail";
import Teams from "./components/Teams";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/admin/Dashboard";
import About from "./pages/admin/About";
import Galery from "./pages/admin/Galery";
import Login from "./pages/admin/Login";
import AdminTeams from "./pages/admin/AdminTeams";
import ProtectedRoute from "./pages/admin/ProtectedRoute";

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Header />}

      {/* Render konten children */}
      {children}

      {!isLoginPage && <Footer />}
    </>
  );
};

// Komponen utama App
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route untuk halaman login */}
        <Route path="/login" element={<Login />} />

        {/* Route yang dilindungi untuk halaman Dashboard dan admin lainnya */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about-admin"
          element={
            <ProtectedRoute role="admin">
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-galery"
          element={
            <ProtectedRoute role="admin">
              <Galery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-teams"
          element={
            <ProtectedRoute role="admin">
              <AdminTeams />
            </ProtectedRoute>
          }
        />
        <Route path="/details/:id" element={<DocumentasiDetail />} />

        {/* Route dengan Layout untuk halaman umum */}
        <Route
          path="/"
          element={
            <Layout>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Hero />
                      <TentangKami />
                      <Documentation />
                      <Teams />
                      <Contact />
                    </>
                  }
                />
                <Route path="/tentangKami" element={<TentangKami />} />
                <Route path="/documentation" element={<Documentation />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/contact" element={<Contact />} />
                {/* <Route path="/details/:id" element={<DocumentasiDetail />} /> */}
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
