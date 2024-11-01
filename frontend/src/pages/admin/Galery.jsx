import React from "react";

import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import ContentGalery from "./content/ContentGalery";

const Galery = () => {
  return (
    <div className="dash">
      <Sidebar />
      <div className="dash-app">
        <Header />
        <ContentGalery />
      </div>
    </div>
  );
};

export default Galery;
