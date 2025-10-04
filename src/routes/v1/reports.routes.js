// src/routes/v1/reports.routes.js
const express = require("express");
const {
  getReports,
  getReportById,
  createReport,
  updateReport,
  patchReport,
  deleteReport
} = require("../../controllers/reports.controller");

const router = express.Router();

router.get("/", getReports);
router.get("/:id", getReportById);
router.post("/", createReport);
router.put("/:id", updateReport);
router.patch("/:id", patchReport);
router.delete("/:id", deleteReport);

module.exports = router;
