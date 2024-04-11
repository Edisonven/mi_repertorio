import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/canciones", (req, res) => {
  res.json("hola mundo");
});

app.listen(5000, () => {
  console.log("puerto en funcionamiento");
});
