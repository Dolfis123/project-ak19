import React, { useState, useEffect } from "react";
import axios from "axios";

const Teams = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 4 items per page

  // Fungsi untuk mengambil data team
  const fetchTeam = async () => {
    try {
      const response = await axios.get("http://localhost:3030/api/team/teams", {
        withCredentials: true,
      });

      setTeamMembers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching team data", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // Menghitung index item pertama dan terakhir untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = teamMembers.slice(indexOfFirstItem, indexOfLastItem);

  // Menghitung total halaman
  const totalPages = Math.ceil(teamMembers.length / itemsPerPage);

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
    <section id="teams" className="team section">
      {/* Section Title */}
      <div className="container section-title">
        <h2>Tim Kami</h2>
      </div>
      {/* End Section Title */}

      <div className="container">
        <div className="row gy-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            currentItems.map((member, index) => (
              <div
                className="col-lg-6"
                key={member.id}
                data-aos-delay={`${100 + index * 100}`}
              >
                <div className="team-member d-flex align-items-start">
                  <div className="pic">
                    <img
                      src={`http://localhost:3030/api${member.image_url}`} // Menampilkan gambar dengan path yang disimpan di backend
                      className="img-fluid"
                      alt={member.name}
                    />
                  </div>
                  <div className="member-info">
                    <h4>{member.name}</h4>
                    <span>{member.position}</span>
                    <p dangerouslySetInnerHTML={{ __html: member.bio }}></p>
                    <div className="social">
                      {member.twitter_url && (
                        <a href={member.twitter_url}>
                          <i className="bi bi-twitter"></i>
                        </a>
                      )}
                      {member.facebook_url && (
                        <a href={member.facebook_url}>
                          <i className="bi bi-facebook"></i>
                        </a>
                      )}
                      {member.instagram_url && (
                        <a href={member.instagram_url}>
                          <i className="bi bi-instagram"></i>
                        </a>
                      )}
                      {member.linkedin_url && (
                        <a href={member.linkedin_url}>
                          <i className="bi bi-linkedin"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
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
  );
};

export default Teams;
