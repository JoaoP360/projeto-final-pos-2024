import React, { useState } from 'react';
import { registerUser } from '../api/api';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, password });
      alert('Usuário registrado com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao registrar usuário.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Registrar</button>
    </form>
  );
}

export default Register;
