import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DocumentasiDetail = () => {
  const { id } = useParams();
  const [documentation, setDocumentation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi untuk mengambil data detail documentation berdasarkan id
  const fetchDocumentationDetail = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3030/api/documentation/documentation/${id}`
      );
      setDocumentation(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching documentation detail", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchDocumentationDetail(id);
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (!documentation) return <p>Data tidak ditemukan.</p>;

  return (
    <section id="details" className="portfolio-details section">
      <div className="container" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-8">
            <div className="portfolio-details-slider swiper init-swiper">
              <div className="swiper-wrapper align-items-center">
                {documentation.image_url && (
                  <div className="swiper-slide">
                    <img
                      src={`http://localhost:3030/api${documentation.image_url}`}
                      alt={documentation.title}
                    />
                  </div>
                )}
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="portfolio-info" data-aos-delay="200">
              <h3>Project information</h3>
              <ul>
                <li>
                  <strong>Judul</strong>: {documentation.title}
                </li>
                <li>
                  <strong>Dibuat pada</strong>:{" "}
                  {new Date(
                    documentation.created_at || ""
                  ).toLocaleDateString()}
                </li>
              </ul>
            </div>
            <div className="portfolio-description" data-aos-delay="300">
              <h2>{documentation.title}</h2>
              <div
                dangerouslySetInnerHTML={{ __html: documentation.content }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentasiDetail;
