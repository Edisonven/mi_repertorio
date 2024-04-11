import express from "express";
import cors from "cors";
import { writeFile, readFile } from "node:fs/promises";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/canciones", async (req, res) => {
  try {
    let canciones = await readFile("canciones.json", "utf-8");
    res.json(JSON.parse(canciones));
  } catch (error) {
    console.log("ha ocurrido un error", error);
  }
});
app.post("/canciones", async (req, res) => {
  try {
    let canciones = await readFile("canciones.json", "utf-8");
    canciones = JSON.parse(canciones);
    const payload = req.body;
    canciones.push(payload);
    await writeFile("canciones.json", JSON.stringify(canciones));
    res.json("La canción se agregó con éxito");
  } catch (error) {
    console.log("Ha ocurrido un error", error);

    res.status(500).json("Ha ocurrido un error al procesar la solicitud");
  }
});

app.listen(5000, () => {
  console.log("puerto en funcionamiento");
});
