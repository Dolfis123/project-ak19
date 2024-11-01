import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill
import "../../../css/mycontent.css";
const MainContent = () => {
  const [currentHero, setCurrentHero] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal edit tidak langsung terbuka
  const [previewImage, setPreviewImage] = useState(null); // State untuk preview gambar

  // Fungsi untuk mengambil data hero dari backend
  const fetchHero = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3030/api/hero/heroes/1"
      ); // Ambil hero dengan id 1
      setCurrentHero(response.data);
      setPreviewImage(`http://localhost:3030/api${response.data.image_url}`);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching hero data", error);
      setIsLoading(false);
    }
  };

  // useEffect untuk mengambil data hero ketika komponen di-mount
  useEffect(() => {
    fetchHero();
  }, []);

  // Fungsi untuk membuka modal edit
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Fungsi untuk mengubah input teks
  const handleInputChange = (name, value) => {
    setCurrentHero((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Fungsi untuk preview gambar sebelum upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Set preview gambar
      setCurrentHero((prevState) => ({
        ...prevState,
        image: file, // Simpan file yang diunggah
      }));
    }
  };

  // Fungsi untuk menyimpan perubahan
  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentHero) return;

    const formData = new FormData();
    formData.append("title", currentHero.title);
    formData.append("description", currentHero.description);

    // Tambahkan file image jika ada
    if (currentHero.image) {
      formData.append("image", currentHero.image); // Gunakan key "image" yang sesuai di backend
    }

    try {
      await axios.put(
        `http://localhost:3030/api/hero/heroes/${currentHero.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      fetchHero(); // Refresh data setelah update
      closeModal();
    } catch (error) {
      console.error("Error saving hero", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!currentHero) {
    return <p>Data hero tidak ditemukan</p>;
  }

  return (
    <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
      {/* Bagian untuk menampilkan data hero */}
      <div
        className="p-6 d-flex flex-column align-items-center"
        style={{ maxWidth: "100%", overflow: "auto" }}
      >
        <h2 className="text-2xl font-bold text-center">{currentHero.title}</h2>
        <p
          className="mt-4 text-center"
          dangerouslySetInnerHTML={{ __html: currentHero.description }}
        ></p>
        {currentHero.image_url && (
          <img
            src={`http://localhost:3030/api${currentHero.image_url}`}
            alt={currentHero.title}
            className="img-fluid rounded-lg mt-4"
            style={{ maxWidth: "200px", height: "auto" }}
          />
        )}
        <div className="mt-4">
          <button onClick={openModal} className="btn btn-success">
            Edit Hero
          </button>
        </div>
      </div>

      {/* Modal untuk edit */}
      {isModalOpen && currentHero && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">Edit Hero</h2>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div
                className="modal-body"
                style={{ maxHeight: "70vh", overflowY: "auto" }}
              >
                <form onSubmit={handleSave}>
                  <div className="mb-3">
                    <label htmlFor="heroTitle" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="heroTitle"
                      name="title"
                      value={currentHero.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="heroDescription" className="form-label">
                      Description
                    </label>
                    <ReactQuill
                      theme="snow"
                      value={currentHero.description}
                      onChange={(content) =>
                        handleInputChange("description", content)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="heroImage" className="form-label">
                      Image
                    </label>
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="img-thumbnail mb-2"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    )}
                    <input
                      type="file"
                      className="form-control"
                      id="heroImage"
                      onChange={handleImageChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn btn-secondary ms-2"
                  >
                    Tutup
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
