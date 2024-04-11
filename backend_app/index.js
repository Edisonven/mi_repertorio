import express from "express";
import cors from "cors";
import { writeFile, readFile } from "node:fs/promises";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/canciones", async (req, res) => {
  try {
    const canciones = await readFile("canciones.json", "utf-8");
    res.json(JSON.parse(canciones));
  } catch (error) {
    console.log("ha ocurrido un error", error);
  }
});

app.listen(5000, () => {
  console.log("puerto en funcionamiento");
});
