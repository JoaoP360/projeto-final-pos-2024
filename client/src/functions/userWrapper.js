class UserWrapper {
    baseUrl = 'http://127.0.0.1:8000/api/';

    // Listar todos os usuários
    async listUser(endpoint) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`);
            if (!response.ok) {
                const errorResponse = await response.json();
                throw { success: false, message: errorResponse.message, status: response.status };
            }
            const data = await response.json();
            return { success: true, data: data, status: response.status };
        } catch (error) {
            return error;
        }
    }

    // Obter detalhes de um usuário
    async detailUser(endpoint, id) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}${id}/`);
            if (!response.ok) {
                const errorResponse = await response.json();
                throw { success: false, message: errorResponse.message, status: response.status };
            }
            const data = await response.json();
            return { success: true, data: data, status: response.status };
        } catch (error) {
            return error;
        }
    }

    // Criar um novo usuário
    async createUser(endpoint, data) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    username: data.username, // Aqui está o campo correto
                    email: data.email, // Verifique se este campo é necessário também
                }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw { success: false, message: errorResponse.message, status: response.status };
            }

            const responseData = await response.json();
            return { success: true, data: responseData, status: response.status };
        } catch (error) {
            return error;
        }
    }

    // Atualizar um usuário
    async updateUser(endpoint, id, data) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw { success: false, message: errorResponse.message, status: response.status };
            }

            const responseData = await response.json();
            return { success: true, data: responseData, status: response.status };
        } catch (error) {
            return error;
        }
    }

    // Deletar um usuário
    async deleteUser(endpoint, id) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw { success: false, message: errorResponse.message, status: response.status };
            }

            return { success: true, status: response.status };
        } catch (error) {
            return error;
        }
    }
}

export default UserWrapper;