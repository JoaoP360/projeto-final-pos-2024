import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AlbumWrapper from "../../functions/albumWrapper";
import UserWrapper from "../../functions/userWrapper";
import "bootstrap/dist/css/bootstrap.min.css";

const albumWrapper = new AlbumWrapper();
const userWrapper = new UserWrapper();

const CreateAlbum = () => {
    const [users, setUsers] = useState([]); // Inicializar como lista vazia
    const [albumData, setAlbumData] = useState({ title: "", user: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await userWrapper.listUser("users/");
            if (response?.data && Array.isArray(response.data)) {
                setUsers(response.data); // Atualizar com os usuários da API
            } else {
                throw new Error("Estrutura de resposta inválida");
            }
        } catch (err) {
            setError(err.message || "Erro ao carregar usuários.");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlbumData({ ...albumData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await albumWrapper.createAlbum("albuns/", albumData);
            setAlbumData({ title: "", user: "" });
            navigate("/albuns/");
        } catch (err) {
            setError("Erro ao criar álbum. Por favor, tente novamente.");
        }
    };

    return (
        <>
            <h1>Criar Álbum</h1>
            <form className="row" onSubmit={handleSubmit}>
                <div className="col-md-12 mb-3">
                    <label htmlFor="title" className="form-label">
                        Título do Álbum
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="form-control"
                        value={albumData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-12 mb-3">
                    <label htmlFor="user" className="form-label">
                        Usuário
                    </label>
                    <select
                        name="user"
                        id="user"
                        className="form-select"
                        value={albumData.user}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Selecione um usuário
                        </option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button type="submit" className="btn btn-success">
                        Criar Álbum
                    </button>
                </div>
            </form>

            {/* Exibir mensagem de erro */}
            {error && <p className="text-danger mt-3">{error}</p>}

            {/* Carregando usuários */}
            {users.length === 0 && !error && <p>Carregando usuários...</p>}
        </>
    );
};

export default CreateAlbum;
