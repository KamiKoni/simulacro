// Profile Component
import { orderService } from '../services/api.js';
import { stateManager } from '../utils/state.js';
import { formatPrice } from '../utils/helpers.js';

export async function ProfileComponent() {
    const state = stateManager.getState();
    
    try {
        const orders = await orderService.getByUserId(state.currentUser.id);
        
        // Calcular estadísticas
        const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
        const completedOrders = orders.filter(order => order.status === 'entregado').length;
        
        return `
            <div class="section-header">
                <h2>Mi Perfil</h2>
            </div>
            <div class="profile-card">
                <div class="profile-header">
                    <div class="profile-avatar">👤</div>
                    <div class="profile-name">${state.currentUser.name}</div>
                    <span class="profile-role">${state.currentUser.role === 'admin' ? 'Administrador' : 'Cliente'}</span>
                </div>
                <div class="profile-info">
                    <div class="info-item">
                        <span class="info-label">Email:</span>
                        <span class="info-value">${state.currentUser.email}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Total de pedidos:</span>
                        <span class="info-value">${orders.length}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Pedidos completados:</span>
                        <span class="info-value">${completedOrders}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Total gastado:</span>
                        <span class="info-value">${formatPrice(totalSpent)}</span>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error al cargar perfil:', error);
        return '<div class="error">Error al cargar el perfil</div>';
    }
}
