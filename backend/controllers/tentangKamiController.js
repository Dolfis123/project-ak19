// controllers/tentangKamiController.js
const TentangKami = require("../models/tentangKamiModel");

// Get data "Tentang Kami"
exports.getTentangKami = async (req, res) => {
  try {
    const tentangKami = await TentangKami.findAll();
    res.status(200).json(tentangKami);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Tentang Kami data" });
  }
};

// Create new "Tentang Kami" data
exports.createTentangKami = async (req, res) => {
  try {
    const { gambaran_singkat, visi, misi, nilai_utama } = req.body;

    const newTentangKami = await TentangKami.create({
      gambaran_singkat,
      visi,
      misi,
      nilai_utama,
    });

    res.status(201).json(newTentangKami);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Tentang Kami" });
  }
};

// Update data "Tentang Kami"
exports.updateTentangKami = async (req, res) => {
  try {
    const { id } = req.params;
    const { gambaran_singkat, visi, misi, nilai_utama } = req.body;

    const tentangKami = await TentangKami.findByPk(id);
    if (!tentangKami) {
      return res.status(404).json({ error: "Tentang Kami not found" });
    }

    await tentangKami.update({
      gambaran_singkat,
      visi,
      misi,
      nilai_utama,
    });

    res.status(200).json(tentangKami);
  } catch (error) {
    res.status(500).json({ error: "Failed to update Tentang Kami" });
  }
};
