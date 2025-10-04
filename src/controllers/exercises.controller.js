// Estado en memoria (simulación)
let exercises = [
  {
    id: "4",
    workoutId: "1",
    name: "Press de banca",
    description: "Ejercicio de pecho",
    series: 4,
    reps: 10,
    weight: 60,
    rest: 90
  },

  {
    id: "7",
    workoutId: "2",
    name: "Sentadillas",
    description: "Ejercicio de piernas",
    series: 4,
    reps: 12,
    weight: 80,
    rest: 120
  }

];

// GET /api/v1/exercises?workoutId=...&search=...
const getAllExercises = (req, res) => {
  const { workoutId, search } = req.query;
  let result = exercises;

  // Filtrar por workoutId
  if (workoutId) {
    result = result.filter(e => e.workoutId === workoutId);
  }

  // Buscar por nombre
  if (search) {
    result = result.filter(e =>
      e.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.status(200).json(result);
};

// GET /api/v1/exercises/:id
const getExerciseById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID inválido" });
  }

  const exercise = exercises.find(e => e.id === id);
  if (!exercise) return res.status(404).json({ error: "Ejercicio no encontrado" });

  res.status(200).json(exercise);
};

// POST /api/v1/exercises
const createExercise = (req, res) => {
  const { workoutId, name, description, series, reps, weight, rest } = req.body;

  if (!workoutId || !name) {
    return res.status(400).json({ error: "workoutId y name son requeridos" });
  }

  const newExercise = {
    id: `${Date.now()}`,
    workoutId,
    name,
    description: description || "",
    series: series || 0,
    reps: reps || 0,
    weight: weight || null,
    rest: rest || 60
  };

  exercises.push(newExercise);
  res.status(201).json(newExercise);
};

// PUT /api/v1/exercises/:id
const updateExercise = (req, res) => {
  const { id } = req.params;
  const { name, description, series, reps, weight, rest } = req.body;

  if (!name || !series || !reps) {
    return res.status(400).json({ error: "name, series y reps son requeridos" });
  }

  const index = exercises.findIndex(e => e.id === id);
  if (index === -1) return res.status(404).json({ error: "Ejercicio no encontrado" });

  exercises[index] = {
    ...exercises[index],
    name,
    description,
    series,
    reps,
    weight,
    rest
  };

  res.status(200).json(exercises[index]);
};

// PATCH /api/v1/exercises/:id
const patchExercise = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const index = exercises.findIndex(e => e.id === id);
  if (index === -1) return res.status(404).json({ error: "Ejercicio no encontrado" });

  exercises[index] = {
    ...exercises[index],
    ...updates
  };

  res.status(200).json(exercises[index]);
};

// DELETE /api/v1/exercises/:id
const deleteExercise = (req, res) => {
  const { id } = req.params;
  const index = exercises.findIndex(e => e.id === id);
  if (index === -1) return res.status(404).json({ error: "Ejercicio no encontrado" });

  const deleted = exercises.splice(index, 1);
  res.status(200).json({ deleted: deleted[0].id });
};

module.exports = {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  patchExercise,
  deleteExercise
};