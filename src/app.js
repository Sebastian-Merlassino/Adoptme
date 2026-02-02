import dotenv from "dotenv";
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

// Importar ruta para datos mock
import mocksRouter from "./routes/mocks.router.js";
// Importar middleware de manejo de errores
import { errorHandler } from "./middlewares/errorHandler.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect(process.env.MONGO_URL)

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

// Ruta para datos mock
app.use("/api/mocks", mocksRouter);
// Middleware de manejo de errores
app.use(errorHandler);
// Middleware de manejo de errores
app.use(errorHandler);





app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
