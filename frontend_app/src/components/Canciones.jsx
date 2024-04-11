import { useEffect, useState } from "react";

const Canciones = () => {
  const [songs, setSongs] = useState([]);
  const [songName, setSongName] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [songTone, setSongTone] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  URL = "http://localhost:5000/canciones";

  const handleGetSongs = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.log("ha ocurrido un error al solicitar canciones", error);
    }
  };

  const handlePostSongs = async () => {
    try {
      const newSong = {
        id: Math.floor(Math.random() * 9999),
        cancion: songName,
        artista: songArtist,
        tono: songTone,
      };
      const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(newSong),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        handleGetSongs();
      }
    } catch (error) {
      console.log("ha ocurrido un error al enviar la canción", error);
    }
  };

  const handleEditSongs = async (id) => {
    try {
      const editSong = {
        id,
        cancion: songName,
        artista: songArtist,
        tono: songTone,
      };

      const response = await fetch(`http://localhost:5000/canciones/${id}`, {
        method: "PUT",
        body: JSON.stringify(editSong),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        handleGetSongs();
        setSongArtist("");
        setSongName("");
        setSongTone("");
      }
    } catch (error) {
      console.log("ha ocurrido un error al editar la canción", error);
    }
  };

  const handleSetToEdit = (id) => {
    const editSong = songs.find((song) => song.id === id);
    if (editSong) {
      setSongArtist(editSong.artista);
      setSongName(editSong.cancion);
      setSongTone(editSong.tono);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!songName) {
      setError("Ingresa alguna canción");
    } else if (!songArtist) {
      setError("Ingresa un artista");
    } else if (!songTone) {
      setError("Ingresa un tono");
    } else if (songName === songName || songArtist === songArtist) {
      setError("ingresa una canción diferente");
    } else {
      handlePostSongs();
      setExito("¡Canción agregada!");
      setTimeout(() => {
        setExito("");
      }, 3000);
      setError("");
      setSongArtist("");
      setSongName("");
      setSongTone("");
    }
  };

  useEffect(() => {
    handleGetSongs();
  }, []);

  return (
    <div>
      <div id="AgregarCancion">
        <h2 className="pt-3">&#119070; Mi repertorio &#119070;</h2>

        <div className="container pt-5 w-50">
          <form onSubmit={(e) => handleSubmit(e)} className="form">
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
            {error ? (
              <h5 className="input__error">{error}</h5>
            ) : (
              <h5 className="input__exito">{exito}</h5>
            )}
            <div className="btn__container">
              <input
                type="submit"
                id="agregar"
                value="Agregar"
                className="m-auto btn btn-success"
              />
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
                <tr key={cancion.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{cancion.cancion}</td>
                  <td>{cancion.artista}</td>
                  <td>{cancion.tono}</td>
                  <td>
                    <div className="td__btns">
                      <button
                        onClick={() => handleSetToEdit(cancion.id)}
                        className="btn btn-warning"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleEditSongs(cancion.id)}
                        className="btn btn-success"
                      >
                        Confirmar
                      </button>
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
