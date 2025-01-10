import UserWapper from "../functions/userWrapper";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const userWrapper = new UserWapper();

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await userWrapper.listUser("users/");
      setUsers(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="mb-4 d-flex gap-2">
        <Link to={"/usuarios/cadastrar/"} className="btn btn-secondary">
          Cadastrar usuário
        </Link>
        <Link to={"/tarefas/cadastrar/"} className="btn btn-primary">
          Cadastrar tarefa
        </Link>
        <Link to={"/albuns/cadastrar/"} className="btn btn-primary">
          Cadastrar álbum
        </Link>
        <Link to={"/fotos/cadastrar/"} className="btn btn-primary">
          Cadastrar foto
        </Link>
      </div>

      <h1>Usuários</h1>
      {!isLoading && !error && users.length > 0 && (
        <div className="mb-4 d-flex gap-2">
          {users.map((user) => (
            <Link
              to={`/usuarios/${user.id}/`}
              key={user.id}
              className="btn btn-primary"
            >
              {user.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;