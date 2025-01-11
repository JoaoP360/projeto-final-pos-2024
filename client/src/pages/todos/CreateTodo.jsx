import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import TodoWrapper from "../../functions/todoWrapper";
import UserWrapper from "../../functions/userWrapper";
import "bootstrap/dist/css/bootstrap.min.css";

const todoWrapper = new TodoWrapper();
const userWrapper = new UserWrapper();

const CreateTodo = () => {
  const [users, setUsers] = useState([]); // Garante que seja um array vazio
  const [todoData, setTodoData] = useState({ title: "", user: "", is_complete: false });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await userWrapper.listUser("users/");
      setUsers(response?.data || []); // Garante que `response.data` é um array
    } catch (error) {
      setError("Erro ao carregar usuários.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoData({ ...todoData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await todoWrapper.createTodo("todos/", todoData);
      setTodoData({ title: "", user: "", is_complete: false });
      navigate("/tarefas/");
    } catch (error) {
      setError("Não foi possível cadastrar a tarefa.");
    }
  };

  return (
    <>
      <h1>Criar tarefa</h1>

      {error && <p className="text-danger">{error}</p>}

      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-12 mb-3">
          <label htmlFor="title" className="form-label">
            Tarefa
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            value={todoData.title}
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
            className="form-select"
            value={todoData.user}
            required
            onChange={handleChange}
          >
            <option value="" disabled>
              Selecione um usuário
            </option>
            {users.length > 0 ? (
              users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))
            ) : (
              <option disabled>Nenhum usuário encontrado</option>
            )}
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

export default CreateTodo;
