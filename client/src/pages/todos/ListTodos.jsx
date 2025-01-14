import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import TodoWrapper from "../../functions/todoWrapper";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListTodos.css'; 

const todoWrapper = new TodoWrapper();

const ListTodos = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();

    const fetchTodos = async () => {
        try {
            setIsLoading(true);
            const response = await todoWrapper.listTodo('todos/');
            setTodos(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Lista de Tarefas</h1>
            <div className="d-flex justify-content-between mb-4">
                <Link to={'/tarefas/cadastrar/'} className="btn btn-primary">Cadastrar Tarefa</Link>
            </div>

            {/* Mensagem após uma ação (ex: deletar) */}
            {location.state && location.state.message && (
                <div className={`alert alert-${location.state.type}`}>
                    {location.state.message}
                </div>
            )}

            {/* Indicador de carregamento */}
            {isLoading && (<div className="spinner-border text-primary" role="status"><span className="visually-hidden">Carregando...</span></div>)}

            {/* Mensagem de erro */}
            {!isLoading && error && (<div className="alert alert-danger">Erro ao carregar tarefas.</div>)}

            {/* Lista de tarefas */}
            {!isLoading && !error && todos.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tarefa</th>
                                <th>Usuário</th>
                                <th>Concluída</th>
                                <th>Opções</th>
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
                                        
                                        <Link to={`/tarefas/atualizar/${todo.id}/`} className="btn btn-outline-primary btn-sm">
                                            Atualizar
                                        </Link>

                                        
                                        <Link to={`/tarefas/deletar/${todo.id}/`} className="btn btn-outline-danger btn-sm ms-2">
                                            Deletar
                                        </Link>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Caso não haja tarefas */}
            {!isLoading && !error && todos.length === 0 && (
                <div className="alert alert-warning">Tarefas não encontradas.</div>
            )}
        </div>
    );
};

export default ListTodos;
