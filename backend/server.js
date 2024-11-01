const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const session = require("express-session");
const sequelize = require("./config/database");
const documentationRoutes = require("./routes/documentationRoute");
const teamRoutes = require("./routes/teamRoutes");
const heroRoutes = require("./routes/heroRoutes");
const tentangKami = require("./routes/tentangKamiRoutes");

const app = express();
// Middleware untuk file statis
app.use("/api/images", express.static(path.join(__dirname, "public/images")));
app.use("/api/uploads", express.static(path.join(__dirname, "public/uploads")));

// Middleware lainnya
app.use(express.json());
app.use(
  session({
    secret: "secretkey", // Ganti dengan secret yang lebih aman
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: "http://localhost:5173", // Set this to your frontend URL
    credentials: true, // Allow credentials to be sent
  })
);

app.use(bodyParser.json());
// Gunakan pesanRoutes untuk route /pesan

app.use("/api/auth", authRoutes);
app.use("/api/documentation", documentationRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/about", tentangKami);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");

    // Sinkronisasi model dengan database
    return sequelize.sync(); // Sinkronisasi model ke database (buat tabel jika belum ada)
  })
  .then(() => {
    console.log("Sinkronisasi tabel selesai.");
  })
  .catch((err) => console.log("Error: " + err));

const PORT = process.env.PORT || 6060;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
