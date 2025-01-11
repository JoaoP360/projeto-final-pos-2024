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
            setIsLoading(true);
            const response = await apiWrapper.listUser('users/');
            if (response.success && Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                setUsers([]);
                setError("Não foi possível carregar os usuários.");
            }
        } catch (error) {
            setError("Algo deu errado ao carregar os usuários.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <h1>Usuários</h1>
            <Link to={'/usuarios/cadastrar/'} className='btn btn-primary'>
                Cadastrar usuário
            </Link>

            {location.state?.message && (
                <div className={`alert alert-${location.state.type}`}>
                    Usuário <b>{location.state.user}</b> {location.state.message}
                </div>
            )}

            {isLoading && (<p>Carregando usuários...</p>)}
            {error && (<p className="text-danger">{error}</p>)}

            {!isLoading && !error && Array.isArray(users) && users.length === 0 && (
                <p>Não há usuários registrados.</p>
            )}

            {!isLoading && !error && Array.isArray(users) && users.length > 0 && (
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
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
        </>
    );
};

export default ListUsers;
