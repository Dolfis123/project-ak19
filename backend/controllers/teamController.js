const Team = require("../models/team");
const path = require("path");
const fs = require("fs");

// Create Team Member
exports.createTeam = async (req, res) => {
  try {
    const {
      name,
      position,
      bio,
      facebook_url,
      twitter_url,
      instagram_url,
      linkedin_url,
    } = req.body;

    // Save image if available
    let image_url = null;
    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
    }

    const teamMember = await Team.create({
      name,
      position,
      bio,
      image_url,
      facebook_url,
      twitter_url,
      instagram_url,
      linkedin_url,
    });

    res.status(201).json(teamMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update Team Member
exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      position,
      bio,
      facebook_url,
      twitter_url,
      instagram_url,
      linkedin_url,
    } = req.body;

    // Temukan anggota tim berdasarkan ID
    const teamMember = await Team.findByPk(id);
    if (!teamMember)
      return res.status(404).json({ error: "Team member not found" });

    // Cek jika ada file gambar baru
    let image_url = teamMember.image_url; // Gunakan gambar lama sebagai default
    if (req.file) {
      // Hapus gambar lama jika ada
      if (image_url) {
        const oldImagePath = path.join(__dirname, "../public", image_url);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      // Update dengan gambar baru
      image_url = `/uploads/${req.file.filename}`;
    }

    // Update data anggota tim
    await teamMember.update({
      name,
      position,
      bio,
      image_url,
      facebook_url,
      twitter_url,
      instagram_url,
      linkedin_url,
    });

    res.json(teamMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Team Members
exports.getAllTeams = async (req, res) => {
  try {
    const teamMembers = await Team.findAll();
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Team Member by ID
exports.getTeamById = async (req, res) => {
  try {
    const teamMember = await Team.findByPk(req.params.id);
    if (!teamMember)
      return res.status(404).json({ error: "Team member not found" });
    res.json(teamMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Team Member
exports.deleteTeam = async (req, res) => {
  try {
    const teamMember = await Team.findByPk(req.params.id);
    if (!teamMember)
      return res.status(404).json({ error: "Team member not found" });

    // Delete image from uploads folder
    if (teamMember.image_url) {
      const imagePath = path.join(__dirname, "../public", teamMember.image_url);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await teamMember.destroy();
    res.json({ message: "Team member deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
