// src/routes/v1/progress.routes.js
const express = require("express");
const {
  getProgress,
  getProgressById,
  createProgress,
  updateProgress,
  patchProgress,
  deleteProgress,
  getProgressStats
} = require("../../controllers/progress.controller");

const router = express.Router();

router.get("/", getProgress);
router.get("/:id", getProgressById);
router.post("/", createProgress);
router.put("/:id", updateProgress);
router.patch("/:id", patchProgress);
router.delete("/:id", deleteProgress);
router.get("/stats/all", getProgressStats); // se puede usar /progress/stats también

module.exports = router;
