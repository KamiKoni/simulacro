// Admin Component
import { orderService } from '../services/api.js';
import { stateManager } from '../utils/state.js';
import { formatDate, formatPrice, showNotification } from '../utils/helpers.js';

export async function AdminComponent() {
    const state = stateManager.getState();
    
    try {
        let orders = await orderService.getAll();
        
        // Filtrar según el filtro actual
        if (state.currentFilter !== 'all') {
            orders = orders.filter(order => order.status === state.currentFilter);
        }
        
        if (orders.length === 0) {
            return `
                <div class="section-header">
                    <h2>Gestión de Pedidos</h2>
                    <div class="status-filters" id="status-filters">
                        ${renderStatusFilters()}
                    </div>
                </div>
                <div class="empty-state">
                    <div class="empty-state-icon">📋</div>
                    <div class="empty-state-text">No hay pedidos con este filtro</div>
                </div>
            `;
        }
        
        // Ordenar por fecha más reciente
        const sortedOrders = orders.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        return `
            <div class="section-header">
                <h2>Gestión de Pedidos</h2>
                <div class="status-filters" id="status-filters">
                    ${renderStatusFilters()}
                </div>
            </div>
            <div class="admin-orders-container" id="admin-orders">
                ${sortedOrders.map(order => `
                    <div class="admin-order-card">
                        <div class="order-user-info">
                            👤 Cliente: ${order.userName} (ID Usuario: ${order.userId})
                        </div>
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
                        <div style="margin-top: 15px;">
                            <div class="status-actions">
                                <button class="btn-status pendiente" data-id="${order.id}" data-status="pendiente">
                                    Pendiente
                                </button>
                                <button class="btn-status preparando" data-id="${order.id}" data-status="preparando">
                                    Preparando
                                </button>
                                <button class="btn-status listo" data-id="${order.id}" data-status="listo">
                                    Listo
                                </button>
                                <button class="btn-status entregado" data-id="${order.id}" data-status="entregado">
                                    Entregado
                                </button>
                                <button class="btn-delete" data-id="${order.id}">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        console.error('Error al cargar pedidos admin:', error);
        return '<div class="error">Error al cargar los pedidos</div>';
    }
}

function renderStatusFilters() {
    const state = stateManager.getState();
    const statuses = [
        { value: 'all', label: 'Todos' },
        { value: 'pendiente', label: 'Pendientes' },
        { value: 'preparando', label: 'Preparando' },
        { value: 'listo', label: 'Listos' },
        { value: 'entregado', label: 'Entregados' }
    ];
    
    return statuses.map(status => `
        <button class="filter-btn ${state.currentFilter === status.value ? 'active' : ''}" 
                data-status="${status.value}">
            ${status.label}
        </button>
    `).join('');
}

export function initAdminHandlers() {
    // Status filter handlers
    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('filter-btn')) {
            const status = e.target.dataset.status;
            stateManager.setFilter(status);
            
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Re-render admin view
            const container = document.querySelector('.container');
            const content = await AdminComponent();
            container.innerHTML = content;
            initAdminHandlers();
        }
    });

    // Change status handlers
    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-status')) {
            const orderId = parseInt(e.target.dataset.id);
            const newStatus = e.target.dataset.status;
            
            try {
                await orderService.updateStatus(orderId, newStatus);
                showNotification(`Estado actualizado a: ${newStatus}`, 'success');
                
                // Re-render
                const container = document.querySelector('.container');
                const content = await AdminComponent();
                container.innerHTML = content;
                initAdminHandlers();
            } catch (error) {
                console.error('Error al actualizar estado:', error);
                showNotification('Error al actualizar el estado', 'error');
            }
        }
    });

    // Delete order handlers
    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-delete')) {
            const orderId = parseInt(e.target.dataset.id);
            
            if (confirm('¿Estás seguro de que quieres eliminar este pedido?')) {
                try {
                    await orderService.delete(orderId);
                    showNotification('Pedido eliminado', 'success');
                    
                    // Re-render
                    const container = document.querySelector('.container');
                    const content = await AdminComponent();
                    container.innerHTML = content;
                    initAdminHandlers();
                } catch (error) {
                    console.error('Error al eliminar pedido:', error);
                    showNotification('Error al eliminar el pedido', 'error');
                }
            }
        }
    });
}
