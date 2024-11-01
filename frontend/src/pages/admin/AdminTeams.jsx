import React from "react";

import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";

import ContentTeams from "./content/ContentTeams";

const AdminTeams = () => {
  return (
    <div className="dash">
      <Sidebar />
      <div className="dash-app">
        <Header />
        <ContentTeams />
      </div>
    </div>
  );
};

export default AdminTeams;
