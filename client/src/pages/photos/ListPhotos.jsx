import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import PhotoWrapper from "../../functions/photoWrapper";
import 'bootstrap/dist/css/bootstrap.min.css';

const photoWrapper = new PhotoWrapper()

const ListTodos = () => {
    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const location = useLocation()

    const fetchPhotos = async () => {
        try {
            setIsLoading(true);
            const response = await photoWrapper.listPhotos('photos/');
            setPhotos(response.data);
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPhotos()
    }, [])

    return (
        <>
            <h1>Lista de fotos</h1>
            <Link to={'/fotos/cadastrar/'} className="btn btn-primary">Cadastrar foto</Link>

            {/* Se alguma tarefa for deletada */}
            {location.state && location.state.message && (
                <div className={`alert alert-${location.state.type}`}>
                    {location.state.message}
                </div>
            )}

            {/* Se estiver carregando */}
            {isLoading && (<p>Carregando fotos</p>)}

            {/* Se tiver erro */}
            {!isLoading && error && (<p>Erro no cliente</p>)}

            {/* Se tiver tarefas */}
            {!isLoading && !error && photos.length > 0 && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Título</td>
                            <td>Álbum</td>
                            <td>Opção</td>
                        </tr>
                    </thead>
                    <tbody>
                        {photos.map((photo) => (
                            <tr key={photo.id}>
                                <td>{photo.id}</td>
                                <td>{photo.title}</td>
                                <td>{photo.album}</td>
                                <td><img className="photo" src={photo.url}/></td>
                                <td>
                                    <Link to={`/fotos/deletar/${photo.id}/`} className="btn btn-danger">Deletar</Link>
                                    <Link to={`/fotos/atualizar/${photo.id}/`} className="btn btn-primary">Atualizar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {!isLoading && !error && photos.length == 0 && (<p>Fotos não encontradas</p>)}
        </>
    )
}

export default ListTodos