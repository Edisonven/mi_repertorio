import express from "express";
import cors from "cors";
import { writeFile, readFile } from "node:fs/promises";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/canciones", async (req, res) => {
  try {
    let canciones = await readFile("repertorio.json", "utf-8");
    res.json(JSON.parse(canciones));
  } catch (error) {
    console.log("ha ocurrido un error", error);
  }
});

app.post("/canciones", async (req, res) => {
  try {
    let canciones = await readFile("repertorio.json", "utf-8");
    canciones = JSON.parse(canciones);
    const payload = req.body;
    canciones.push(payload);
    await writeFile("repertorio.json", JSON.stringify(canciones));
    res.json("La canción se agregó con éxito");
  } catch (error) {
    console.log("Ha ocurrido un error", error);
  }
});

app.put("/canciones/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    let canciones = await readFile("repertorio.json", "utf-8");
    canciones = JSON.parse(canciones);
    const index = canciones.findIndex((cancion) => cancion.id == id);
    canciones[index] = payload;
    await writeFile("repertorio.json", JSON.stringify(canciones));
    res.json("La canción se modificó con éxito");
  } catch (error) {
    console.log("Ha ocurrido un error", error);
  }
});

app.delete("/canciones/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let canciones = await readFile("repertorio.json", "utf-8");
    canciones = JSON.parse(canciones);
    const index = canciones.findIndex((cancion) => cancion.id == id);
    canciones.splice(index, 1);
    writeFile("repertorio.json", JSON.stringify(canciones));
    res.json("cancion eliminada con éxito");
  } catch (error) {
    console.log("Ha ocurrido un error", error);
  }
});

app.listen(5000, () => {
  console.log("puerto en funcionamiento");
});
