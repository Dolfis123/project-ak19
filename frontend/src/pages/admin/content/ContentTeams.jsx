import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../../css/teams.css";

const ContentTeams = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("add"); // "add", "edit", or "view"
  const [currentMember, setCurrentMember] = useState({
    id: null,
    name: "",
    position: "",
    bio: "",
    image: null,
    facebook_url: "",
    twitter_url: "",
    instagram_url: "",
    linkedin_url: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get("http://localhost:3030/api/team/teams");
      setTeamMembers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching team data", error);
      setIsLoading(false);
    }
  };

  const openModal = (action, member = null) => {
    setModalAction(action);
    setIsModalOpen(true);
    if (member) {
      setCurrentMember({
        id: member.id,
        name: member.name,
        position: member.position,
        bio: member.bio,
        image: member.image_url,
        facebook_url: member.facebook_url,
        twitter_url: member.twitter_url,
        instagram_url: member.instagram_url,
        linkedin_url: member.linkedin_url,
      });
      setPreviewImage(`http://localhost:3030/api${member.image_url}`);
    } else {
      setCurrentMember({
        id: null,
        name: "",
        position: "",
        bio: "",
        image: null,
        facebook_url: "",
        twitter_url: "",
        instagram_url: "",
        linkedin_url: "",
      });
      setPreviewImage(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentMember({
      id: null,
      name: "",
      position: "",
      bio: "",
      image: null,
      facebook_url: "",
      twitter_url: "",
      instagram_url: "",
      linkedin_url: "",
    });
    setPreviewImage(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", currentMember.name);
    formData.append("position", currentMember.position);
    formData.append("bio", currentMember.bio);
    formData.append("facebook_url", currentMember.facebook_url);
    formData.append("twitter_url", currentMember.twitter_url);
    formData.append("instagram_url", currentMember.instagram_url);
    formData.append("linkedin_url", currentMember.linkedin_url);
    if (currentMember.image) formData.append("image", currentMember.image);

    try {
      if (modalAction === "add") {
        await axios.post("http://localhost:3030/api/team/teams", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccessMessage("Data berhasil ditambahkan!");
      } else if (modalAction === "edit") {
        await axios.put(
          `http://localhost:3030/api/team/teams/${currentMember.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setSuccessMessage("Data berhasil diubah!");
      }
      fetchTeams();
      closeModal();

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error saving team member", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentMember((prevMember) => ({ ...prevMember, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCurrentMember((prevMember) => ({ ...prevMember, image: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = teamMembers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(teamMembers.length / itemsPerPage);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Tim Kami</h2>
      <button onClick={() => openModal("add")} className="btn btn-primary mb-4">
        Tambah Data
      </button>

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      <div className="panel-body table-responsive">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Posisi</th>
                <th>Bio</th>
                <th>Gambar</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((member, index) => (
                <tr key={member.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{member.name}</td>
                  <td>{member.position}</td>
                  <td
                    dangerouslySetInnerHTML={{
                      __html: member.bio?.slice(0, 50) + "...",
                    }}
                  ></td>
                  <td>
                    {member.image_url && (
                      <img
                        src={`http://localhost:3030/api${member.image_url}`}
                        alt={member.name}
                        className="img-thumbnail"
                        style={{ width: "50px", borderRadius: "50%" }}
                      />
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-link text-primary me-2"
                      onClick={() => openModal("view", member)}
                    >
                      <i className="fa fa-eye"></i>
                    </button>
                    <button
                      className="btn btn-link text-success me-2"
                      onClick={() => openModal("edit", member)}
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                    <button
                      className="btn btn-link text-danger"
                      onClick={() => confirmDelete(member.id)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="panel-footer d-flex justify-content-between align-items-center">
        <span>
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, teamMembers.length)} of{" "}
          {teamMembers.length} entries
        </span>
        <ul className="pagination mb-0">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &laquo;
            </button>
          </li>
          {[...Array(totalPages).keys()].map((page) => (
            <li
              key={page + 1}
              className={`page-item ${
                currentPage === page + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(page + 1)}
              >
                {page + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </div>
      {/* Modal untuk Tambah, Edit, dan Lihat */}
      {isModalOpen && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalAction === "add"
                    ? "Tambah Anggota Tim"
                    : modalAction === "edit"
                    ? "Edit Anggota Tim"
                    : "Lihat Anggota Tim"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body modal-scrollable">
                {modalAction === "view" ? (
                  <>
                    <h5>Nama: {currentMember.name}</h5>
                    <p>Posisi: {currentMember.position}</p>
                    <p>
                      Bio:{" "}
                      <span
                        dangerouslySetInnerHTML={{ __html: currentMember.bio }}
                      ></span>
                    </p>
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="img-thumbnail"
                        style={{ width: "100px" }}
                      />
                    )}
                  </>
                ) : (
                  <form onSubmit={handleSave}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Nama
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={currentMember.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="position" className="form-label">
                        Posisi
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="position"
                        name="position"
                        value={currentMember.position}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="bio" className="form-label">
                        Bio
                      </label>
                      <ReactQuill
                        theme="snow"
                        value={currentMember.bio}
                        onChange={(value) =>
                          setCurrentMember((prev) => ({ ...prev, bio: value }))
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="facebook_url" className="form-label">
                        Facebook URL
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        id="facebook_url"
                        name="facebook_url"
                        value={currentMember.facebook_url}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="twitter_url" className="form-label">
                        Twitter URL
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        id="twitter_url"
                        name="twitter_url"
                        value={currentMember.twitter_url}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="instagram_url" className="form-label">
                        Instagram URL
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        id="instagram_url"
                        name="instagram_url"
                        value={currentMember.instagram_url}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="linkedin_url" className="form-label">
                        LinkedIn URL
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        id="linkedin_url"
                        name="linkedin_url"
                        value={currentMember.linkedin_url}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">
                        Gambar
                      </label>
                      {previewImage && (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="img-thumbnail mb-3"
                          style={{ width: "100px" }}
                        />
                      )}
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleImageChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Simpan
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary ms-2"
                      onClick={closeModal}
                    >
                      Batal
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal Konfirmasi Hapus */}
      {isConfirmOpen && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsConfirmOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Apakah Anda yakin ingin menghapus anggota tim ini?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Hapus
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsConfirmOpen(false)}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentTeams;
