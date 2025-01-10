import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

import UserWrapper from "../../functions/userWrapper";
import TodoWrapper from "../../functions/todoWrapper";
import AlbumWrapper from "../../functions/albumWrapper";
const userWrapper = new UserWrapper();
const todoWrapper = new TodoWrapper();
const albumWrapper = new AlbumWrapper();

const DetailUser = () => {
  const [user, setUser] = useState({});
  const [userTodos, setUserTodos] = useState([]);
  const [userAlbuns, setUserAlbuns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  let navigate = useNavigate();

  const { id } = useParams();

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const response = await userWrapper.detailUser("users/", id);
      setUser(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserTodos = async () => {
    try {
      setIsLoading(true);
      const response = await todoWrapper.listTodo("todos/");
      const todosByUser = response.data.filter((todo) => todo.user_id == id);
      setUserTodos(todosByUser);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserAlbuns = async () => {
    try {
      setIsLoading(true);
      const response = await albumWrapper.listAlbuns("albuns/");
      const albunsByUser = response.data.filter((album) => album.user_id == id);
      setUserAlbuns(albunsByUser);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchUserTodos();
    fetchUserAlbuns();
  }, []);

  return (
    <>
      <h1 className="mb-5">Usuário {user.name}</h1>
      {error && <p>Ocorreu um erro</p>}

      <div className="row">
        {!isLoading && !error && userTodos.length == 0 && (
          <div className="col-md-6">
            <h3>Tarefas</h3>
            <p>Não há tarefas cadastradas</p>
            <Link to={'/tarefas/cadastrar/'} className="btn btn-primary">Cadastrar tarefa</Link>
          </div>
        )}

        {!isLoading && !error && userAlbuns.length == 0 && (
          <div className="col-md-6">
            <h3>Álbuns</h3>
            <p>Não há álbuns cadastrados</p>
            <Link to={'/albuns/cadastrar/'} className="btn btn-primary">Cadastrar álbum</Link>
          </div>
        )}
      </div>

      <div className="row">
        {!isLoading && !error && userTodos.length > 0 && (
          <div className="col-md-6">
            <h3>Tarefas</h3>
            {userTodos.map((todo) => (
              <div key={todo.id} className="todo">
                <p className="todo_title">{todo.title}</p>
                <span
                  className={
                    todo.is_complete
                      ? "badge text-bg-success"
                      : "badge text-bg-warning"
                  }
                >
                  {todo.is_complete ? "Concluída" : "Não concluída"}
                </span>
              </div>
            ))}
          </div>
        )}

        {!isLoading && !error && userAlbuns.length > 0 && (
          <div className="col-md-6">
            <h3>Álbuns</h3>
            <div className="album_container">
              {userAlbuns.map((album) => (
                <Link className="btn btn-secondary" key={album.id} to={`/album/${album.id}/fotos/`}>
                  {album.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailUser;