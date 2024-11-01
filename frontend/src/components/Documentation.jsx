import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Documentation = () => {
  const [documentations, setDocumentations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 6 items per page

  // Fungsi untuk mengambil data documentation
  const fetchDocumentation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3030/api/documentation/documentation"
      );
      setDocumentations(response.data.reverse()); // Membalik urutan data
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching documentation data", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocumentation();
  }, []);

  // Menghitung index item pertama dan terakhir untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = documentations.slice(indexOfFirstItem, indexOfLastItem);

  // Menghitung total halaman
  const totalPages = Math.ceil(documentations.length / itemsPerPage);

  // Fungsi untuk mengubah halaman
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <section id="galery" className="portfolio section">
        {/* Section Title */}
        <div className="container section-title">
          <h2>Galery</h2>
        </div>
        {/* End Section Title */}

        <div className="container">
          <div
            className="isotope-layout"
            data-default-filter="*"
            data-layout="masonry"
            data-sort="original-order"
          >
            {/* End Portfolio Filters */}

            <div className="row gy-4 isotope-container" data-aos-delay="200">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                currentItems.map((doc) => (
                  <div
                    className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app"
                    key={doc.id}
                  >
                    <img
                      src={`http://localhost:3030/api${doc.image_url}`}
                      className="img-fluid"
                      alt={doc.title}
                    />
                    <div className="portfolio-info">
                      <h4>{doc.title}</h4>
                      <p
                        dangerouslySetInnerHTML={{ __html: doc.description }}
                      ></p>
                      <a
                        href={`http://localhost:3030/api${doc.image_url}`}
                        title={doc.title}
                        data-gallery="portfolio-gallery-app"
                        className="glightbox preview-link"
                      >
                        <i className="bi bi-zoom-in"></i>
                      </a>
                      <Link
                        to={`/details/${doc.id}`}
                        title="More Details"
                        className="details-link"
                      >
                        <i className="bi bi-link-45deg"></i>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* End Portfolio Container */}
          </div>

          {/* Navigasi halaman */}
          <div className="pagination mt-4 d-flex justify-content-end align-items-center">
            <span className="me-3">
              Halaman {currentPage} dari {totalPages}
            </span>
            <div>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="btn btn-primary me-2"
              >
                Sebelumnya
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="btn btn-primary"
              >
                Berikutnya
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Documentation;
