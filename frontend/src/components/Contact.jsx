import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="contact section">
      {/* Section Title */}
      <div className="container section-title">
        <h2>Kontak</h2>
      </div>
      {/* End Section Title */}

      <div className="container" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-5">
            <div className="info-wrap">
              <div className="info-item d-flex" data-aos-delay="200">
                <i className="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h3>Alamat</h3>
                  <p>A108 Adam Street, New York, NY 535022</p>
                </div>
              </div>
              {/* End Info Item */}

              <div className="info-item d-flex" data-aos-delay="300">
                <i className="bi bi-telephone flex-shrink-0"></i>
                <div>
                  <h3>Hubungi Kami</h3>
                  <p>+1 5589 55488 55</p>
                </div>
              </div>
              {/* End Info Item */}

              <div className="info-item d-flex" data-aos-delay="400">
                <i className="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h3>Email Kami</h3>
                  <p>info@example.com</p>
                </div>
              </div>

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
              action="/"
              method="post"
              className="php-email-form"
              data-aos-delay="200"
            >
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
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">
                    Your message has been sent. Thank you!
                  </div>

                  <button type="submit">Kirim Pesan</button>
                </div>
              </div>
            </form>
          </div>
          {/* End Contact Form */}
        </div>
      </div>
    </section>
  );
};

export default Contact;
