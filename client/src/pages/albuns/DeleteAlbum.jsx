import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import AlbumWrapper from '../../functions/albumWrapper';

const albumWrapper = new AlbumWrapper();

const DeleteAlbum = () => {
    const [album, setAlbum] = useState({});
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchAlbum = async () => {
        try {
            const response = await albumWrapper.detailAlbum('albuns/', id);
            setAlbum(response.data);
        } catch (error) {
            setError(error)
        }
    };

    useEffect(() => {
        fetchAlbum();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await albumWrapper.deleteAlbum('albuns/', id);
        if (response.status == 204) {
            navigate('/albuns/', { state: { message: "Álbum deletado com sucesso", type: "success" } });
        } else {
            navigate('/albuns/', { state: { message: "Erro ao excluir álbum", type: "danger" } });
        }
    }

    return (
        <>
            <h1>Deletar álbum <b>{album.title}</b>? </h1>

            {error && (<p>Tarefa não encontrada</p>)}

            {!error && album && (
                <form onSubmit={handleSubmit}>
                    <Link to={'/albuns/'} className='btn btn-success'>Cancelar</Link>
                    <button type='submit' className='btn btn-danger'>Deletar</button>
                </form>
            )}
        </>
    )
}

export default DeleteAlbum;