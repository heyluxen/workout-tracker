const express = require("express"); // Import express
const app = express(); // Create an instance of express
const { port } = require("./config/env"); // Import the port from the env file

// Importar las rutas centralizadas
const routes = require("./routes");

// Middlewares para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta básica de prueba
app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
});

// Montar rutas versionadas bajo /api
app.use("/api", routes);

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
