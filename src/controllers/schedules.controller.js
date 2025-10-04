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

// Crear nueva programación POST
const createSchedule = (req, res) => {
  const { workoutId, userId, date, time } = req.body;

  if (!workoutId || !userId || !date || !time) {
    return res.status(400).json({ error: "workoutId, userId, date y time son requeridos" });
  }

  const newSchedule = {
    id: `${Date.now()}`,
    workoutId,
    userId,
    date,
    time
  };

  schedules.push(newSchedule);
  res.status(201).json(newSchedule);
};

// Actualizar completa (PUT)
const updateSchedule = (req, res) => {
  const { id } = req.params;
  const { workoutId, userId, date, time } = req.body;

  const index = schedules.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ error: "Programación no encontrada" });

  schedules[index] = {
    ...schedules[index],
    workoutId,
    userId,
    date,
    time
  };

  res.status(200).json(schedules[index]);
};

// Actualizar parcial (PATCH)
const patchSchedule = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const index = schedules.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ error: "Programación no encontrada" });

  schedules[index] = {
    ...schedules[index],
    ...updates
  };

  res.status(200).json(schedules[index]);
};