// Router - Sistema de Rutas para SPA

class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.init();
    }

    init() {
        window.addEventListener('popstate', () => {
            this.loadRoute(window.location.pathname);
        });
    }

    register(path, handler) {
        this.routes[path] = handler;
    }

    navigate(path) {
        window.history.pushState({}, '', path);
        this.loadRoute(path);
    }

    loadRoute(path) {
        const handler = this.routes[path] || this.routes['/'];
        if (handler) {
            this.currentRoute = path;
            handler();
        }
    }

    start() {
        const initialPath = window.location.pathname;
        this.loadRoute(initialPath === '/' ? '/' : initialPath);
    }
}

export const router = new Router();
