import React, { useEffect } from "react";
import "../css/header.css";
import { Link } from "react-router-dom";
import logo from "../images/logo.webp";

const Header = () => {
  useEffect(() => {
    // Logika untuk toggle mobile nav
    const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
    mobileNavToggle?.addEventListener("click", mobileNavToogle);

    const handleScroll = () => {
      const header = document.querySelector("#header");
      if (window.scrollY === 0) {
        header?.classList.remove("header-scrolled");
      } else {
        header?.classList.add("header-scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      mobileNavToggle?.removeEventListener("click", mobileNavToogle);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <Link to="/" className="logo d-flex align-items-center me-auto">
          <img src={logo} alt="PT Kita Sehati Logo" className="logo-image" />
          <h1 className="sitename">PT Kita Sehati</h1>
        </Link>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li>
              <a href="#home">Beranda</a>
            </li>

            <li>
              <a href="#about">Tentang Kami</a>
            </li>
            <li>
              <a href="#galery">Galery</a>
            </li>

            <li>
              <a href="#teams">Tim Kami</a>
            </li>
            <li>
              <a href="#contact">Kontak</a>
            </li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        <Link className="btn-getstarted" to="/login">
          Masuk
        </Link>
      </div>
    </header>
  );
};

export default Header;

// Implementasi mobileNavToogle
function mobileNavToogle() {
  const body = document.querySelector("body");
  body?.classList.toggle("mobile-nav-active");

  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  if (mobileNavToggle?.classList.contains("bi-list")) {
    mobileNavToggle.classList.remove("bi-list");
    mobileNavToggle.classList.add("bi-x");
  } else {
    mobileNavToggle?.classList.remove("bi-x");
    mobileNavToggle.classList.add("bi-list");
  }
}
