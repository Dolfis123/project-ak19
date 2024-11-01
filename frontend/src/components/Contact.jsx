import React, { useState, useRef } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Contact = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State untuk loading
  const formRef = useRef(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Mulai loading saat tombol diklik
    const formData = new FormData(event.target);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    setIsLoading(false); // Berhenti loading setelah respons diterima

    if (res.success) {
      setSuccessMessage("Pesan berhasil dikirim!");
      setIsModalOpen(true);
      formRef.current.reset(); // Reset form setelah pengiriman berhasil
    } else {
      console.error("Error", res);
      setSuccessMessage("");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="contact" className="contact section">
      <div className="container section-title">
        <h2>Kontak</h2>
      </div>

      <div className="container" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-5">
            <div className="info-wrap">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49353.58663399394!2d134.03646407787977!3d-0.8840194309500935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d540abdb9e20b2d%3A0x52f556dada3216a4!2sManokwari%2C%20Kec.%20Manokwari%20Bar.%2C%20Kabupaten%20Manokwari%2C%20Papua%20Bar.!5e0!3m2!1sid!2sid!4v1728618409460!5m2!1sid!2sid"
                frameBorder="0"
                style={{ border: "0", width: "100%", height: "270px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="col-lg-7">
            <form
              ref={formRef}
              onSubmit={onSubmit}
              action="/"
              method="post"
              className="php-email-form"
              data-aos-delay="200"
            >
              <input
                type="hidden"
                name="access_key"
                value="a67ff09b-70e8-46c6-b4d2-30f5087feec6"
              />

              <div className="row gy-4">
                <div className="col-md-6">
                  <label htmlFor="name-field" className="pb-2">
                    Nama Anda
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name-field"
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="email-field" className="pb-2">
                    Email Anda
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email-field"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <label htmlFor="subject-field" className="pb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    id="subject-field"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <label htmlFor="message-field" className="pb-2">
                    Pesan
                  </label>
                  <textarea
                    className="form-control"
                    name="message"
                    rows="10"
                    id="message-field"
                    required
                  ></textarea>
                </div>

                <div className="col-md-12 text-center">
                  <button type="submit" disabled={isLoading}>
                    {isLoading ? "Mengirim..." : "Kirim Pesan"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "30px",
            textAlign: "center",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            maxWidth: "400px",
            width: "90%",
            border: "1px solid #ddd",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <h3
          style={{
            color: "green",
            fontSize: "1.2em",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          {successMessage}
        </h3>
        <button
          onClick={closeModal}
          style={{
            padding: "10px 20px",
            fontSize: "1em",
            color: "#fff",
            backgroundColor: "green",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Tutup
        </button>
      </Modal>
    </section>
  );
};

export default Contact;
