import React, { useState, useEffect } from "react";
import axios from "axios";

const TentangKami = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data "Tentang Kami" dari API
  const fetchTentangKamiData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3030/api/about/tentangkami"
      );
      // Asumsikan API mengembalikan array dan mengambil data pertama
      setData(response.data[0] || {});
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Tentang Kami data", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTentangKamiData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Data Tentang Kami tidak ditemukan.</p>;
  }

  return (
    <section
      id="about"
      className="about section"
      style={{ textAlign: "center" }}
    >
      {/* Section Title */}
      <div className="container section-title">
        <h2>Tentang Kami</h2>
      </div>
      {/* End Section Title */}

      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-12 content" data-aos-delay="100">
            <h3>Gambaran Singkat</h3>
            <p dangerouslySetInnerHTML={{ __html: data.gambaran_singkat }}></p>

            <h3>Visi</h3>
            <p dangerouslySetInnerHTML={{ __html: data.visi }}></p>

            <h3>Misi</h3>
            <p dangerouslySetInnerHTML={{ __html: data.misi }}></p>

            <h3>Nilai Utama</h3>
            <p dangerouslySetInnerHTML={{ __html: data.nilai_utama }}></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TentangKami;
