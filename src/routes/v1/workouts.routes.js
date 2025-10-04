const express = require("express");
const router = express.Router();
const {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  patchWorkout,
  deleteWorkout
} = require("../../controllers/workouts.controller");

// Rutas workouts
router.get("/", getAllWorkouts);
router.get("/:id", getWorkoutById);
router.post("/", createWorkout);
router.put("/:id", updateWorkout);
router.patch("/:id", patchWorkout);
router.delete("/:id", deleteWorkout);

module.exports = router;
