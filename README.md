Adoptme – Backend API

Proyecto backend desarrollado en Node.js con Express y MongoDB, orientado a la gestión de usuarios, mascotas y adopciones.


=========================
TECNOLOGÍAS UTILIZADAS
=========================

- Node.js
- Express
- MongoDB + Mongoose
- Faker.js
- Bcrypt
- Winston (logger)
- Dotenv
- Swagger (swagger-jsdoc / swagger-ui-express)
- Mocha
- Chai
- Supertest
- Sinon
- Docker


=========================
CONFIGURACIÓN INICIAL
=========================

1. Instalar dependencias

npm install


2. Variables de entorno

Crear un archivo .env en la raíz del proyecto:

MONGO_URL=TU_URL_DE_MONGODB
PORT=8080
NODE_ENV=development


3. Levantar el servidor

npm run dev

El servidor quedará disponible en:

http://localhost:8080


=========================
DOCUMENTACIÓN SWAGGER
=========================

La documentación interactiva de la API está disponible en:

http://localhost:8080/api/docs


=========================
RUTAS PRINCIPALES
=========================

Usuarios

GET /api/users
GET /api/users/:uid
PUT /api/users/:uid
DELETE /api/users/:uid


Mascotas

GET /api/pets


Sesiones

GET /api/sessions/current


Adopciones

GET /api/adoptions
GET /api/adoptions/:aid
POST /api/adoptions/:uid/:pid


=========================
TESTS FUNCIONALES
=========================

Se desarrollaron tests funcionales para todos los endpoints de:

src/routes/adoption.router.js

Cobertura:

- Obtener adopciones
- Obtener adopción por ID
- Crear adopción
- Usuario inexistente
- Mascota inexistente
- Mascota ya adoptada

Ejecutar tests:

npm test


=========================
MÓDULO DE MOCKING
=========================

Base:

/api/mocks

Endpoints:

GET /api/mocks/mockingusers
Genera 50 usuarios mock

GET /api/mocks/mockingpets
Genera 50 mascotas mock

POST /api/mocks/generateData

Body:
{
  "users": 5,
  "pets": 3
}

Inserta datos en MongoDB


Verificación:

GET /api/users
GET /api/pets


=========================
MANEJO DE ERRORES
=========================

Middleware global implementado.

Endpoint de prueba:

GET /api/mocks/error-test


=========================
LOGGER
=========================

Implementado con Winston

Desarrollo:
- Nivel debug
- Salida por consola

Producción:
- Nivel info
- Logs error y fatal en archivo


Endpoint:

GET /loggerTest


=========================
DOCKER
=========================

Construir imagen:

docker build -t adoptme-backend .


Ejecutar contenedor:

docker run -p 8080:8080 --env-file .env adoptme-backend


La aplicación queda disponible en:

http://localhost:8080

Swagger:

http://localhost:8080/api/docs


=========================
DOCKER HUB
=========================

Imagen publicada en:

https://hub.docker.com/r/sebastianmerlassino/adoptme-backend

