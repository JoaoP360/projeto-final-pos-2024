import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import TodoWrapper from "../../functions/todoWrapper";
import UserWrapper from "../../functions/userWrapper";
import "bootstrap/dist/css/bootstrap.min.css";

const todoWrapper = new TodoWrapper();

const UpdateTodo = () => {
  const [todoData, setTodoData] = useState({
    title: "",
    user: "",
    is_complete: false,
  });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchTodo = async () => {
    try {
      const response = await todoWrapper.detailTodo("todos/", id);
      setTodoData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await todoWrapper.updateTodo("todos/", id, todoData);
      navigate("/tarefas/");
    } catch (error) {
      setError(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTodoData({ ...todoData, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <>
      <h1>Atualizar tarefa</h1>
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
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              name="is_complete"
              id="is_complete"
              className="form-check-input"
              checked={todoData.is_complete}
              onChange={handleChange}
            />
            <label htmlFor="is_complete" className="form-check-label">
              Concluída?
            </label>
          </div>
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

export default UpdateTodo;