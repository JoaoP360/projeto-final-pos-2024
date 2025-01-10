import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import AlbumWrapper from "../../functions/albumWrapper";
import 'bootstrap/dist/css/bootstrap.min.css';

const albumWrapper = new AlbumWrapper();

const ListAlbuns = () => {
    const [albuns, setAlbuns] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const location = useLocation()

    const fetchAlbuns = async () => {
        try {
            setIsLoading(true);
            const response = await albumWrapper.listAlbuns('albuns/');
            setAlbuns(response.data);
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAlbuns()
    }, [])

    return (
        <>
            <h1>Lista de albuns</h1>
            <Link to={'/albuns/cadastrar/'} className="btn btn-primary">Cadastrar álbum</Link>

            {/* Se alguma tarefa for deletada */}
            {location.state && location.state.message && (
                <div className={`alert alert-${location.state.type}`}>
                    {location.state.message}
                </div>
            )}

            {/* Se estiver carregando */}
            {isLoading && (<p>Carregando albuns</p>)}

            {/* Se tiver erro */}
            {!isLoading && error && (<p>Erro no cliente</p>)}

            {/* Se tiver tarefas */}
            {!isLoading && !error && albuns.length > 0 && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Albúm</td>
                            <td>Usuário</td>
                            <td>Opção</td>
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

            {!isLoading && !error && albuns.length == 0 && (<p>Albuns não encontrados</p>)}
        </>
    )
}

export default ListAlbuns;