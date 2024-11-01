import React from "react";

import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import ContentAbout from "./content/ContentAbout";

const About = () => {
  return (
    <div className="dash">
      <Sidebar />
      <div className="dash-app">
        <Header />
        <ContentAbout />
      </div>
    </div>
  );
};

export default About;
