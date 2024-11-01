import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import "../../css/sidebar.css";
import logo from "../../images/logo.webp";
const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk menu toggle
  const location = useLocation(); // Gunakan useLocation untuk mendapatkan path saat ini

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`dash-nav dash-nav-dark ${isMenuOpen ? "open" : ""}`}>
      <header>
        <a href="#" className="menu-toggle" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </a>
        <a to="#" className="spur-logo d-flex align-items-center">
          <img src={logo} alt="Logo PT Kita Sehati" className="logo-image" />
          <span>PT Kita Sehati</span>
        </a>
      </header>
      <nav className="dash-nav-list">
        <Link
          to="/Dashboard"
          className={`dash-nav-item ${
            location.pathname === "/Dashboard" ? "active" : ""
          }`}
        >
          <i className="fas fa-tachometer-alt"></i> Dashboard
        </Link>
        <Link
          to="/about-admin"
          className={`dash-nav-item ${
            location.pathname === "/about-admin" ? "active" : ""
          }`}
        >
          <i className="fas fa-info-circle"></i> Tentang Kami
        </Link>
        <Link
          to="/admin-galery"
          className={`dash-nav-item ${
            location.pathname === "/admin-galery" ? "active" : ""
          }`}
        >
          <i className="fas fa-images"></i> Galeri
        </Link>
        <Link
          to="/admin-teams"
          className={`dash-nav-item ${
            location.pathname === "/admin-teams" ? "active" : ""
          }`}
        >
          <i className="fas fa-users"></i> Tim Kami
        </Link>
        <Link
          to="/admin-contact"
          className={`dash-nav-item ${
            location.pathname === "/admin-contact" ? "active" : ""
          }`}
        >
          <i className="fas fa-envelope"></i> Kontak
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
