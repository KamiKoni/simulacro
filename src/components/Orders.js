// Orders Component (User View)
import { orderService } from '../services/api.js';
import { stateManager } from '../utils/state.js';
import { formatDate, formatPrice } from '../utils/helpers.js';

export async function OrdersComponent() {
    const state = stateManager.getState();
    
    try {
        const orders = await orderService.getByUserId(state.currentUser.id);
        
        if (orders.length === 0) {
            return `
                <div class="section-header">
                    <h2>Mis Pedidos</h2>
                </div>
                <div class="empty-state">
                    <div class="empty-state-icon">📦</div>
                    <div class="empty-state-text">No tienes pedidos aún</div>
                </div>
            `;
        }
        
        // Ordenar por fecha más reciente
        const sortedOrders = orders.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        return `
            <div class="section-header">
                <h2>Mis Pedidos</h2>
            </div>
            <div class="orders-container">
                ${sortedOrders.map(order => `
                    <div class="order-card">
                        <div class="order-header">
                            <div>
                                <div class="order-id">Pedido #${order.id}</div>
                                <div class="order-date">${formatDate(order.createdAt)}</div>
                            </div>
                            <span class="order-status status-${order.status}">${order.status.toUpperCase()}</span>
                        </div>
                        <div class="order-items">
                            ${order.items.map(item => `
                                <div class="order-item">
                                    <span>${item.name}</span>
                                    <span>${formatPrice(item.price)}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="order-footer">
                            <strong>Total:</strong>
                            <span class="order-total">${formatPrice(order.total)}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        console.error('Error al cargar pedidos:', error);
        return '<div class="error">Error al cargar los pedidos</div>';
    }
}
