const Documentation = require("../models/Documentation");
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

// Get all documentation
exports.getAllDocumentation = async (req, res) => {
  try {
    const documentation = await Documentation.findAll();
    res.status(200).json(documentation);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch documentation" });
  }
};

// Get a single documentation by ID
exports.getDocumentationById = async (req, res) => {
  try {
    const documentation = await Documentation.findByPk(req.params.id);
    if (!documentation) {
      return res.status(404).json({ error: "Documentation not found" });
    }
    res.status(200).json(documentation);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch documentation" });
  }
};

// Create a new documentation
exports.createDocumentation = [
  upload.single("image"), // Middleware untuk menangani upload file
  async (req, res) => {
    try {
      const { title, description, content } = req.body;
      const image_url = req.file ? `/images/${req.file.filename}` : null;

      const newDocumentation = await Documentation.create({
        title,
        description,
        image_url,
        content,
      });
      res.status(201).json(newDocumentation);
    } catch (error) {
      res.status(500).json({ error: "Failed to create documentation" });
    }
  },
];

// Update an existing documentation
exports.updateDocumentation = [
  upload.single("image"), // Middleware untuk menangani upload file
  async (req, res) => {
    try {
      const documentation = await Documentation.findByPk(req.params.id);
      if (!documentation) {
        return res.status(404).json({ error: "Documentation not found" });
      }

      const { title, description, content } = req.body;
      let image_url = documentation.image_url;

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

      await documentation.update({ title, description, image_url, content });
      res.status(200).json(documentation);
    } catch (error) {
      res.status(500).json({ error: "Failed to update documentation" });
    }
  },
];

// Delete a documentation
exports.deleteDocumentation = async (req, res) => {
  try {
    const documentation = await Documentation.findByPk(req.params.id);
    if (!documentation) {
      return res.status(404).json({ error: "Documentation not found" });
    }

    // Delete the image from the server if it exists
    if (documentation.image_url) {
      const imagePath = path.join(
        __dirname,
        "../public",
        documentation.image_url
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await documentation.destroy();
    res.status(200).json({ message: "Documentation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete documentation" });
  }
};
