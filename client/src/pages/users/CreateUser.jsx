import React, { useState } from 'react';
import UserWrapper from '../../functions/userWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';

const userWrapper = new UserWrapper();

const CreateUser = () => {
    const [userData, setUserData] = useState({ name: '', username: '', email: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await userWrapper.createUser('users/', userData);

        if (result.success) {
            setSuccess(true);
            setUserData({ name: '', username: '', email: '' });
        } else {
            setError(result.message || 'Erro ao criar usuário');
        }
    };

    return (
        <div>
            <h1>Criar Usuário</h1>
            {success && <div className="alert alert-success">Usuário criado com sucesso!</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
        </div>
    );
};

export default CreateUser;