// Main Application Entry Point
import './styles/main.css';
import { router } from './utils/router.js';
import { stateManager } from './utils/state.js';
import { LoginComponent, initLoginHandlers } from './components/Login.js';
import { UserLayout, initUserHandlers } from './components/UserLayout.js';
import { AdminLayout, initAdminLayout } from './components/AdminLayout.js';

// App Container
const app = document.getElementById('app');

// ==========================================
// ROUTE DEFINITIONS
// ==========================================

router.register('/', renderLogin);
router.register('/user', renderUserView);
router.register('/admin', renderAdminView);

// ==========================================
// RENDER FUNCTIONS
// ==========================================

function renderLogin() {
    const state = stateManager.getState();
    
    // Si ya hay un usuario logueado, redirigir
    if (state.currentUser) {
        if (state.currentUser.role === 'admin') {
            router.navigate('/admin');
        } else {
            router.navigate('/user');
        }
        return;
    }
    
    app.innerHTML = LoginComponent();
    initLoginHandlers();
}

async function renderUserView() {
    const state = stateManager.getState();
    
    // Protección de ruta: solo usuarios normales
    if (!state.currentUser) {
        router.navigate('/');
        return;
    }
    
    if (state.currentUser.role === 'admin') {
        router.navigate('/admin');
        return;
    }
    
    app.innerHTML = UserLayout();
    await initUserHandlers();
}

async function renderAdminView() {
    const state = stateManager.getState();
    
    // Protección de ruta: solo administradores
    if (!state.currentUser) {
        router.navigate('/');
        return;
    }
    
    if (state.currentUser.role !== 'admin') {
        router.navigate('/user');
        return;
    }
    
    app.innerHTML = AdminLayout();
    await initAdminLayout();
}

// ==========================================
// INITIALIZE APPLICATION
// ==========================================

function init() {
    console.log('🍽️ RestorApp SPA Initialized');
    console.log('📡 Asegúrate de que JSON Server está corriendo en http://localhost:3001');
    
    // Start router
    router.start();
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
