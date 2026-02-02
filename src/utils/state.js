// State Management - Estado Global de la Aplicación

class StateManager {
    constructor() {
        this.state = {
            currentUser: this.loadFromSession('currentUser'),
            cart: [],
            currentView: 'login',
            currentFilter: 'all',
            currentCategory: 'all'
        };
        this.listeners = [];
    }

    // Obtener estado actual
    getState() {
        return { ...this.state };
    }

    // Actualizar estado
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
    }

    // Suscribirse a cambios de estado
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    // Notificar a todos los suscriptores
    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }

    // Session Storage
    saveToSession(key, value) {
        sessionStorage.setItem(`restorapp_${key}`, JSON.stringify(value));
    }

    loadFromSession(key) {
        const data = sessionStorage.getItem(`restorapp_${key}`);
        return data ? JSON.parse(data) : null;
    }

    removeFromSession(key) {
        sessionStorage.removeItem(`restorapp_${key}`);
    }

    // Métodos específicos del dominio
    setCurrentUser(user) {
        this.setState({ currentUser: user });
        if (user) {
            this.saveToSession('currentUser', user);
        } else {
            this.removeFromSession('currentUser');
        }
    }

    addToCart(item) {
        const cart = [...this.state.cart, item];
        this.setState({ cart });
    }

    removeFromCart(index) {
        const cart = [...this.state.cart];
        cart.splice(index, 1);
        this.setState({ cart });
    }

    clearCart() {
        this.setState({ cart: [] });
    }

    setView(view) {
        this.setState({ currentView: view });
    }

    setFilter(filter) {
        this.setState({ currentFilter: filter });
    }

    setCategory(category) {
        this.setState({ currentCategory: category });
    }

    getCartTotal() {
        return this.state.cart.reduce((sum, item) => sum + item.price, 0);
    }

    getCartCount() {
        return this.state.cart.length;
    }
}

// Exportar instancia única (Singleton)
export const stateManager = new StateManager();
