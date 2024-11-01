const express = require("express");
const router = express.Router();
const documentationController = require("../controllers/documentationController");

// Route untuk get dan delete tidak perlu middleware multer
router.get("/documentation", documentationController.getAllDocumentation);
router.get("/documentation/:id", documentationController.getDocumentationById);
router.post("/documentation", documentationController.createDocumentation);
router.put("/documentation/:id", documentationController.updateDocumentation);
router.delete(
  "/documentation/:id",
  documentationController.deleteDocumentation
);

module.exports = router;
