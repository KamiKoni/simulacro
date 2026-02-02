# 🚀 GUÍA DE INICIO RÁPIDO - RestorApp SPA

## ⚡ Pasos para Ejecutar

### 1️⃣ Instalar Dependencias
```bash
cd restor-app-spa
npm install
```

### 2️⃣ Iniciar la Aplicación
```bash
npm run dev
```

Esto iniciará:
- ✅ Vite en http://localhost:5173
- ✅ JSON Server en http://localhost:3001

### 3️⃣ Abrir en el Navegador
Abre: **http://localhost:5173**

### 4️⃣ Probar la Aplicación

**Login como Usuario:**
- Email: user@restor.app
- Password: user123

**Login como Admin:**
- Email: admin@restor.app
- Password: admin123

---

## 📋 Comandos Disponibles

```bash
npm run dev      # Iniciar todo (frontend + backend)
npm run client   # Solo frontend
npm run server   # Solo backend
npm run build    # Build para producción
```

---

## 🎯 Características Principales

✅ **SPA con Vite** - Navegación sin recargas
✅ **JSON Server** - Base de datos REST
✅ **Router personalizado** - Rutas protegidas
✅ **State Management** - Estado centralizado
✅ **API Service** - Comunicación con backend
✅ **Componentes modulares** - Código organizado

---

## 📂 Archivos Importantes

- `src/main.js` - Entry point
- `src/services/api.js` - API calls
- `src/utils/state.js` - State management
- `src/utils/router.js` - SPA Router
- `db.json` - Base de datos

---

## 🐛 Si algo no funciona:

1. **Verifica que los puertos estén libres:**
   - 5173 (Vite)
   - 3001 (JSON Server)

2. **Reinstala dependencias:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Revisa la consola del navegador** para errores

---

## 💡 Tips

- Los pedidos se guardan en `db.json`
- La sesión se guarda en Session Storage
- Usa las DevTools del navegador para debug
- Recarga la página si JSON Server se reinicia

--25000000000+-