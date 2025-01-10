import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import PhotoWrapper from "../../functions/photoWrapper";
import AlbumWrapper from "../../functions/albumWrapper";
import "bootstrap/dist/css/bootstrap.min.css";

const photoWrapper = new PhotoWrapper();
const albumWrapper = new AlbumWrapper();

const CreatePhoto = () => {
  const [albuns, setAlbuns] = useState([]);
  const [photoData, setPhotoData] = useState({ title: "", album: "", url: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchAlbuns = async () => {
    try {
      const response = await albumWrapper.listAlbuns("albuns/");
      setAlbuns(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchAlbuns();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPhotoData({ ...photoData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (photoData.url.length > 200) {
      setFieldErrors({ url: "A URL deve ter menos de 200 caracteres." });
      return;
    }
    try {
      await photoWrapper.createPhoto("photos/", photoData);
      setPhotoData({ title: "", user: "", url: "" });
      navigate("/fotos/");
    } catch (error) {
      setError("Não foi possível cadastrar a foto");
    }
  };

  return (
    <>
      <h1>Salvar foto</h1>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-12 mb-3">
          <label htmlFor="title" className="form-label">
            Título
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>
        <div className="col-md-12 mb-3">
          <label htmlFor="url" className="form-label">
            URL
          </label>
          <input
            type="text"
            name="url"
            id="url"
            className={`form-control ${fieldErrors.url ? "is-invalid" : ""}`}
            placeholder="Coloque a URL da foto"
            required
            onChange={handleChange}
          />
          {fieldErrors.url && (
            <div className="invalid-feedback">{fieldErrors.url}</div>
          )}
        </div>
        <div className="col-md-12 mb-3">
          <label htmlFor="album" className="form-label">
            Álbum
          </label>
          <select
            name="album"
            id="album"
            className="form-select"
            required
            onChange={handleChange}
          >
            <option selected>Selecione um álbum</option>
            {albuns.map((album) => (
              <option value={album.id}>{album.title}</option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit" className="btn btn-success">
            Cadastrar
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePhoto;