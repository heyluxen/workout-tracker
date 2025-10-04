const express = require("express"); // Import express
const app = express(); // Create an instance of express
const { port } = require('./config/env'); // Import the port from the env file

// Inicializacion del servidor y primera ruta
app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// PUT /api/v1/workouts/:id
const updateWorkout = (req, res) => {
  const { id } = req.params;
  const { name, description, exercises, estimatedDuration } = req.body;

  const index = workouts.findIndex(w => w.id === id);
  if (index === -1) return res.status(404).json({ error: "Entrenamiento no encontrado" });

  workouts[index] = {
    ...workouts[index],
    name,
    description,
    exercises,
    estimatedDuration
  };

  res.status(200).json(workouts[index]);
};

// PATCH /api/v1/workouts/:id
const patchWorkout = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const index = workouts.findIndex(w => w.id === id);
  if (index === -1) return res.status(404).json({ error: "Entrenamiento no encontrado" });

  workouts[index] = {
    ...workouts[index],
    ...updates
  };

  res.status(200).json(workouts[index]);
};