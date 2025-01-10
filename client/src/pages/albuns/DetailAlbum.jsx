import { useState, useEffect } from "react";
import { useParams } from "react-router";
import AlbumWrapper from "../../functions/albumWrapper";
import "bootstrap/dist/css/bootstrap.min.css";

const albumWrapper = new AlbumWrapper();

const DetailAlbum = () => {
  const [album, setAlbum] = useState({});
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchAlbumPhotos = async () => {
    try {
      const response = await albumWrapper.detailAlbumPhotos("albuns/", id);
      setAlbumPhotos(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const fetchAlbum = async () => {
    try {
      const response = await albumWrapper.detailAlbum("albuns/", id);
      setAlbum(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchAlbum();
    fetchAlbumPhotos();
  }, []);

  return (
    <>
      <h1>Álbum {album.title}</h1>
      {albumPhotos.length > 0 && (
        <div className="album">
            {albumPhotos.map((photo)=>(
                <img key={photo.id} src={photo.url} width={400} />
            ))}
        </div>
      )}
    </>
  );
};

export default DetailAlbum;