const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const teamController = require("../controllers/teamController");

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Routes
router.post("/teams", upload.single("image"), teamController.createTeam);
// Tambahkan route untuk edit/update team member
router.put("/teams/:id", upload.single("image"), teamController.updateTeam);

router.get("/teams", teamController.getAllTeams);
router.get("/teams/:id", teamController.getTeamById);
router.delete("/teams/:id", teamController.deleteTeam);

module.exports = router;
