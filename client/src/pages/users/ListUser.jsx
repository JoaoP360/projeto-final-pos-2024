import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import UserWrapper from '../../functions/userWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiWrapper = new UserWrapper();

const ListUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    const fetchUsers = async () => {
        try {
            setIsLoading(true)
            const response = await apiWrapper.listUser('users/');
            setUsers(response.data)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <>
            <h1>Usuários</h1>
            <Link to={'/usuarios/cadastrar/'} className='btn btn-primary'>
                Cadastrar usuário
            </Link>

            {/* Se usuário for deletado */}
            {location.state && location.state.message && (
                <div className = {`alert alert-${location.state.type}`}>
                    Usuário <b>{location.state.user}</b> {location.state.message}
                </div>
            )}

            {/* Se estiver carregando */}
            {isLoading && (<p>Carregando usuários</p>)}

            {/* Se der erro */}
            {error && (<p>Algo deu errado em nosso site. A culpa não foi sua!</p>)}

            {/* Quando terminar a requisição */}
            {!isLoading && !error && users.length > 0 && (
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Nome</td>
                            <td>Opções</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user)=>(
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td><Link to={`/usuarios/${user.id}`}>{user.name}</Link></td>
                                <td>
                                    <Link to={`/usuarios/editar/${user.id}/`} className='btn btn-primary'>Editar</Link>
                                    <Link to={`/usuarios/deletar/${user.id}/`} className='btn btn-danger'>Deletar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {!isLoading && !error && users.length == 0 && (<p>Usuários não encontrados</p>)}
        </>
    )
}

export default ListUsers