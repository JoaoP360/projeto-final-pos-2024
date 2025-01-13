import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import AlbumWrapper from "../../functions/albumWrapper";
import 'bootstrap/dist/css/bootstrap.min.css';

const albumWrapper = new AlbumWrapper();

const ListAlbuns = () => {
    const [albuns, setAlbuns] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();

    const fetchAlbuns = async () => {
        try {
            setIsLoading(true);
            const response = await albumWrapper.listAlbuns('albuns/');
            if (response && Array.isArray(response)) {
                setAlbuns(response);
            } else {
                setAlbuns([]); // Caso a resposta não seja uma lista
                console.error('Resposta inválida da API:', response);
            }
        } catch (error) {
            setError(error.message || 'Erro ao carregar os álbuns.');
            setAlbuns([]); // Garante que albuns seja uma lista mesmo em caso de erro
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAlbuns();
    }, []);

    return (
        <>
            <h1>Lista de Albuns</h1>
            <Link to={'/albuns/cadastrar/'} className="btn btn-primary">Cadastrar Álbum</Link>

            {/* Mensagem de sucesso/erro */}
            {location.state && location.state.message && (
                <div className={`alert alert-${location.state.type}`}>
                    {location.state.message}
                </div>
            )}

            {/* Exibição do estado de carregamento */}
            {isLoading && (<p>Carregando álbuns...</p>)}

            {/* Exibição de erros */}
            {!isLoading && error && (<p className="text-danger">Erro: {error}</p>)}

            {/* Exibição dos álbuns */}
            {!isLoading && !error && Array.isArray(albuns) && albuns.length > 0 && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Álbum</td>
                            <td>Usuário</td>
                            <td>Opções</td>
                        </tr>
                    </thead>
                    <tbody>
                        {albuns.map((album) => (
                            <tr key={album.id}>
                                <td>{album.id}</td>
                                <td>{album.title}</td>
                                <td>{album.user}</td>
                                <td>
                                    <Link to={`/albuns/deletar/${album.id}/`} className="btn btn-danger">Deletar</Link>
                                    <Link to={`/albuns/atualizar/${album.id}/`} className="btn btn-primary">Atualizar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Caso não haja álbuns */}
            {!isLoading && !error && (!albuns || albuns.length === 0) && (
                <p>Nenhum álbum encontrado.</p>
            )}
        </>
    );
};

export default ListAlbuns;
