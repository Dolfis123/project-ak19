import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

const Hero = () => {
  const [hero, setHero] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Fungsi untuk mengambil data hero dari backend
  const fetchHero = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3030/api/hero/heroes/1"
      );
      setHero(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching hero data:", error);
      setIsLoading(false);
    }
  };

  // useEffect untuk mengambil data hero saat komponen dimount
  useEffect(() => {
    fetchHero();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!hero) {
    return <p>Data hero tidak ditemukan</p>;
  }

  return (
    <section id="home" className="hero section dark-background">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h1>{hero.title}</h1>
            <p dangerouslySetInnerHTML={{ __html: hero.description }}></p>
            <div className="d-flex">
              <Button
                className="btn-get-started"
                onClick={() => setShowModal(true)}
              >
                Lihat Detail
              </Button>
            </div>
          </div>
          <div className="col-lg-6 order-1 order-lg-2 hero-img">
            <img
              src={`http://localhost:3030/api${hero.image_url}`}
              className="img-fluid animated"
              alt={hero.title}
              style={{ width: "65%", height: "auto", marginLeft: "90px" }} // Tambahkan margin kiri
            />
          </div>
        </div>
      </div>

      {/* Modal untuk menampilkan detail */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Hero</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{hero.description}</p>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Hero;
