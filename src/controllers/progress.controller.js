// Estado en memoria (simulación)
let progressRecords = [
  {
    id: "prog-001",
    id_usuario: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    fecha_registro: "2025-09-20",
    peso_corporal: 70.5,
    medidas: {
      pecho: 95,
      cintura: 80,
      cadera: 90
    },
    porcentaje_grasa: 18.2,
    records_personales: ["press banca 80kg", "sentadilla 100kg"],
    createdAt: "2025-09-20T10:00:00Z"
  },

    {
    id: "prog-002",
    id_usuario: "a12b34cd-5e67-8f90-gh12-ij34kl56mn78",
    fecha_registro: "2025-09-22",
    peso_corporal: 65.0,
    medidas: {
        pecho: 90,
        cintura: 75,
        cadera: 85
    },
    porcentaje_grasa: 15.0,
    records_personales: ["carrera 5km 25min", "burpees 50"],
    createdAt: "2025-09-22T14:30:00Z"
    }
];

// GET /api/v1/progress
const getProgress = (req, res) => {
  res.status(200).json(progressRecords);
};

// GET /api/v1/progress/:id
const getProgressById = (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "ID inválido" });

  const record = progressRecords.find(p => p.id === id);
  if (!record) return res.status(404).json({ error: "Registro no encontrado" });

  res.status(200).json(record);
};

// GET /api/v1/progress/stats
const getProgressStats = (req, res) => {
  if (progressRecords.length === 0)
    return res.status(200).json({ message: "No hay datos registrados aún" });

  const totalPeso = progressRecords.reduce((acc, p) => acc + (p.peso_corporal || 0), 0);
  const promedioPeso = totalPeso / progressRecords.length;

  res.status(200).json({
    total_registros: progressRecords.length,
    peso_promedio: promedioPeso.toFixed(2),
    ultimo_registro: progressRecords[progressRecords.length - 1]
  });
};

// POST /api/v1/progress
const createProgress = (req, res) => {
  const { id_usuario, fecha_registro, peso_corporal, medidas, porcentaje_grasa, records_personales } = req.body;

  if (!id_usuario || !fecha_registro) {
    return res.status(400).json({ error: "id_usuario y fecha_registro son requeridos" });
  }

  const newRecord = {
    id: `prog-${Date.now()}`,
    id_usuario,
    fecha_registro,
    peso_corporal: peso_corporal || null,
    medidas: medidas || {},
    porcentaje_grasa: porcentaje_grasa || null,
    records_personales: records_personales || [],
    createdAt: new Date().toISOString()
  };

  progressRecords.push(newRecord);
  res.status(201).json(newRecord);
};

// PUT /api/v1/progress/:id
const updateProgress = (req, res) => {
  const { id } = req.params;
  const { id_usuario, fecha_registro, peso_corporal, medidas, porcentaje_grasa, records_personales } = req.body;

  const index = progressRecords.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Registro no encontrado" });

  if (!id_usuario || !fecha_registro) {
    return res.status(400).json({ error: "id_usuario y fecha_registro son requeridos" });
  }

  progressRecords[index] = {
    ...progressRecords[index],
    id_usuario,
    fecha_registro,
    peso_corporal,
    medidas,
    porcentaje_grasa,
    records_personales
  };

  res.status(200).json(progressRecords[index]);
};

// PATCH /api/v1/progress/:id
const patchProgress = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const index = progressRecords.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Registro no encontrado" });

  progressRecords[index] = {
    ...progressRecords[index],
    ...updates
  };

  res.status(200).json(progressRecords[index]);
};

// DELETE /api/v1/progress/:id
const deleteProgress = (req, res) => {
  const { id } = req.params;
  const index = progressRecords.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Registro no encontrado" });

  const deleted = progressRecords.splice(index, 1);
  res.status(200).json({ deleted: deleted[0].id });
};

module.exports = {
  getProgress,
  getProgressById,
  createProgress,
  updateProgress,
  patchProgress,
  deleteProgress,
  getProgressStats
};