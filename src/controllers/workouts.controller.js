// Estado en memoria (simulación)
let workouts = [
  {
    id: "1",
    name: "Rutina de fuerza",
    description: "Entrenamiento de pecho y tríceps",
    userId: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    exercises: [],
    createdAt: new Date().toISOString(),
    estimatedDuration: 60
  }
];

// GET /api/v1/workouts?userId=...&minDuration=...
const getAllWorkouts = (req, res) => {
  const { userId, minDuration } = req.query;
  let result = workouts;

  if (userId) {
    result = result.filter(w => w.userId === userId);
  }

  if (minDuration) {
    result = result.filter(w => w.estimatedDuration >= parseInt(minDuration));
  }

  res.status(200).json(result);
};

// GET /api/v1/workouts/:id
const getWorkoutById = (req, res) => {
  const { id } = req.params;
  const workout = workouts.find(w => w.id === id);
  if (!workout) return res.status(404).json({ error: "Entrenamiento no encontrado" });
  res.status(200).json(workout);
};

// POST /api/v1/workouts
const createWorkout = (req, res) => {
  const { name, description, userId, exercises, estimatedDuration } = req.body;

  if (!name || !userId) {
    return res.status(400).json({ error: "Name y userId son requeridos" });
  }

  const newWorkout = {
    id: `${Date.now()}`,
    name,
    description,
    userId,
    exercises: exercises || [],
    createdAt: new Date().toISOString(),
    estimatedDuration: estimatedDuration || 0
  };

  workouts.push(newWorkout);
  res.status(201).json(newWorkout);
};

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

// DELETE /api/v1/workouts/:id
const deleteWorkout = (req, res) => {
  const { id } = req.params;
  const index = workouts.findIndex(w => w.id === id);
  if (index === -1) return res.status(404).json({ error: "Entrenamiento no encontrado" });

  const deleted = workouts.splice(index, 1);
  res.status(200).json({ deleted: deleted[0].id });
};

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  patchWorkout,
  deleteWorkout
};