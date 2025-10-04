// Estado en memoria (simulación)
let reports = [
  {
    id: "rpt-001",
    id_usuario: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    fecha_inicio: "2025-09-01",
    resumen_progreso: {
      series_totales: 120,
      ejercicios_completados: 45
    },
    createdAt: "2025-09-02T12:00:00Z"
  },

    {
    id: "rpt-002",
    id_usuario: "a12b34cd-5e67-8f90-gh12-ij34kl56mn78",
    fecha_inicio: "2025-09-15",
    resumen_progreso: {
        series_totales: 80,
        ejercicios_completados: 30
    },
    createdAt: "2025-09-16T09:30:00Z"
    }
];

// GET /api/v1/reports
const getReports = (req, res) => {
  res.status(200).json(reports);
};

// GET /api/v1/reports/:id
const getReportById = (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "ID inválido" });

  const report = reports.find(r => r.id === id);
  if (!report) return res.status(404).json({ error: "Reporte no encontrado" });

  res.status(200).json(report);
};

// POST /api/v1/reports
const createReport = (req, res) => {
  const { id_usuario, fecha_inicio, resumen_progreso } = req.body;

  if (!id_usuario || !fecha_inicio || !resumen_progreso) {
    return res
      .status(400)
      .json({ error: "id_usuario, fecha_inicio y resumen_progreso son requeridos" });
  }

  const newReport = {
    id: `rpt-${Date.now()}`,
    id_usuario,
    fecha_inicio,
    resumen_progreso,
    createdAt: new Date().toISOString()
  };

  reports.push(newReport);
  res.status(201).json(newReport);
};

// PUT /api/v1/reports/:id
const updateReport = (req, res) => {
  const { id } = req.params;
  const { id_usuario, fecha_inicio, resumen_progreso } = req.body;

  const index = reports.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).json({ error: "Reporte no encontrado" });

  if (!id_usuario || !fecha_inicio || !resumen_progreso) {
    return res
      .status(400)
      .json({ error: "id_usuario, fecha_inicio y resumen_progreso son requeridos" });
  }

  reports[index] = {
    ...reports[index],
    id_usuario,
    fecha_inicio,
    resumen_progreso
  };

  res.status(200).json(reports[index]);
};

// PATCH /api/v1/reports/:id
const patchReport = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const index = reports.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).json({ error: "Reporte no encontrado" });

  reports[index] = {
    ...reports[index],
    ...updates
  };

  res.status(200).json(reports[index]);
};

// DELETE /api/v1/reports/:id
const deleteReport = (req, res) => {
  const { id } = req.params;
  const index = reports.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).json({ error: "Reporte no encontrado" });

  const deleted = reports.splice(index, 1);
  res.status(200).json({ deleted: deleted[0].id });
};

module.exports = {
  getReports,
  getReportById,
  createReport,
  updateReport,
  patchReport,
  deleteReport
};