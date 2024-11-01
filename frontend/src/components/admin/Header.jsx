import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Ini akan memastikan bahwa fungsi toggle dan event listener sudah terpasang
    const mobileNavToggleBtn = document.querySelector(".menu-toggle");
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener("click", toggleSidebar);
    }

    return () => {
      if (mobileNavToggleBtn) {
        mobileNavToggleBtn.removeEventListener("click", toggleSidebar);
      }
    };
  }, []);

  const handleLogout = () => {
    const confirmed = window.confirm("Apakah Anda yakin ingin keluar?");
    if (confirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle("sidebar-open");
  };

  return (
    <header className="dash-toolbar">
      <a href="#" className="menu-toggle">
        <i className="fas fa-bars"></i>
      </a>
      <a href="#" className="searchbox-toggle">
        <i className="fas fa-search"></i>
      </a>
      <form className="searchbox" action="#!">
        <a href="#" className="searchbox-toggle">
          <i className="fas fa-arrow-left"></i>
        </a>
        <button type="submit" className="searchbox-submit">
          <i className="fas fa-search"></i>
        </button>
        <input
          type="text"
          className="searchbox-input"
          placeholder="type to search"
        />
      </form>
      <div className="tools">
        <div className="dropdown tools-item">
          <a
            href="#"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-user"></i>
          </a>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenu1"
          >
            <a className="dropdown-item" href="#!">
              Profile
            </a>
            <a onClick={handleLogout} className="dropdown-item" href="#!">
              Logout
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
