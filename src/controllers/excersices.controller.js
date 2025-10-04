// Estado en memoria (simulación)
let exercises = [
  {
    id: "1",
    workoutId: "1",
    name: "Press de banca",
    description: "Ejercicio de pecho",
    series: 4,
    reps: 10,
    weight: 60,
    rest: 90
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