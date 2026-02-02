// API Service - Comunicación con JSON Server
const API_URL = 'http://localhost:3001';

// ==========================================
// USUARIOS
// ==========================================

export const userService = {
    async login(email, password) {
        try {
            const response = await fetch(`${API_URL}/users?email=${email}&password=${password}`);
            const users = await response.json();
            return users[0] || null;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    },

    async getAll() {
        try {
            const response = await fetch(`${API_URL}/users`);
            return await response.json();
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw error;
        }
    },

    async getById(id) {
        try {
            const response = await fetch(`${API_URL}/users/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            throw error;
        }
    }
};

// ==========================================
// MENÚ
// ==========================================

export const menuService = {
    async getAll() {
        try {
            const response = await fetch(`${API_URL}/menu`);
            return await response.json();
        } catch (error) {
            console.error('Error al obtener menú:', error);
            throw error;
        }
    },

    async getByCategory(category) {
        try {
            const response = await fetch(`${API_URL}/menu?category=${category}`);
            return await response.json();
        } catch (error) {
            console.error('Error al obtener menú por categoría:', error);
            throw error;
        }
    },

    async getById(id) {
        try {
            const response = await fetch(`${API_URL}/menu/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Error al obtener producto:', error);
            throw error;
        }
    }
};

// ==========================================
// PEDIDOS
// ==========================================

export const orderService = {
    async getAll() {
        try {
            const response = await fetch(`${API_URL}/orders`);
            return await response.json();
        } catch (error) {
            console.error('Error al obtener pedidos:', error);
            throw error;
        }
    },

    async getByUserId(userId) {
        try {
            const response = await fetch(`${API_URL}/orders?userId=${userId}`);
            return await response.json();
        } catch (error) {
            console.error('Error al obtener pedidos del usuario:', error);
            throw error;
        }
    },

    async getByStatus(status) {
        try {
            const response = await fetch(`${API_URL}/orders?status=${status}`);
            return await response.json();
        } catch (error) {
            console.error('Error al obtener pedidos por estado:', error);
            throw error;
        }
    },

    async create(order) {
        try {
            const response = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
            return await response.json();
        } catch (error) {
            console.error('Error al crear pedido:', error);
            throw error;
        }
    },

    async update(id, data) {
        try {
            const response = await fetch(`${API_URL}/orders/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('Error al actualizar pedido:', error);
            throw error;
        }
    },

    async delete(id) {
        try {
            const response = await fetch(`${API_URL}/orders/${id}`, {
                method: 'DELETE'
            });
            return await response.json();
        } catch (error) {
            console.error('Error al eliminar pedido:', error);
            throw error;
        }
    },

    async updateStatus(id, status) {
        return this.update(id, { status });
    }
};
