import { useState } from "react";
import UserWrapper from "../../functions/userWrapper";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateUser = () => {
  const [userData, setUserData] = useState({ name: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const apiWrapper = new UserWrapper();
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiWrapper.createUser("users/", userData);
      setSuccess("Usuário cadastrado com sucesso");
      setUserData({ nome: "" });
      navigate("/usuarios/");
    } catch (error) {
      setError("Não foi possível cadastrar o usuário");
    }
  };

  return (
    <>
      <h1 className="h1">Cadastrar usuário</h1>
      {error && <p>Ocorreu um erro</p>}

      <form onSubmit={handleSubmit} className="row">
        <div className="col-md-12 mb-3">
          <label htmlFor="name" className="form-label">
            Nome:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Insira o nome"
            value={userData.name}
            onChange={handleChange}
            className="form-control"
            required
            autoFocus
          />
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

export default CreateUser;