// controllers/heroController.js

const Hero = require("../models/Hero");
const path = require("path");
const fs = require("fs");

// Set up multer for file uploads
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Get all heroes
exports.getAllHeroes = async (req, res) => {
  try {
    const heroes = await Hero.findAll();
    res.status(200).json(heroes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch heroes" });
  }
};

// Get a single hero by ID
exports.getHeroById = async (req, res) => {
  try {
    const hero = await Hero.findByPk(req.params.id);
    if (!hero) {
      return res.status(404).json({ error: "Hero not found" });
    }
    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hero" });
  }
};

// Create a new hero
exports.createHero = [
  upload.single("image"), // Middleware untuk menangani upload file
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const image_url = req.file ? `/images/${req.file.filename}` : null;

      const newHero = await Hero.create({
        title,
        description,
        image_url,
      });
      res.status(201).json(newHero);
    } catch (error) {
      res.status(500).json({ error: "Failed to create hero" });
    }
  },
];

// Update an existing hero
exports.updateHero = [
  upload.single("image"), // Middleware untuk menangani upload file
  async (req, res) => {
    try {
      const hero = await Hero.findByPk(req.params.id);
      if (!hero) {
        return res.status(404).json({ error: "Hero not found" });
      }

      const { title, description } = req.body;
      let image_url = hero.image_url;

      if (req.file) {
        // Delete the old image if a new one is uploaded
        if (image_url) {
          const oldImagePath = path.join(__dirname, "../public", image_url);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        image_url = `/images/${req.file.filename}`;
      }

      await hero.update({ title, description, image_url });
      res.status(200).json(hero);
    } catch (error) {
      res.status(500).json({ error: "Failed to update hero" });
    }
  },
];

// Delete a hero
exports.deleteHero = async (req, res) => {
  try {
    const hero = await Hero.findByPk(req.params.id);
    if (!hero) {
      return res.status(404).json({ error: "Hero not found" });
    }

    // Delete the image from the server if it exists
    if (hero.image_url) {
      const imagePath = path.join(__dirname, "../public", hero.image_url);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await hero.destroy();
    res.status(200).json({ message: "Hero deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete hero" });
  }
};
