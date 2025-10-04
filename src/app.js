const express = require("express");
const routes = require("./routes");
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hola mi server en Express"));

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
