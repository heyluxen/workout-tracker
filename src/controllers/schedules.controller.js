// Estado en memoria (simulación)
let schedules = [
  {
    id: "1",
    workoutId: "1",
    userId: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    date: "2025-10-10",
    time: "08:00"
  }
];

// Obtener todos (con filtros opcionales por userId o workoutId) GET
const getAllSchedules = (req, res) => {
  const { userId, workoutId } = req.query;
  let result = schedules;

  if (userId) {
    result = result.filter(s => s.userId === userId);
  }

  if (workoutId) {
    result = result.filter(s => s.workoutId === workoutId);
  }

  res.status(200).json(result);
};

// Obtener uno por id GET
const getScheduleById = (req, res) => {
  const { id } = req.params;
  const schedule = schedules.find(s => s.id === id);
  if (!schedule) return res.status(404).json({ error: "Programación no encontrada" });
  res.status(200).json(schedule);
};