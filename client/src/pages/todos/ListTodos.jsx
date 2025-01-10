import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import TodoWrapper from "../../functions/todoWrapper";
import 'bootstrap/dist/css/bootstrap.min.css';

const todoWrapper = new TodoWrapper()

const ListTodos = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const location = useLocation()

    const fetchTodos = async () => {
        try {
            setIsLoading(true);
            const response = await todoWrapper.listTodo('todos/');
            setTodos(response.data);
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    return (
        <>
            <h1>Lista de tarefas</h1>
            <Link to={'/tarefas/cadastrar/'} className="btn btn-primary">Cadastrar tarefa</Link>

            {/* Se alguma tarefa for deletada */}
            {location.state && location.state.message && (
                <div className={`alert alert-${location.state.type}`}>
                    {location.state.message}
                </div>
            )}

            {/* Se estiver carregando */}
            {isLoading && (<p>Carregando tarefas</p>)}

            {/* Se tiver erro */}
            {!isLoading && error && (<p>Erro no cliente</p>)}

            {/* Se tiver tarefas */}
            {!isLoading && !error && todos.length > 0 && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Tarefa</td>
                            <td>Usuário</td>
                            <td>Concluída</td>
                            <td>Opção</td>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo) => (
                            <tr key={todo.id}>
                                <td>{todo.id}</td>
                                <td>{todo.title}</td>
                                <td>{todo.user}</td>
                                <td>{todo.is_complete ? 'Sim' : 'Não'}</td>
                                <td>
                                    <Link to={`/tarefas/deletar/${todo.id}/`} className="btn btn-danger">Deletar</Link>
                                    <Link to={`/tarefas/atualizar/${todo.id}/`} className="btn btn-primary">Atualizar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {!isLoading && !error && todos.length == 0 && (<p>Tarefas não encontradas</p>)}
        </>
    )
}

export default ListTodos