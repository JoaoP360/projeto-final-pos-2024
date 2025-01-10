import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import PhotoWrapper from "../../functions/photoWrapper";
import AlbumWrapper from "../../functions/albumWrapper";
import "bootstrap/dist/css/bootstrap.min.css";

const photoWrapper = new PhotoWrapper();
// const albumWrapper = new AlbumWrapper();

const UpdatePhoto = () => {
  // const [albuns, setAlbuns] = useState([]);
  const [photoData, setPhotoData] = useState({ title: "", url: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchPhoto = async () => {
    try {
      const response = await photoWrapper.detailPhoto("photos/", id);
      setPhotoData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  
  useEffect(() => {
    
    fetchPhoto();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (photoData.url.length > 200) {
      setFieldErrors({ url: "A URL deve ter menos de 200 caracteres." });
      return;
    }
    try {
      await photoWrapper.updatePhoto("photos/", id, photoData);
      navigate("/fotos/");
    } catch (error) {
      setError(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPhotoData({ ...photoData, [name]: value });
  };

  return (
    <>
      <h1>Atualizar foto</h1>
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
            value={photoData.title}
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
            value={photoData.url}
            onChange={handleChange}
          />
          {fieldErrors.url && (
            <div className="invalid-feedback">{fieldErrors.url}</div>
          )}
        </div>
        <div>
          <Link to={"/fotos/"} className="btn btn-danger">
            Cancelar
          </Link>
          <button type="submit" className="btn btn-success">
            Atualizar
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdatePhoto;