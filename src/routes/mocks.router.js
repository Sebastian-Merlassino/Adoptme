import { Router } from "express";
import { generateMockUsers } from "../utils/mocking.js";
import { AppError } from "../utils/errors.js";


const router = Router();

// Endpoint para obtener usuarios mock

router.get("/users", (req, res) => {
  const count = Number(req.query.count) || 50;
  const users = generateMockUsers(count);
  res.status(200).json({ status: "success", payload: users });
});

// Endpoint para probar el manejo de errores
router.get("/error-test", (req, res) => {
  throw new AppError("Error de prueba", 400, "TEST_ERROR");
});



export default router;
