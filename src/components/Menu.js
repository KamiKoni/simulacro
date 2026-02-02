// Menu Component
import { menuService } from '../services/api.js';
import { stateManager } from '../utils/state.js';
import { formatPrice, getUniqueCategories, showNotification } from '../utils/helpers.js';

let menuItems = [];

export async function MenuComponent() {
    try {
        menuItems = await menuService.getAll();
        const categories = getUniqueCategories(menuItems);
        const state = stateManager.getState();
        
        return `
            <div class="section-header">
                <h2>Nuestro Menú</h2>
                <div class="cart-summary" id="cart-summary">
                    🛒 <span id="cart-count">${state.cart.length}</span> items - 
                    $<span id="cart-total">${stateManager.getCartTotal().toFixed(2)}</span>
                </div>
            </div>

            <div class="category-filter" id="category-filter">
                <button class="category-btn ${state.currentCategory === 'all' ? 'active' : ''}" data-category="all">
                    Todas
                </button>
                ${categories.map(cat => `
                    <button class="category-btn ${state.currentCategory === cat.toLowerCase() ? 'active' : ''}" 
                            data-category="${cat.toLowerCase()}">
                        ${cat}
                    </button>
                `).join('')}
            </div>
            
            <div class="menu-grid" id="menu-grid">
                ${renderMenuItems()}
            </div>

            <div id="cart-modal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Tu Pedido</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body" id="cart-items"></div>
                    <div class="modal-footer">
                        <div class="total-section">
                            <strong>Total:</strong>
                            <span class="total-price">$<span id="modal-total">0</span></span>
                        </div>
                        <button class="btn btn-primary" id="confirm-order">Confirmar Pedido</button>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error al cargar menú:', error);
        return '<div class="error">Error al cargar el menú. Verifica que JSON Server esté corriendo.</div>';
    }
}

function renderMenuItems() {
    const state = stateManager.getState();
    const filteredMenu = state.currentCategory === 'all'
        ? menuItems
        : menuItems.filter(item => item.category.toLowerCase() === state.currentCategory);

    return filteredMenu.map(item => `
        <div class="menu-item">
            <span class="menu-item-category">${item.category}</span>
            <div class="menu-item-name">${item.name}</div>
            <div class="menu-item-price">${formatPrice(item.price)}</div>
            <button class="btn-add" data-id="${item.id}">
                Agregar al pedido
            </button>
        </div>
    `).join('');
}

export function initMenuHandlers() {
    // Category filter
    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('category-btn')) {
            const category = e.target.dataset.category;
            stateManager.setCategory(category);
            
            // Re-render menu items
            const menuGrid = document.getElementById('menu-grid');
            if (menuGrid) {
                menuGrid.innerHTML = renderMenuItems();
            }
            
            // Update active state
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
        }
    });

    // Add to cart
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add')) {
            const itemId = parseInt(e.target.dataset.id);
            const item = menuItems.find(m => m.id === itemId);
            
            if (item) {
                stateManager.addToCart(item);
                updateCartSummary();
                
                // Visual feedback
                e.target.textContent = '✓ Agregado';
                e.target.style.background = '#51CF66';
                setTimeout(() => {
                    e.target.textContent = 'Agregar al pedido';
                    e.target.style.background = '';
                }, 1000);
                
                showNotification(`${item.name} agregado al carrito`, 'success');
            }
        }
    });

    // Cart summary click
    const cartSummary = document.getElementById('cart-summary');
    cartSummary?.addEventListener('click', showCartModal);

    // Close modal
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-modal')) {
            hideCartModal();
        }
        if (e.target.id === 'cart-modal') {
            hideCartModal();
        }
    });

    // Subscribe to state changes
    stateManager.subscribe(updateCartSummary);
}

function updateCartSummary() {
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    if (cartCount && cartTotal) {
        cartCount.textContent = stateManager.getCartCount();
        cartTotal.textContent = stateManager.getCartTotal().toFixed(2);
    }
}

function showCartModal() {
    const state = stateManager.getState();
    
    if (state.cart.length === 0) {
        showNotification('Tu carrito está vacío', 'info');
        return;
    }
    
    const modal = document.getElementById('cart-modal');
    modal.classList.add('active');
    renderCartModal();
}

function hideCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.classList.remove('active');
}

function renderCartModal() {
    const state = stateManager.getState();
    const cartItems = document.getElementById('cart-items');
    const modalTotal = document.getElementById('modal-total');
    
    if (state.cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🛒</div><div class="empty-state-text">Tu carrito está vacío</div></div>';
        modalTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = state.cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
            </div>
            <button class="cart-item-remove" data-index="${index}">
                Eliminar
            </button>
        </div>
    `).join('');
    
    modalTotal.textContent = stateManager.getCartTotal().toFixed(2);
    
    // Remove from cart handlers
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            stateManager.removeFromCart(index);
            renderCartModal();
            updateCartSummary();
        });
    });
    
    // Confirm order handler
    const confirmBtn = document.getElementById('confirm-order');
    confirmBtn.onclick = confirmOrder;
}

async function confirmOrder() {
    const state = stateManager.getState();
    
    if (state.cart.length === 0) {
        showNotification('Tu carrito está vacío', 'info');
        return;
    }
    
    const newOrder = {
        userId: state.currentUser.id,
        userName: state.currentUser.name,
        items: [...state.cart],
        total: stateManager.getCartTotal(),
        status: 'pendiente',
        createdAt: new Date().toISOString()
    };
    
    try {
        const { orderService } = await import('../services/api.js');
        await orderService.create(newOrder);
        
        stateManager.clearCart();
        updateCartSummary();
        hideCartModal();
        
        showNotification('¡Pedido realizado con éxito! 🎉', 'success');
    } catch (error) {
        console.error('Error al crear pedido:', error);
        showNotification('Error al crear el pedido', 'error');
    }
}
