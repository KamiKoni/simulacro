// Admin Layout Component
import { stateManager } from '../utils/state.js';
import { router } from '../utils/router.js';
import { AdminComponent, initAdminHandlers } from './Admin.js';

export function AdminLayout() {
    return `
        <nav class="navbar navbar-admin">
            <div class="nav-content">
                <div class="nav-brand">🔧 Panel Admin</div>
                <div class="nav-links">
                    <button class="nav-link active" data-tab="all-orders">Todos los Pedidos</button>
                    <button class="btn-logout" id="admin-logout">Salir</button>
                </div>
            </div>
        </nav>
        <div class="container" id="admin-content">
            <!-- Content will be loaded here -->
        </div>
    `;
}

export async function initAdminLayout() {
    const container = document.getElementById('admin-content');
    const content = await AdminComponent();
    container.innerHTML = content;
    
    initAdminHandlers();
    
    // Logout
    const logoutBtn = document.getElementById('admin-logout');
    logoutBtn?.addEventListener('click', () => {
        stateManager.setCurrentUser(null);
        stateManager.setFilter('all');
        router.navigate('/');
    });
}
