import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AlbumWrapper from "../../functions/albumWrapper";
import "bootstrap/dist/css/bootstrap.min.css";

const albumWrapper = new AlbumWrapper();

const ListAlbuns = () => {
  const [albuns, setAlbuns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const fetchAlbuns = async () => {
    try {
      setIsLoading(true);
      const response = await albumWrapper.listAlbuns("albuns/");
      setAlbuns(response.data || []); // Garante que será um array
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbuns();
  }, []);

  return (
    <>
      <h1>Lista de Álbuns</h1>
      <Link to={"/albuns/cadastrar/"} className="btn btn-primary">
        Cadastrar álbum
      </Link>

      {location.state && location.state.message && (
        <div className={`alert alert-${location.state.type}`}>
          {location.state.message}
        </div>
      )}

      {isLoading && <p>Carregando álbuns...</p>}

      {!isLoading && error && <p>Erro no cliente</p>}

      {!isLoading && !error && Array.isArray(albuns) && albuns.length > 0 && (
        <table className="table table-striped">
          <thead>
            <tr>
              <td>ID</td>
              <td>Álbum</td>
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
                  <Link
                    to={`/albuns/deletar/${album.id}/`}
                    className="btn btn-danger"
                  >
                    Deletar
                  </Link>
                  <Link
                    to={`/albuns/atualizar/${album.id}/`}
                    className="btn btn-primary"
                  >
                    Atualizar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}


      {!isLoading && !error && Array.isArray(albuns) && albuns.length === 0 && (
        <p>Álbuns não encontrados</p>
      )}
    </>
  );
};

export default ListAlbuns;
