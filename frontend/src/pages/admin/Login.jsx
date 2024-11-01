import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import logo from "../../images/logo.webp"; // Logo

Modal.setAppElement("#root");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk mengontrol modal
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3030/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // Tampilkan modal sukses
        setIsModalOpen(true);

        // Redirect berdasarkan peran setelah menutup modal
        setTimeout(() => {
          setIsModalOpen(false);
          if (data.role === "users") {
            navigate("/pegawai-absensi");
          } else if (data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/all-role");
          }
        }, 2000); // Modal akan otomatis tertutup dalam 2 detik
      } else {
        setError(data.message || "Login gagal, silakan coba lagi.");
      }
    } catch (err) {
      setError("Terjadi kesalahan server, silakan coba lagi nanti.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark max-w-sm w-full p-6">
        <br />
        <br />
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 object-cover rounded-full shadow-lg"
            style={{ width: "130px" }}
          />
          <h2 className="mt-4 text-2xl font-bold">PT Kita Sehati</h2>
        </div>

        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm mx-auto"
          style={{ width: "430px" }}
        >
          {/* Email input */}
          <div className="form-outline mb-4">
            <input
              type="email"
              id="form2Example1"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email address"
            />
          </div>

          {/* Password input with eye icon */}
          <div className="form-outline mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="form2Example2"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              style={{ paddingRight: "2.5rem" }} // Extra padding for icon
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 mb-4" style={{ color: "red" }}>
              {error}
            </p>
          )}
          {/* Submit Button */}
          <button type="submit" className="btn btn-primary btn-block mb-4">
            Masuk
          </button>
        </form>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            padding: "30px",
            textAlign: "center",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            maxWidth: "400px",
            width: "90%",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <h3 style={{ color: "green", fontSize: "1.2em", fontWeight: "bold" }}>
          Login Berhasil!
        </h3>
      </Modal>
    </div>
  );
};

export default Login;
