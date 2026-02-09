Adoptme – Backend API

Proyecto backend desarrollado en Node.js con Express y MongoDB, orientado a la gestión de usuarios, mascotas y adopciones.
Este repositorio incluye la implementación del módulo de Mocking correspondiente a la Entrega N°1 del trabajo práctico.

Tecnologías utilizadas

Node.js

Express

MongoDB + Mongoose

Faker.js

Bcrypt

Winston (logger)

Dotenv

Configuración inicial
1. Instalar dependencias
npm install

2. Variables de entorno

Crear un archivo .env en la raíz del proyecto con el siguiente contenido:

MONGO_URL=<URL_DE_CONEXION_MONGODB>
PORT=8080
NODE_ENV=development

3. Levantar el servidor
npm run dev


El servidor quedará disponible en:

http://localhost:8080

Rutas principales
Usuarios

GET /api/users

GET /api/users/:uid

Mascotas

GET /api/pets

Sesiones

GET /api/sessions/current

Adopciones

GET /api/adoptions

Módulo de Mocking (Entrega N°1)

Todas las rutas de mocking se encuentran bajo la ruta base:

/api/mocks

GET /api/mocks/mockingusers

Genera 50 usuarios mock con el mismo formato que una respuesta de MongoDB.

Características de los usuarios generados:

_id tipo ObjectId

password encriptada con bcrypt (valor original: "coder123")

role aleatorio entre "user" y "admin"

pets como array vacío

Ejemplo:
curl http://localhost:8080/api/mocks/mockingusers

GET /api/mocks/mockingpets

Genera 50 mascotas mock.

Campos:

name

specie (dog o cat)

age

Ejemplo:
curl http://localhost:8080/api/mocks/mockingpets

POST /api/mocks/generateData

Genera e inserta datos mock en la base de datos.

Body (JSON):
{
  "users": 5,
  "pets": 3
}

Ejemplo:
curl -X POST http://localhost:8080/api/mocks/generateData \
  -H "Content-Type: application/json" \
  -d '{"users":5,"pets":3}'

Respuesta esperada:
{
  "status": "success",
  "insertedUsers": 5,
  "insertedPets": 3
}

Verificación de inserción

Luego de ejecutar el endpoint /generateData, se puede comprobar la inserción mediante los endpoints reales:

curl http://localhost:8080/api/users
curl http://localhost:8080/api/pets

Manejo de errores

El proyecto cuenta con un middleware global de manejo de errores y un endpoint de prueba:

GET /api/mocks/error-test

Genera un error controlado para validar el flujo de errores.

Logger

El sistema de logging está implementado con Winston.

En desarrollo:

Loguea desde nivel debug

Salida por consola

En producción:

Loguea desde nivel info

Los logs error y fatal se escriben en errors.log

Endpoint de prueba:

GET /loggerTest