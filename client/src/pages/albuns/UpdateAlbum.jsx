import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import AlbumWrapper from "../../functions/albumWrapper";
import "bootstrap/dist/css/bootstrap.min.css";

const albumWrapper = new AlbumWrapper();

const UpdateAlbum = () => {
  const [albumData, setAlbumData] = useState({
    title: "",
    user: "",
  });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchAlbum = async () => {
    try {
      const response = await albumWrapper.detailAlbum("albuns/", id);
      setAlbumData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchAlbum();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await albumWrapper.updateAlbum("albuns/", id, albumData);
      navigate("/albuns/");
    } catch (error) {
      setError(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbumData({ ...albumData, [name]: value });
  };

  return (
    <>
      <h1>Atualizar álbum</h1>
      <form className="row" onSubmit={handleSubmit}>
        <div class="col-md-12 mb-3">
          <label htmlFor="title" className="form-label">
            Título
          </label>
          
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            value={albumData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-success">
            Atualizar
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateAlbum;