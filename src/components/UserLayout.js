// User Layout Component
import { stateManager } from '../utils/state.js';
import { router } from '../utils/router.js';
import { MenuComponent, initMenuHandlers } from './Menu.js';
import { OrdersComponent } from './Orders.js';
import { ProfileComponent } from './Profile.js';

export function UserLayout() {
    return `
        <nav class="navbar">
            <div class="nav-content">
                <div class="nav-brand">🍽️ RestorApp</div>
                <div class="nav-links">
                    <button class="nav-link active" data-tab="menu">Menú</button>
                    <button class="nav-link" data-tab="orders">Mis Pedidos</button>
                    <button class="nav-link" data-tab="profile">Perfil</button>
                    <button class="btn-logout" id="user-logout">Salir</button>
                </div>
            </div>
        </nav>
        <div class="container" id="user-content">
            <!-- Content will be loaded here -->
        </div>
    `;
}

export async function initUserHandlers() {
    // Load initial tab (menu)
    await loadUserTab('menu');
    
    // Tab navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', async () => {
            const tab = link.dataset.tab;
            
            // Update active state
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Load content
            await loadUserTab(tab);
        });
    });
    
    // Logout
    const logoutBtn = document.getElementById('user-logout');
    logoutBtn?.addEventListener('click', () => {
        stateManager.setCurrentUser(null);
        router.navigate('/');
    });
}

async function loadUserTab(tab) {
    const container = document.getElementById('user-content');
    
    let content = '';
    
    switch(tab) {
        case 'menu':
            content = await MenuComponent();
            container.innerHTML = content;
            initMenuHandlers();
            break;
        case 'orders':
            content = await OrdersComponent();
            container.innerHTML = content;
            break;
        case 'profile':
            content = await ProfileComponent();
            container.innerHTML = content;
            break;
    }
}
