# 📇 Sistema de Gestión de Contactos

Una aplicación web full-stack moderna, intuitiva y responsive diseñada para administrar contactos personales y profesionales. Desarrollada con **Node.js/Express** en el backend y **React + Tailwind CSS** en el frontend.

---

## 🚀 Características Principales

- **Gestión Integral de Contactos (CRUD Completo):**
  - **Crear:** Registro de contactos con nombre, teléfono, email, categoría (*Trabajo*, *Familia*, *Amigos*), notas opcionales y estado de favorito.
  - **Ver:** Visualización en tarjetas con avatares de iniciales estilizados o vista compacta en lista/tabla, más un modal con vista detallada de perfil.
  - **Editar:** Formulario interactivo con precarga de datos y validaciones en tiempo real.
  - **Eliminar:** Diálogo modal de confirmación para prevenir borrados accidentales.
- **Buscador y Filtros en Tiempo Real:**
  - Filtrado instantáneo por nombre, teléfono, email o categoría conforme el usuario escribe.
  - Filtro por categoría mediante píldoras interactivas (*Todos*, *Trabajo*, *Familia*, *Amigos*).
  - Filtro exclusivo para contactos favoritos (⭐).
  - Selector de ordenación: *Nombre (A-Z)*, *Nombre (Z-A)* y *Más recientes*.
  - Alternador de vista entre **Cuadrícula (Tarjetas)** y **Lista (Tabla)**.
- **Datos de Prueba Iniciales (Mock Data):**
  - Incluye 10 contactos variados preconfigurados con categorías y notas para poder probar la aplicación de inmediato.
  - Botón **"Restablecer datos"** en la cabecera que permite reiniciar los contactos al estado inicial en cualquier momento.
- **Exportación de Datos:**
  - Botón para exportar la lista de contactos filtrada a formato **CSV**.
- **Acciones Rápidas:**
  - Copiar teléfono o email al portapapeles con un solo clic.
  - Enlaces directos para llamadas (`tel:`) y envío de correos (`mailto:`).
- **Diseño Moderno y 100% Responsive:**
  - Interfaz estilizada con Tailwind CSS, adaptada para dispositivos móviles, tablets y monitores de escritorio.
  - Notificaciones flotantes (Toasts) para feedback inmediato de cada operación.

---

## 📁 Estructura del Proyecto

El proyecto está claramente dividido en carpetas de cliente y servidor:

```
Gestion-contactos/
├── client/                     # Frontend (React + Vite + Tailwind CSS)
│   ├── public/                 # Archivos estáticos
│   ├── src/
│   │   ├── components/         # Componentes modulares de React
│   │   │   ├── ContactCard.jsx         # Tarjeta de contacto (Vista Grid)
│   │   │   ├── ContactRow.jsx          # Fila de contacto (Vista Lista)
│   │   │   ├── ContactModal.jsx        # Modal Crear / Editar contacto
│   │   │   ├── ContactDetailModal.jsx  # Modal de detalles del perfil
│   │   │   ├── DeleteConfirmModal.jsx  # Modal de confirmación de eliminación
│   │   │   ├── EmptyState.jsx          # Vista de estado vacío / sin resultados
│   │   │   ├── Navbar.jsx              # Barra de navegación superior
│   │   │   ├── SearchAndFilters.jsx    # Buscador y filtros en tiempo real
│   │   │   ├── StatsCards.jsx          # Tarjetas de estadísticas interactivas
│   │   │   └── Toast.jsx               # Notificaciones flotantes
│   │   ├── services/
│   │   │   └── api.js                  # Servicio cliente para la API REST
│   │   ├── utils/
│   │   │   └── helpers.js              # Helpers de estilo, iniciales y export CSV
│   │   ├── App.jsx                     # Componente principal y gestión de estado
│   │   ├── index.css                   # Directivas de Tailwind CSS
│   │   └── main.jsx                    # Punto de entrada de React
│   ├── index.html                      # HTML principal
│   ├── package.json                    # Dependencias del frontend
│   ├── postcss.config.js               # Configuración de PostCSS
│   ├── tailwind.config.js              # Configuración de Tailwind CSS
│   └── vite.config.js                  # Configuración de Vite con proxy a API
│
├── server/                     # Backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/
│   │   │   └── contactsController.js   # Lógica y validaciones del CRUD
│   │   ├── data/
│   │   │   ├── contacts.json           # Almacenamiento persistente
│   │   │   ├── mockContacts.js         # Datos de prueba iniciales
│   │   │   └── storage.js              # Servicio de lectura/escritura en disco
│   │   ├── routes/
│   │   │   └── contactsRoutes.js       # Definición de rutas Express
│   │   └── index.js                    # Servidor Express y middleware
│   └── package.json                    # Dependencias del servidor
│
├── dev.js                      # Script para ejecutar servidor y cliente simultáneamente
├── iniciar.bat                 # Script de inicio rápido para Windows
├── iniciar.ps1                 # Script de inicio rápido para PowerShell
├── package.json                # Configuración global y scripts raíz
└── README.md                   # Documentación del proyecto
```

---

## 🛠️ Tecnologías Empleadas

### Backend:
- **Node.js** (v20+)
- **Express.js** (Framework HTTP y enrutamiento)
- **CORS** (Soporte para intercambio de recursos de origen cruzado)
- **Persistencia en JSON** (Almacenamiento en disco local sin necesidad de base de datos externa pesada)

### Frontend:
- **React 18** con Hooks (`useState`, `useEffect`, `useMemo`)
- **Vite** (Herramienta de compilación ultrarrápida)
- **Tailwind CSS v3** (Estilos utilitarios y diseño moderno)
- **Lucide React** (Iconografía limpia y consistente)

---

## 🔌 API REST (Endpoints)

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/contacts` | Obtiene todos los contactos (soporta query `?search=` y `?categoria=`) |
| `GET` | `/api/contacts/:id` | Obtiene un contacto específico por ID |
| `POST` | `/api/contacts` | Crea un nuevo contacto |
| `PUT` | `/api/contacts/:id` | Actualiza un contacto existente por ID |
| `DELETE` | `/api/contacts/:id` | Elimina un contacto por ID |
| `POST` | `/api/contacts/reset/mock` | Restablece los contactos a los datos de prueba iniciales |
| `GET` | `/api/health` | Comprobación de estado del servidor |

---

## 💻 Instrucciones para Ejecutar la Aplicación

### Opción 1: Un solo comando desde la raíz (Recomendado)

Desde la terminal en `c:\Gestion-contactos`:

```bash
npm run dev
```

O si utilizas PowerShell:
```powershell
.\iniciar.ps1
```

O en Windows ejecutando con doble clic el archivo `iniciar.bat`.

Esto levantará automáticamente:
1. **Backend:** [http://localhost:5000](http://localhost:5000)
2. **Frontend:** [http://localhost:3000](http://localhost:3000)

---

### Opción 2: Ejecutar por separado en dos terminales

#### Terminal 1 (Servidor Backend):
```bash
cd server
npm install
npm start
```
*El servidor correrá en `http://localhost:5000`.*

#### Terminal 2 (Cliente Frontend):
```bash
cd client
npm install
npm run dev
```
*La aplicación web estará disponible en `http://localhost:3000`.*
