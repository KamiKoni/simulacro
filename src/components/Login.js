// Login Component
import { userService } from '../services/api.js';
import { stateManager } from '../utils/state.js';
import { router } from '../utils/router.js';
import { showNotification } from '../utils/helpers.js';

export function LoginComponent() {
    return `
        <div class="login-container">
            <div class="login-card">
                <h1>🍽️ RestorApp</h1>
                <p class="subtitle">Sistema de Gestión de Pedidos</p>
                
                <form id="login-form">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required placeholder="tu@email.com">
                    </div>
                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input type="password" id="password" required placeholder="••••••••">
                    </div>
                    <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
                </form>

                <div class="demo-users">
                    <p>Usuarios de prueba:</p>
                    <div class="demo-grid">
                        <button class="btn-demo" data-email="admin@restor.app" data-password="admin123">
                            👨‍💼 Admin
                        </button>
                        <button class="btn-demo" data-email="user@restor.app" data-password="user123">
                            👤 Usuario
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function initLoginHandlers() {
    const form = document.getElementById('login-form');
    const demoBtns = document.querySelectorAll('.btn-demo');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const user = await userService.login(email, password);
            
            if (user) {
                stateManager.setCurrentUser(user);
                showNotification('¡Bienvenido! 👋', 'success');
                
                if (user.role === 'admin') {
                    router.navigate('/admin');
                } else {
                    router.navigate('/user');
                }
            } else {
                showNotification('Credenciales incorrectas ❌', 'error');
            }
        } catch (error) {
            showNotification('Error al iniciar sesión. Verifica que JSON Server esté corriendo.', 'error');
            console.error(error);
        }
    });

    demoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('email').value = btn.dataset.email;
            document.getElementById('password').value = btn.dataset.password;
            form.dispatchEvent(new Event('submit'));
        });
    });
}
