import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.webp"; // Logo

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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

        if (data.role === "users") {
          navigate("/pegawai-absensi");
        } else if (data.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/all-role");
        }
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

          {/* Password input */}
          <div className="form-outline mb-4">
            <input
              type={showPassword ? "text" : "password"}
              id="form2Example2"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
            <div
              onClick={togglePasswordVisibility}
              className="cursor-pointer text-right mt-2 text-sm btn"
            >
              {showPassword ? "Sembunyikan Password" : "Tampilkan Password"}
            </div>
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

          {/* Social Buttons */}
          <div className="text-center">
            <div className="flex justify-center space-x-3">
              <button type="button" className="btn btn-link btn-floating">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button type="button" className="btn btn-link btn-floating">
                <i className="fab fa-google"></i>
              </button>
              <button type="button" className="btn btn-link btn-floating">
                <i className="fab fa-twitter"></i>
              </button>
              <button type="button" className="btn btn-link btn-floating">
                <i className="fab fa-github"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
