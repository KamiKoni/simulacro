'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''# 🍽️ RestorApp SPA - Sistema de Gestión de Pedidos

## 📋 Descripción

RestorApp es una **Single Page Application (SPA)** profesional construida con **Vite** y **JSON Server** para la gestión completa de pedidos de restaurante. La aplicación permite a los clientes realizar pedidos de manera intuitiva y a los administradores gestionar todo el flujo de atención en tiempo real.

## 🚀 Tecnologías Utilizadas

- **Vite** - Build tool y dev server ultrarrápido
- **JavaScript Vanilla** (ES6+ Modules)
- **JSON Server** - REST API fake backend
- **CSS3** - Estilos modernos y responsivos
- **Session Storage** - Persistencia de sesión
- **SPA Router** - Navegación sin recarga de página

## 📁 Estructura del Proyecto

```
restor-app-spa/
│
├── index.html                  # HTML principal
├── vite.config.js             # Configuración de Vite
├── package.json               # Dependencias y scripts
├── db.json                    # Base de datos JSON Server
│
├── src/
│   ├── main.js               # Entry point de la aplicación
│   │
│   ├── components/           # Componentes de la UI
│   │   ├── Login.js         # Componente de login
│   │   ├── Menu.js          # Menú y carrito
│   │   ├── Orders.js        # Lista de pedidos (user)
│   │   ├── Profile.js       # Perfil de usuario
│   │   ├── Admin.js         # Panel admin
│   │   ├── UserLayout.js    # Layout para usuarios
│   │   └── AdminLayout.js   # Layout para admins
│   │
│   ├── services/            # Servicios de API
│   │   └── api.js          # Comunicación con JSON Server
│   │
│   ├── utils/               # Utilidades
│   │   ├── state.js        # State management
│   │   ├── router.js       # SPA Router
│   │   └── helpers.js      # Funciones auxiliares
│   │
│   └── styles/              # Estilos
│       └── main.css        # Estilos principales
│
└── public/                  # Archivos estáticos
```

## 🛠️ Instalación y Configuración

### 1. Instalar Dependencias
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmk,huuuuuuuuuuuuuuu//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////6uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuugfv                                                                                                                                                                                                                                                                                111111111111111111111111111111111111888vC+cvvvvvVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
```bash
cd restor-app-spa
npm install
```

Esto instalará:
- `vite` - Dev server y build tool
- `json-server` - Backend REST API
- `concurrently` - Para correr múltiples comandos

### 2. Iniciar la Aplicación

```bash
npm run dev
```

Este comando ejecuta simultáneamente:
- **Vite Dev Server** en `http://localhost:5173`
- **JSON Server** en `http://localhost:3001`

### Scripts Disponibles

