import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import UserWrapper from "../../functions/userWrapper";
import "bootstrap/dist/css/bootstrap.min.css";

const apiWrapper = new UserWrapper();

const UpdateUser = () => {
  const [userData, setUserData] = useState({ name: "" });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await apiWrapper.detailUser("users/", id);
      setUserData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiWrapper.updateUser("users/", id, userData);
      navigate("/usuarios/");
    } catch (error) {
      setError("Não foi possível atualizar o usuário");
    }
  };

  return (
    <>
      <h1>Atualizar usuário</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={userData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit">Atualizar</button>
      </form>
    </>
  );
};

export default UpdateUser;