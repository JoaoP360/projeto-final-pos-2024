import UserWapper from "../functions/userWrapper";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const userWrapper = new UserWapper();

const Home = () => {
  const [users, setUsers] = useState([]); // Inicializa como array vazio
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await userWrapper.listUser("users/");
      setUsers(response?.data || []); // Garante que `users` será um array
    } catch (error) {
      setError(error.message || "Ocorreu um erro ao carregar os usuários.");
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

      {isLoading && <p>Carregando usuários...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!isLoading && !error && users.length === 0 && (
        <p>Nenhum usuário encontrado.</p>
      )}

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
