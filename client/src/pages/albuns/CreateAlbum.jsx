import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AlbumWrapper from "../../functions/albumWrapper";
import UserWrapper from "../../functions/userWrapper";
import "bootstrap/dist/css/bootstrap.min.css";
import './ListAlbuns'; 

const albumWrapper = new AlbumWrapper();
const userWrapper = new UserWrapper();

const CreateAlbum = () => {
  const [users, setUsers] = useState([]);
  const [albumData, setAlbumData] = useState({ title: "", user: "" });
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await userWrapper.listUser("users/");
      setUsers(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbumData({ ...albumData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await albumWrapper.createAlbum("albuns/", albumData);
      setAlbumData({ title: "", user: "" });
      navigate("/albuns/");
    } catch (error) {
      setError("Não foi possível cadastrar o álbum");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Criar Álbum</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="form-container">
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
            <label htmlFor="user" className="form-label">
              Usuário
            </label>
            <select
              name="user"
              id="user"
              className={`form-select ${fieldErrors.user ? "is-invalid" : ""}`}
              required
              onChange={handleChange}
            >
              <option value="">Selecione um usuário</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {fieldErrors.user && (
              <div className="invalid-feedback">{fieldErrors.user}</div>
            )}
          </div>
          <div>
            <button type="submit" className="btn btn-success w-100">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAlbum;
