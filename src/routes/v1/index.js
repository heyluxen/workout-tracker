const express = require("express");
const router = express.Router();

const usersRoutes = require("./users.routes");
const workoutsRoutes = require("./workouts.routes");
const exercisesRoutes = require("./exercises.routes");
const schedulesRoutes = require("./schedules.routes");

// Rutas de la API
router.use("/users", usersRoutes);
router.use("/workouts", workoutsRoutes);
router.use("/exercises", exercisesRoutes);
router.use("/schedules", schedulesRoutes);

module.exports = router;
