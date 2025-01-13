import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import PhotoWrapper from "../../functions/photoWrapper";
import AlbumWrapper from "../../functions/albumWrapper";
import "bootstrap/dist/css/bootstrap.min.css";

const photoWrapper = new PhotoWrapper();
const albumWrapper = new AlbumWrapper();

const CreatePhoto = () => {
  const [albums, setAlbums] = useState([]);
  const [photoData, setPhotoData] = useState({ title: "", url: "", album: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Função para buscar álbuns
  const fetchAlbums = async () => {
    try {
      const response = await albumWrapper.listAlbum("albums/");
      setAlbums(response.data || []); // Verifique se `response.data` existe
    } catch (error) {
      setError("Erro ao carregar álbuns.");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPhotoData({ ...photoData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await photoWrapper.createPhoto("photos/", photoData);
      navigate("/photos/");
    } catch (error) {
      setError("Erro ao criar a foto.");
    }
  };

  return (
    <>
      <h1>Criar Foto</h1>
      {error && <p className="text-danger">{error}</p>}
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
            URL da Foto
          </label>
          <input
            type="url"
            name="url"
            id="url"
            className="form-control"
            required
            onChange={handleChange}
          />
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
            <option value="">Selecione um álbum</option>
            {/* Verificação para garantir que `albums` não seja undefined */}
            {albums.length > 0 &&
              albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.title}
                </option>
              ))}
          </select>
        </div>
        <div>
          <button type="submit" className="btn btn-success">
            Cadastrar Foto
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePhoto;
