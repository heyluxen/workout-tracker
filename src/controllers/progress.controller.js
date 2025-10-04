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