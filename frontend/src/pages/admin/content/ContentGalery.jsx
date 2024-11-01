import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../../css/teams.css";

const ContentGalery = () => {
  const [documentation, setDocumentation] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("add");
  const [currentDoc, setCurrentDoc] = useState({
    id: null,
    title: "",
    description: "",
    content: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchDocumentation();
  }, []);

  const fetchDocumentation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3030/api/documentation/documentation"
      );
      setDocumentation(response.data.reverse());
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching documentation data", error);
      setIsLoading(false);
    }
  };

  const openModal = (action, doc = null) => {
    setModalAction(action);
    setIsModalOpen(true);
    if (doc) {
      setCurrentDoc({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        content: doc.content,
        image: doc.image_url,
      });
      setPreviewImage(`http://localhost:3030/api${doc.image_url}`);
    } else {
      setCurrentDoc({
        id: null,
        title: "",
        description: "",
        content: "",
        image: null,
      });
      setPreviewImage(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentDoc({
      id: null,
      title: "",
      description: "",
      content: "",
      image: null,
    });
    setPreviewImage(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", currentDoc.title);
    formData.append("description", currentDoc.description);
    formData.append("content", currentDoc.content);
    if (currentDoc.image) formData.append("image", currentDoc.image);

    try {
      if (modalAction === "add") {
        await axios.post(
          "http://localhost:3030/api/documentation/documentation",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setSuccessMessage("Data berhasil ditambahkan!");
      } else if (modalAction === "edit") {
        await axios.put(
          `http://localhost:3030/api/documentation/documentation/${currentDoc.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setSuccessMessage("Data berhasil diperbarui!");
      }
      fetchDocumentation();
      closeModal();

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error saving documentation", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDoc((prevDoc) => ({ ...prevDoc, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCurrentDoc((prevDoc) => ({ ...prevDoc, image: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) =>
      direction === "next" ? prevPage + 1 : prevPage - 1
    );
  };

  const confirmDelete = (id) => {
    setItemToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3030/api/documentation/documentation/${itemToDelete}`
      );
      setSuccessMessage("Data berhasil dihapus!");
      fetchDocumentation();
      setIsConfirmOpen(false);

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error deleting documentation", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = documentation.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(documentation.length / itemsPerPage);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Galeri</h2>
      <button onClick={() => openModal("add")} className="btn btn-primary mb-4">
        Tambah Data
      </button>

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>Konten</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((doc, index) => (
              <tr key={doc.id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: doc.title?.slice(0, 50) + "...",
                  }}
                ></td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: doc.description?.slice(0, 50) + "...",
                  }}
                ></td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: doc.content?.slice(0, 50) + "...",
                  }}
                ></td>
                <td>
                  {doc.image_url && (
                    <img
                      src={`http://localhost:3030/api${doc.image_url}`}
                      alt={doc.title}
                      className="img-thumbnail"
                      style={{ width: "50px", borderRadius: "50%" }}
                    />
                  )}
                </td>
                <td>
                  <button
                    onClick={() => openModal("view", doc)}
                    className="btn btn-link text-primary me-2"
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    onClick={() => openModal("edit", doc)}
                    className="btn btn-link text-success me-2"
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                  <button
                    onClick={() => confirmDelete(doc.id)}
                    className="btn btn-link text-danger"
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            className="btn btn-primary me-2"
          >
            Sebelumnya
          </button>
          <button
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
            className="btn btn-primary"
          >
            Selanjutnya
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalAction === "add"
                    ? "Tambah Dokumentasi"
                    : modalAction === "edit"
                    ? "Edit Dokumentasi"
                    : "Lihat Dokumentasi"}
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
                    <h5>Judul: {currentDoc.title}</h5>
                    <p>Deskripsi: {currentDoc.description}</p>
                    <p>Konten: {currentDoc.content}</p>
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="img-thumbnail mb-3"
                      />
                    )}
                  </>
                ) : (
                  <form onSubmit={handleSave}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Judul
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={currentDoc.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Deskripsi
                      </label>
                      <ReactQuill
                        theme="snow"
                        value={currentDoc.description}
                        onChange={(value) =>
                          setCurrentDoc((prev) => ({
                            ...prev,
                            description: value,
                          }))
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="content" className="form-label">
                        Konten
                      </label>
                      <ReactQuill
                        theme="snow"
                        value={currentDoc.content}
                        onChange={(value) =>
                          setCurrentDoc((prev) => ({ ...prev, content: value }))
                        }
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

      {isConfirmOpen && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Konfirmasi Hapus</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsConfirmOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Apakah Anda yakin ingin menghapus data ini?</p>
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

export default ContentGalery;
