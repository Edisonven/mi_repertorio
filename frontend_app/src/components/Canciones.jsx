import { useEffect, useState } from "react";

const Canciones = () => {
  const [songs, setSongs] = useState([]);
  const [songName, setSongName] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [songTone, setSongTone] = useState("");

  URL = "http://localhost:5000/canciones";

  const getSongs = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.log("ha ocurrido un error al solicitar cannciones", error);
    }
  };

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <div>
      <div id="AgregarCancion">
        <h2 className="pt-3">&#119070; Mi repertorio &#119070;</h2>

        <div className="container pt-5 w-50">
          <form className="form">
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Canción:
              </label>
              <div className="col-sm-10">
                <input
                  onChange={(e) => setSongName(e.target.value)}
                  type="text"
                  className="form-control"
                  id="cancion"
                  placeholder="Ingresa tu canción"
                  value={songName}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="email" className="col-sm-2 col-form-label">
                Artista:{" "}
              </label>
              <div className="col-sm-10">
                <input
                  onChange={(e) => setSongArtist(e.target.value)}
                  type="text"
                  className="form-control"
                  id="artista"
                  placeholder="Ingresa tu artista"
                  value={songArtist}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="rut" className="col-sm-2 col-form-label">
                Tono:
              </label>
              <div className="col-sm-10">
                <input
                  onChange={(e) => setSongTone(e.target.value)}
                  type="text"
                  className="form-control"
                  id="tono"
                  placeholder="Ingresa el tono"
                  value={songTone}
                />
              </div>
            </div>
            <div className="btn__container">
              <button id="agregar" className="m-auto btn btn-success">
                Agregar
              </button>
              <button id="editar" className="m-auto btn btn-info">
                Editar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div id="ListaCanciones">
        <h2>Tabla de canciones &#127908;</h2>

        <div className="container pt-5 w-75">
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Canción</th>
                <th scope="col">Artista</th>
                <th scope="col">Tono</th>
                <th scope="col">-</th>
              </tr>
            </thead>
            <tbody id="cuerpo">
              {songs.map((cancion, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{cancion.cancion}</td>
                  <td>{cancion.artista}</td>
                  <td>{cancion.tono}</td>
                  <td>
                    <div className="td__btns">
                      <button className="btn btn-info">Editar</button>
                      <button className="btn btn-danger">Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Canciones;
