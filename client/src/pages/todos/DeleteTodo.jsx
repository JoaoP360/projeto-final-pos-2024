import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import TodoWrapper from '../../functions/todoWrapper';

const todoWrapper = new TodoWrapper();

const DeleteTodo = () => {
    const [todo, setTodo] = useState({});
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchTodo = async () => {
        try {
            const response = await todoWrapper.detailTodo('todos/', id);
            setTodo(response.data);
        } catch (error) {
            setError(error)
        }
    };

    useEffect(() => {
        fetchTodo();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await todoWrapper.deleteTodo('todos/', id);
        if (response.status == 204) {
            navigate('/tarefas/', { state: { message: "Tarefa deletada com sucesso", type: "success" } });
        } else {
            navigate('/tarefas/', { state: { message: "Erro ao excluir tarefa", type: "danger" } });
        }
    }

    return (
        <>
            <h1>Deletar tarefa <b>{todo.title}</b>? </h1>

            {error && (<p>Tarefa não encontrada</p>)}

            {!error && todo && (
                <form onSubmit={handleSubmit}>
                    <Link to={'/tarefas/'} className='btn btn-success'>Cancelar</Link>
                    <button type='submit' className='btn btn-danger'>Deletar</button>
                </form>
            )}
        </>
    )
}

export default DeleteTodo;