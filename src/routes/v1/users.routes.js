const express = require("express");
const router = express.Router();

// Estado en memoria (simulación)
let users = [
  {
    id: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    name: "Carlos Navia",
    email: "carlos@example.com",
    role: "user",
    createdAt: "2025-09-12T12:00:00Z"
  }
];

// GET /api/v1/users?role=...&search=...
router.get("/", (req, res) => {
  const { role, search } = req.query;
  let result = users;

  if (role) {
    result = result.filter(u => u.role === role);
  }

  if (search) {
    result = result.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.status(200).json(result);
});

// Validación de id (ejemplo para GET /:id) — reemplazar la lógica anterior si quieres validación explícita:
router.get("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "ID inválido" });

  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

  res.status(200).json(user);
});

// POST /api/v1/users  -> crear
router.post("/", (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name y email son requeridos" });
  }

  const newUser = {
    id: `${Date.now()}`, // id temporal
    name,
    email,
    role: role || "user",
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /api/v1/users/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ error: "Usuario no encontrado" });
  if (!name || !email) return res.status(400).json({ error: "Name y email son requeridos" });

  users[index] = {
    ...users[index],
    name,
    email,
    role
  };

  res.status(200).json(users[index]);
});

// PATCH /api/v1/users/:id
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ error: "Usuario no encontrado" });

  users[index] = {
    ...users[index],
    ...updates
  };

  res.status(200).json(users[index]);
});

// DELETE /api/v1/users/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ error: "Usuario no encontrado" });

  const deleted = users.splice(index, 1);
  res.status(200).json({ deleted: deleted[0].id });
});

module.exports = router;

