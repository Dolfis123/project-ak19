import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill

const ContentAbout = () => {
  const [currentTentangKami, setCurrentTentangKami] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // State untuk mode edit
  const [newTentangKami, setNewTentangKami] = useState({
    id: null,
    gambaran_singkat: "",
    visi: "",
    misi: "",
    nilai_utama: "",
  });

  // Fungsi untuk mengambil data "Tentang Kami" dari backend
  const fetchTentangKami = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3030/api/about/tentangkami"
      );
      setCurrentTentangKami(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Tentang Kami data", error);
      setIsLoading(false);
    }
  };

  // useEffect untuk mengambil data ketika komponen di-mount
  useEffect(() => {
    fetchTentangKami();
  }, []);

  // Fungsi untuk membuka modal tambah/edit
  const openModal = (item = null) => {
    if (item) {
      setIsEditMode(true);
      setNewTentangKami(item); // Mengisi data ke form untuk edit
    } else {
      setIsEditMode(false);
      setNewTentangKami({
        id: null,
        gambaran_singkat: "",
        visi: "",
        misi: "",
        nilai_utama: "",
      });
    }
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Fungsi untuk mengubah input teks
  const handleInputChange = (name, value) => {
    setNewTentangKami((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Fungsi untuk menambah data baru "Tentang Kami"
  const addTentangKami = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3030/api/about/tentangkami",
        newTentangKami
      );
      setCurrentTentangKami((prevData) => [...prevData, response.data]);
      closeModal();
    } catch (error) {
      console.error("Error adding Tentang Kami data", error);
    }
  };

  // Fungsi untuk mengedit data "Tentang Kami"
  const editTentangKami = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:3030/api/about/tentangkami/${newTentangKami.id}`,
        newTentangKami
      );
      setCurrentTentangKami((prevData) =>
        prevData.map((item) =>
          item.id === newTentangKami.id ? newTentangKami : item
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error updating Tentang Kami data", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center">Tentang Kami</h2>
        <ul>
          {currentTentangKami.map((item) => (
            <li key={item.id}>
              <p
                dangerouslySetInnerHTML={{ __html: item.gambaran_singkat }}
              ></p>
              <p dangerouslySetInnerHTML={{ __html: item.misi }}></p>
              <p dangerouslySetInnerHTML={{ __html: item.nilai_utama }}></p>
              <button
                onClick={() => openModal(item)}
                className="btn btn-success"
              >
                Edit Data
              </button>
            </li>
          ))}
        </ul>
        {/* <div className="mt-4">
          <button onClick={() => openModal()} className="btn btn-success">
            Tambah Tentang Kami
          </button>
        </div> */}
      </div>

      {isModalOpen && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">
                  {isEditMode ? "Edit Tentang Kami" : "Tambah Tentang Kami"}
                </h2>
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
                <form onSubmit={isEditMode ? editTentangKami : addTentangKami}>
                  <div className="mb-3">
                    <label htmlFor="gambaran_singkat" className="form-label">
                      Gambaran Singkat
                    </label>
                    <ReactQuill
                      theme="snow"
                      value={newTentangKami.gambaran_singkat}
                      onChange={(content) =>
                        handleInputChange("gambaran_singkat", content)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="visi" className="form-label">
                      Visi
                    </label>
                    <ReactQuill
                      theme="snow"
                      value={newTentangKami.visi}
                      onChange={(content) => handleInputChange("visi", content)}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="mb-3">
                      <label htmlFor="misi" className="form-label">
                        Misi
                      </label>
                      <ReactQuill
                        theme="snow"
                        value={newTentangKami.misi}
                        onChange={(content) =>
                          handleInputChange("misi", content)
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="mb-3">
                      <label htmlFor="nilai_utama" className="form-label">
                        Nilai Utama
                      </label>
                      <ReactQuill
                        theme="snow"
                        value={newTentangKami.nilai_utama}
                        onChange={(content) =>
                          handleInputChange("nilai_utama", content)
                        }
                      />
                    </div>
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

export default ContentAbout;
