import express from "express";
import cors from "cors";
import { writeFile, readFile } from "node:fs/promises";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/canciones", (req, res) => {
  res.json("hola mundo");
});

app.listen(5000, () => {
  console.log("puerto en funcionamiento");
});
