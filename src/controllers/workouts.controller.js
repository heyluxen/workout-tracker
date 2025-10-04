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