```bash
# Desarrollo (Frontend + Backend juntos)
npm run dev

# Solo Frontend
npm run client

# Solo Backend (JSON Server)
npm run server

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 👥 Usuarios del Sistema

### Usuario Administrador
- **Email:** admin@restor.app
- **Contraseña:** admin123
- **Acceso:** Panel de administración completo

### Usuario Normal
- **Email:** user@restor.app
- **Contraseña:** user123
- **Acceso:** Visualización de menú y gestión de pedidos personales

## 🔄 Flujo de la Aplicación

### Como Cliente:

1. **Login** → Inicia sesión con credenciales de usuario
2. **Menú** → Explora productos y filtra por categorías
3. **Carrito** → Agrega productos al carrito
4. **Pedido** → Confirma y crea el pedido
5. **Seguimiento** → Consulta el estado en "Mis Pedidos"
6. **Perfil** → Revisa estadísticas personales

### Como Administrador:

1. **Login** → Inicia sesión con credenciales de admin
2. **Vista General** → Ve todos los pedidos del sistema
3. **Filtros** → Filtra por estado (Pendiente, Preparando, Listo, Entregado)
4. **Gestión** → Cambia estados de pedidos
5. **Eliminación** → Elimina pedidos si es necesario

## 🔌 API Endpoints (JSON Server)

### Usuarios
```
GET    /users              - Listar todos los usuarios
GET    /users/:id          - Obtener usuario por ID
GET    /users?email=X      - Buscar usuario por email
```

### Menú
```
GET    /menu               - Listar todos los productos
GET    /menu/:id           - Obtener producto por ID
GET    /menu?category=X    - Filtrar por categoría
```

### Pedidos
```
GET    /orders             - Listar todos los pedidos
GET    /orders/:id         - Obtener pedido por ID
GET    /orders?userId=X    - Filtrar por usuario
GET    /orders?status=X    - Filtrar por estado
POST   /orders             - Crear nuevo pedido
PATCH  /orders/:id         - Actualizar pedido
DELETE /orders/:id         - Eliminar pedido
```

## 🎯 Características Técnicas

### SPA Architecture
- **Router personalizado** sin dependencias externas
- **State management** centralizado con patrón Observer
- **Componentes modulares** con imports ES6
- **Código splitting** automático con Vite
- **Hot Module Replacement (HMR)** en desarrollo

### Manejo de Estado
```javascript
// State Manager centralizado
stateManager.setState({ ... })      // Actualizar estado
stateManager.getState()             // Obtener estado
stateManager.subscribe(callback)    // Suscribirse a cambios
```

### Routing
```javascript
// Rutas protegidas por rol
router.register('/', renderLogin)
router.register('/user', renderUserView)
router.register('/admin', renderAdminView)
router.navigate('/user')
```

### API Service
```javascript
// Servicios organizados por entidad
await userService.login(email, password)
await menuService.getAll()
await orderService.create(order)
await orderService.updateStatus(id, status)
```

### Métodos de Array Utilizados
✅ **map()** - Renderizado de listas
✅ **filter()** - Filtrado de pedidos y productos
✅ **find()** - Búsqueda de elementos
✅ **some()** - Verificación de existencia
✅ **every()** - Validación de colecciones
✅ **reduce()** - Cálculo de totales
✅ **sort()** - Ordenamiento de pedidos

## 🎨 Características de UI/UX

- ✨ **Diseño moderno** con gradientes y sombras
- 📱 **Totalmente responsive** (móvil, tablet, desktop)
- 🔔 **Notificaciones** para feedback de acciones
- ⚡ **Transiciones suaves** en navegación
- 🎯 **Loading states** para operaciones asíncronas
- 🔄 **Actualización en tiempo real** del carrito
- 🎨 **Estados visuales claros** para pedidos

## 🔒 Seguridad

- Protección de rutas por rol de usuario
- Validación de sesión activa
- Autorización basada en roles
- Session Storage para datos sensibles
- CORS configurado en JSON Server

## 📊 Estados de Pedidos

1. **🟡 Pendiente** - Pedido recibido
2. **🔵 Preparando** - En preparación
3. **🟢 Listo** - Listo para entregar
4. **⚪ Entregado** - Pedido completado

## 🐛 Troubleshooting

### JSON Server no inicia
```bash
# Verificar que el puerto 3001 esté libre
lsof -i :3001

# Iniciar manualmente
json-server --watch db.json --port 3001
```

### Vite no inicia
```bash
# Verificar que el puerto 5173 esté libre
lsof -i :5173

# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error de CORS
- JSON Server ya viene configurado con CORS habilitado
- Si persiste, verifica que ambos servidores estén corriendo

### Estado no persiste
- Verifica que Session Storage esté habilitado en tu navegador
- Revisa la consola para errores de almacenamiento

## 🚀 Build para Producción

```bash
# Generar build optimizado
npm run build

# La carpeta dist/ contendrá los archivos estáticos
# Para producción, necesitarás:
# 1. Servir los archivos estáticos
# 2. Configurar un backend real (Express, Nest, etc.)
```

## 📈 Próximas Mejoras

- [ ] Autenticación con JWT
- [ ] Backend real con Express/NestJS
- [ ] Base de datos PostgreSQL/MongoDB
- [ ] Websockets para actualizaciones en tiempo real
- [ ] Sistema de notificaciones push
- [ ] Panel de métricas y analytics
- [ ] Tests unitarios y de integración
- [ ] CI/CD pipeline
- [ ] PWA (Progressive Web App)
- [ ] Modo oscuro

## 📝 Requisitos del Proyecto

### ✅ Cumplidos

- ✅ Sistema de usuarios con roles (admin/user)
- ✅ Vista de usuario con menú, pedidos y perfil
- ✅ Vista de administrador con gestión completa
- ✅ Estados de pedidos (pendiente → preparando → listo → entregado)
- ✅ Persistencia de datos (Session Storage + JSON Server)
- ✅ Sistema de rutas y protección
- ✅ Uso de map, filter, find, some, every, reduce
- ✅ Manipulación del DOM
- ✅ Event listeners y preventDefault
- ✅ Separación de archivos y módulos
- ✅ SPA con Vite
- ✅ Backend con JSON Server

## 👨‍💻 Desarrollo

```bash
# Clonar y configurar
git clone [tu-repo]
cd restor-app-spa
npm install

# Iniciar desarrollo
npm run dev

# Abrir en navegador
# Frontend: http://localhost:5173
# API: http://localhost:3001
```

## 📄 Licencia

Este proyecto es de uso educativo y demostrativo.

---

**¡Disfruta usando RestorApp SPA! 🍽️✨**

Para cualquier duda o sugerencia, consulta la documentación o abre un issue.
