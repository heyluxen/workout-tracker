const express = require("express");
const router = express.Router();
const {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  patchSchedule,
  deleteSchedule
} = require("../../controllers/schedules.controller");

// Rutas base: /api/v1/schedules
router.get("/", getAllSchedules);
router.get("/:id", getScheduleById);
router.post("/", createSchedule);
router.put("/:id", updateSchedule);
router.patch("/:id", patchSchedule);
router.delete("/:id", deleteSchedule);

module.exports = router;
