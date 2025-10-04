const express = require("express");
const router = express.Router();

const usersRoutes = require("./users.routes");

// Rutas de la API
router.use("/users", usersRoutes);
router.use("/workouts", workoutsRoutes);

module.exports = router;
