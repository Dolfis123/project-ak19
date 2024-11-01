import React from "react";

import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import MainContent from "./content/MainContent";
import "../../css/mycontent.css";
const Dashboard = () => {
  return (
    <div className="dash">
      <Sidebar />
      <div className="dash-app">
        <Header />
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;
