// routes/heroRoutes.js

const express = require("express");
const router = express.Router();
const heroController = require("../controllers/heroController");

// Route untuk operasi CRUD
router.get("/heroes", heroController.getAllHeroes);
router.get("/heroes/:id", heroController.getHeroById);
router.post("/heroes", heroController.createHero); // Create hero, menggunakan middleware untuk upload gambar
router.put("/heroes/:id", heroController.updateHero); // Update hero, menggunakan middleware untuk upload gambar
router.delete("/heroes/:id", heroController.deleteHero); // Delete hero

module.exports = router;
