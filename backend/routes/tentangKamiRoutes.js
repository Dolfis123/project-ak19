// routes/tentangKamiRoutes.js
const express = require("express");
const router = express.Router();
const tentangKamiController = require("../controllers/tentangKamiController");

// Route untuk mendapatkan data "Tentang Kami"
router.get("/tentangkami", tentangKamiController.getTentangKami);
router.post("/tentangkami", tentangKamiController.createTentangKami);
// Route untuk memperbarui data "Tentang Kami"
router.put("/tentangkami/:id", tentangKamiController.updateTentangKami);

module.exports = router;
