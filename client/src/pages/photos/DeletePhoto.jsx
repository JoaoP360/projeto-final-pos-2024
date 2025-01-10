import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import PhotoWrapper from '../../functions/photoWrapper';

const photoWrapper = new PhotoWrapper();

const DeletePhoto = () => {
    const [photo, setPhoto] = useState({});
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchPhoto = async () => {
        try {
            const response = await photoWrapper.detailPhoto('photos/', id);
            setPhoto(response.data);
        } catch (error) {
            setError(error)
        }
    };

    useEffect(() => {
        fetchPhoto();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await photoWrapper.deletePhoto('photos/', id);
        if (response.status == 204) {
            navigate('/fotos/', { state: { message: "Foto deletada com sucesso", type: "success" } });
        } else {
            navigate('/fotos/', { state: { message: "Erro ao excluir foto", type: "danger" } });
        }
    }

    return (
        <>
            <h1>Deletar foto <img className='photo' src={photo.url}/> ? </h1>

            {error && (<p>Foto não encontrada</p>)}

            {!error && photo && (
                <form onSubmit={handleSubmit}>
                    <Link to={'/fotos/'} className='btn btn-success'>Cancelar</Link>
                    <button type='submit' className='btn btn-danger'>Deletar</button>
                </form>
            )}
        </>
    )
}

export default DeletePhoto;