# WebBuilder Pro MVP

Una plataforma completa para que pequeñas empresas puedan crear sitios web profesionales de forma sencilla, con constructor visual drag-and-drop.

## 🚀 Características

- **Constructor Visual**: Editor drag-and-drop con GrapesJS
- **Autenticación Completa**: Sistema de registro, login y gestión de usuarios
- **Dashboard Profesional**: Interfaz para gestionar sitios web
- **Plantillas Prediseñadas**: Templates profesionales listos para usar
- **API REST Completa**: Backend robusto con Flask
- **Interfaz Moderna**: Frontend responsive con React y Tailwind CSS

## 📋 Requisitos del Sistema

### Para Mac:

1. **Python 3.11+**: Puedes instalarlo desde [python.org](https://www.python.org/downloads/) o usar Homebrew:
   ```bash
   brew install python@3.11
   ```

2. **Node.js 18+**: Puedes instalarlo desde [nodejs.org](https://nodejs.org/) o usar Homebrew:
   ```bash
   brew install node
   ```

3. **pnpm**: Gestor de paquetes para Node.js:
   ```bash
   npm install -g pnpm
   ```

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/erickherndza/kreando.git
cd kreando
```

### 2. Configurar el Backend (Flask)

```bash
# Navegar al directorio del backend
cd website-builder-backend

# Crear y activar entorno virtual
python3 -m venv venv
source venv/bin/activate  # En Mac/Linux

# Instalar dependencias
pip install -r requirements.txt
```

### 3. Configurar el Frontend (React)

```bash
# Navegar al directorio del frontend (desde la raíz del proyecto)
cd website-builder-frontend

# Instalar dependencias
pnpm install
```

## 🚀 Ejecutar el MVP

### Paso 1: Iniciar el Backend

```bash
# Desde el directorio website-builder-backend
cd website-builder-backend
source venv/bin/activate
python src/main.py
```

El backend estará disponible en: `http://localhost:5000`

### Paso 2: Iniciar el Frontend (en otra terminal)

```bash
# Desde el directorio website-builder-frontend
cd website-builder-frontend
pnpm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## 🌐 Usar la Aplicación

1. **Abrir el navegador** y ir a `http://localhost:5173`
2. **Registrarse** con un email y contraseña
3. **Crear un nuevo sitio** desde el dashboard
4. **Seleccionar una plantilla** y configurar el dominio
5. **Usar el editor visual** para personalizar tu sitio
6. **Guardar y previsualizar** tu sitio web

## 📁 Estructura del Proyecto

```
kreando/
├── website-builder-backend/     # Backend Flask
│   ├── src/
│   │   ├── models/             # Modelos de base de datos
│   │   ├── routes/             # Rutas de la API
│   │   └── main.py            # Punto de entrada
│   ├── venv/                  # Entorno virtual Python
│   └── requirements.txt       # Dependencias Python
├── website-builder-frontend/    # Frontend React
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── pages/            # Páginas de la aplicación
│   │   ├── contexts/         # Contextos React
│   │   └── lib/              # Utilidades y API client
│   ├── package.json          # Dependencias Node.js
│   └── pnpm-lock.yaml       # Lock file de pnpm
└── README.md                 # Este archivo
```

## 🔧 Tecnologías Utilizadas

### Backend:
- **Flask**: Framework web de Python
- **SQLAlchemy**: ORM para base de datos
- **Flask-JWT-Extended**: Autenticación JWT
- **Flask-CORS**: Manejo de CORS
- **SQLite**: Base de datos (para desarrollo)

### Frontend:
- **React**: Librería de interfaz de usuario
- **Vite**: Bundler y servidor de desarrollo
- **Tailwind CSS**: Framework de CSS
- **shadcn/ui**: Componentes de UI
- **GrapesJS**: Constructor visual drag-and-drop
- **React Router**: Enrutamiento
- **Axios**: Cliente HTTP

## 🐛 Solución de Problemas

### Error de puerto ocupado:
Si el puerto 5000 está ocupado, puedes cambiar el puerto en `website-builder-backend/src/main.py`:
```python
app.run(host='0.0.0.0', port=5001, debug=True)  # Cambiar a 5001
```

Y actualizar la URL en `website-builder-frontend/src/lib/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5001/api';  // Cambiar a 5001
```

### Problemas con dependencias:
- **Backend**: Asegúrate de tener el entorno virtual activado
- **Frontend**: Prueba eliminando `node_modules` y ejecutando `pnpm install` de nuevo

## 📝 Notas de Desarrollo

- El MVP usa SQLite para simplicidad en desarrollo
- Las credenciales JWT están hardcodeadas (cambiar en producción)
- Los archivos estáticos se sirven desde el backend
- El constructor visual guarda los datos en formato JSON

## 🔮 Próximas Funcionalidades

- [ ] Integración con Stripe para pagos
- [ ] Sistema de generación de sitios estáticos
- [ ] Más plantillas profesionales
- [ ] Integración con hosting providers
- [ ] Panel de administración
- [ ] Sistema de dominios personalizados

---

**¡Tu plataforma WebBuilder Pro está lista para usar!** 🎉

