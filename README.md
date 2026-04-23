🎯 Proyecto Goal_Handler 🎯

Una app web intuitiva para registrar y gestionar metas, también una zona de descarga mental llamada journal donde se registran progresos diarios o incluso pensamientos con la intención de mantener una mentalidad más ordenada y más enfocada, ideal para organizar rutinas y llevar un registro eficaz de mis metas.


✨ Principales Características 

Apartado de menú:
📊 Dashboard amigable: un dashboard que permite visualizar las metas previamente creadas, para poder recordarlas al entrar en contacto con la web, contiene un calendario para organizar rutinas con fechas específicas. 

Apartado de Metas y Pensamientos:
🧠 Goal: Un apartado específico para poder registrar metas, con sus detalles y una fechas límite de realización de las mismas.

📗 Journal: Un apartado diseñado específicamente para descarga mental, permitiendo al usuario despejar su mente de cosas que lo retrasan en su camino de conseguir sus objetivos, ideal para anotar pensamientos, emociones y dejar que todos esos estímulos queden plasmados en este apartado en lugar de nuestro cerebro. 

Apartado de productividad: 
⏱️ Focus Mode: Un módulo que contiene un temporizador basándose en el método de pomodoro, promoviendo la efectividad a la hora de trabajar, cuenta con los 25 minutos de trabajo sin interrupciones y 10 minutos de descanso para relajar la mente antes del siguiente "split". 

Apartado de Conseguido:
🏆 Galery: Un módulo donde se guardan las metas cumplidas, basándose en la estrategia de observar metas alcanzadas para generar un boost de motivación, permitiéndole al usuario tener una mentalidad optimista para el siguiente objetivo.

🛠️ Tecnologías Usadas

⬅️ Backend: 
Node.js
Express.js 5.2.1 (Framework web)
PostgreSQL (Base de datos)
pg 8.20.0 (Driver de PostgreSQL)
CORS 2.8.6 (Manejo de CORS)
dotenv 17.3.1 (Variables de entorno)
nodemon 3.1.11 (Desarrollo - auto-reload)

➡️ Frontend: 
React 19.2.0 (Framework UI)
Vite 7.3.1 (Build tool & dev server)
React Router DOM 7.13.1 (Enrutamiento)
Axios 1.13.6 (Cliente HTTP)
React Calendar 6.0.1 (Componente de calendario)


⚙️ Proceso de Instalación y Configuración 

**Requisitos Previos:**
- Node.js (v16 o superior)
- npm o yarn
- PostgreSQL instalado y en ejecución
- Git

---

### 1. Clonar el Repositorio

Clona el repositorio en tu máquina local usando Git.

```
git clone https://github.com/JuanUribeDv/Goal_Handler.git
cd pry_goal_handler
```

---

### 2. Configurar Backend

Navega a la carpeta del backend e instala las dependencias con npm.

Inicia el servidor en modo desarrollo. El servidor estará disponible en http://localhost:3001

---

### 3. Configurar Frontend

Abre otra terminal y navega a la carpeta del frontend.

Instala los paquetes necesarios con npm.

Inicia el servidor de desarrollo. La aplicación estará disponible en http://localhost:5173

---

### 4. Configuración de Base de Datos

**Crear archivo .env:**

Crea un archivo `.env` en la carpeta backend basado en el archivo `.env.example` que ya existe en el repositorio. Copia el contenido del `.env.example` al nuevo archivo `.env` y completa los valores con tus credenciales de PostgreSQL.

**Variables de entorno:**

Las variables que debes configurar en el archivo `.env` son:

```
DB_USER = tu_usuario_postgres
DB_PASSWORD = tu_contraseña_postgres
DB_HOST = localhost
DB_PORT = 5432
DB_DATABASE = nombre_de_tu_base_de_datos
DATABASE_URL = postgres://usuario:contraseña@localhost:5432/nombre_bd
```

**Crear la base de datos:**

Puedes crear la base de datos de dos formas:

**Opción 1: Usando pgAdmin (interfaz gráfica - recomendado)**
1. Abre pgAdmin en tu navegador
2. Conéctate al servidor PostgreSQL
3. Haz clic derecho en "Databases" y selecciona "Create" > "Database"
4. Asigna el nombre especificado en tu `.env` (DB_DATABASE)
5. Ejecuta cualquier script SQL que tengas para crear las tablas

**Opción 2: Usando terminal**
Accede a PostgreSQL desde tu terminal, crea la base de datos con el nombre especificado en tu `.env`, y ejecuta cualquier script SQL que tengas para crear las tablas necesarias.

---

### 5. Scripts Disponibles

**Backend:**
- `npm install` - Instala las dependencias necesarias para el proyecto
- `npm run dev` - Inicia el servidor en modo desarrollo con auto-reload


**Frontend:**
- `npm install` - Instala las dependencias necesarias para el proyecto
- `npm run dev` - Inicia el servidor de desarrollo


⚙️ Estructura del proyecto:


pry_goal_handler/
├── .gitignore
├── README.md
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   │
│   ├── public/
│   │   └── vite.svg
│   │
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       │
│       ├── assets/
│       │   └── react.svg
│       │
│       ├── components/
│       │   └── Sidebar.jsx
│       │
│       ├── Pages/
│       │   ├── Dashboard.jsx
│       │   ├── Focus_mode.jsx
│       │   ├── Galery.jsx
│       │   ├── Goals.jsx
│       │   └── Journal.jsx
│       │
│       ├── services/
│       │   ├── apiClient.js
│       │   ├── Dashboardservices.js
│       │   ├── Galeryservices.js
│       │   ├── Goalservices.js
│       │   └── Journalservices.js
│       │
│       └── styles/
│           ├── Calendar.css
│           ├── Dashboard.css
│           ├── Focus_mode.css
│           ├── Galery.css
│           ├── Goals.css
│           ├── index.css
│           ├── Journal.css
│           └── Sidebar.css
│
└── backend/
    ├── package.json
    │
    └── src/
        ├── index.js
        ├── db.js
        │
        └── routes/
            ├── galery.js
            ├── goals.js
            └── journal.js


