const express = require("express");
const router = express.Router();
const {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  patchExercise,
  deleteExercise
} = require("../../controllers/exercises.controller");

// Rutas exercises
router.get("/", getAllExercises);
router.get("/:id", getExerciseById);
router.post("/", createExercise);
router.put("/:id", updateExercise);
router.patch("/:id", patchExercise);
router.delete("/:id", deleteExercise);

module.exports = router;