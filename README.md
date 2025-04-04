# API Backend NodeJS

## Descripción
API Backend desarrollada con Node.js, Express y Prisma con SQLite. Este proyecto implementa un sistema de gestión de usuarios, clientes y proyectos con autenticación JWT.

## Requisitos Previos
- Node.js (versión 18 o superior)
- npm o pnpm
- SQLite

## Instalación

### 1. Clonar el repositorio
```bash
git clone <repositorio>
cd backend-node-PT
```

### 2. Instalar dependencias
```bash
# Con npm
npm install

# Con pnpm
pnpm install
```

### 3. Configurar variables de entorno
Copia el archivo de ejemplo y configúralo según tus necesidades:
```bash
cp copy.env .env
```

Edita el archivo `.env` con la siguiente estructura mínima:
```
PORT=3000
API_VERSION=v1
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="tu_secreto_jwt_aqui"
```

### 4. Ejecutar migraciones
```bash
# Con npm
npm run migrate

# Con pnpm
pnpm migrate
```

## Estructura del Proyecto
```
├── app.js                 # Punto de entrada de la aplicación
├── prisma/                # Configuración y migraciones de Prisma
│   ├── schema.prisma      # Esquema de la base de datos
│   └── migrations/        # Migraciones de la base de datos
├── src/
│   ├── controllers/       # Controladores para manejar las solicitudes
│   ├── db/                # Configuración de conexión a la base de datos
│   ├── mappers/           # Mapeos de entidades
│   ├── middlewares/       # Middlewares para autenticación y roles
│   ├── routes/            # Definición de rutas de la API
│   └── utils/             # Utilidades (JWT, encriptación, etc.)
└── scripts/               # Scripts de utilidad
    └── run-migrations.js  # Script para ejecutar migraciones
```

## Ejecución

### Modo desarrollo
```bash
# Con npm
npm run dev

# Con pnpm
pnpm dev
```

### Modo producción
```bash
# Con npm
npm start

# Con pnpm
pnpm start
```

## API Endpoints

### Autenticación
- `POST /api/v1/auth/register` - Registro de usuario
- `POST /api/v1/auth/login` - Inicio de sesión

### Usuarios
- `GET /api/v1/users` - Obtener todos los usuarios
- `GET /api/v1/users/:id` - Obtener usuario por ID
- `PUT /api/v1/users/:id` - Actualizar usuario
- `DELETE /api/v1/users/:id` - Eliminar usuario

### Clientes
- `GET /api/v1/clients` - Obtener todos los clientes
- `POST /api/v1/clients` - Crear nuevo cliente
- `GET /api/v1/clients/:id` - Obtener cliente por ID
- `PUT /api/v1/clients/:id` - Actualizar cliente
- `DELETE /api/v1/clients/:id` - Eliminar cliente

### Proyectos
- `GET /api/v1/projects` - Obtener todos los proyectos
- `POST /api/v1/projects` - Crear nuevo proyecto
- `GET /api/v1/projects/:id` - Obtener proyecto por ID
- `PUT /api/v1/projects/:id` - Actualizar proyecto
- `DELETE /api/v1/projects/:id` - Eliminar proyecto

## Licencia
ISC