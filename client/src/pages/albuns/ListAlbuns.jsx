import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlbumWrapper from '../../functions/albumWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiWrapper = new AlbumWrapper();

const ListAlbuns = () => {
    const [albuns, setAlbuns] = useState([]); // Inicializar como uma lista vazia
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAlbuns = async () => {
        try {
            setIsLoading(true);
            const response = await apiWrapper.listAlbum('albuns/');
            if (response?.data && Array.isArray(response.data)) {
                setAlbuns(response.data);
            } else {
                throw new Error('Estrutura de resposta inesperada');
            }
        } catch (err) {
            setError(err.message || 'Erro ao buscar álbuns.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAlbuns();
    }, []);

    return (
        <>
            <h1>Álbuns</h1>
            <Link to={'/albuns/cadastrar/'} className="btn btn-primary">
                Cadastrar álbum
            </Link>

            {/* Mensagem de carregamento */}
            {isLoading && <p>Carregando álbuns...</p>}

            {/* Mensagem de erro */}
            {error && <p className="text-danger">{error}</p>}

            {/* Exibição dos álbuns */}
            {!isLoading && !error && albuns.length > 0 && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {albuns.map((album) => (
                            <tr key={album.id}>
                                <td>{album.id}</td>
                                <td>{album.title}</td>
                                <td>
                                    <Link
                                        to={`/albuns/editar/${album.id}/`}
                                        className="btn btn-primary"
                                    >
                                        Editar
                                    </Link>
                                    <Link
                                        to={`/albuns/deletar/${album.id}/`}
                                        className="btn btn-danger"
                                    >
                                        Deletar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Caso não haja álbuns */}
            {!isLoading && !error && albuns.length === 0 && (
                <p>Não há álbuns cadastrados no momento.</p>
            )}
        </>
    );
};

export default ListAlbuns;
