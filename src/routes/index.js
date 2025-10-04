const express = require("express");
const router = express.Router();

const v1Routes = require("./v1");

// Documentación básica
router.get("/", (req, res) => {
  res.json({
    message: "Workout Tracker API",
    versions: ["v1"],
    endpoints: {
      users: "/api/v1/users",
      workouts: "/api/v1/workouts",
      exercises: "/api/v1/exercises"
    }
  });
});

// Montar v1
router.use("/v1", v1Routes);

module.exports = router;
