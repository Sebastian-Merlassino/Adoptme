import { Router } from "express";
import { generateMockUsers } from "../utils/mocking.js";
import { AppError } from "../utils/errors.js";
import userModel from "../dao/models/User.js";
import petModel from "../dao/models/Pet.js";

const router = Router();

// Endpoint para obtener usuarios mock (50)
router.get("/mockingusers", async (req, res, next) => {
  try {
    const users = await generateMockUsers(50);
    res.status(200).json({ status: "success", payload: users });
  } catch (error) {
    next(error);
  }
});

// Endpoint para obtener mascotas mock
router.get("/mockingpets", (req, res) => {
  const pets = [];

  for (let i = 0; i < 50; i++) {
    pets.push({
      name: `Pet${i + 1}`,
      specie: Math.random() < 0.5 ? "dog" : "cat",
      age: Math.floor(Math.random() * 10) + 1,
    });
  }

  res.status(200).json({ status: "success", payload: pets });
});

// Endpoint para probar el manejo de errores
router.get("/error-test", (req, res) => {
  throw new AppError("Error de prueba", 400, "TEST_ERROR");
});


router.post("/generateData", async (req, res, next) => {
  try {
    const { users, pets } = req.body;

    // Validación mínima
    if (
      typeof users !== "number" ||
      typeof pets !== "number" ||
      users < 0 ||
      pets < 0
    ) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid parameters" });
    }

    // Generar usuarios mock
    const mockUsers = await generateMockUsers(users);

    // Generar mascotas mock
    const mockPets = [];
    for (let i = 0; i < pets; i++) {
      mockPets.push({
        name: `Pet${i + 1}`,
        specie: Math.random() < 0.5 ? "dog" : "cat",
        age: Math.floor(Math.random() * 10) + 1,
      });
    }

    // Insertar en MongoDB
    await userModel.insertMany(mockUsers);
    await petModel.insertMany(mockPets);

    res.status(200).json({
      status: "success",
      insertedUsers: users,
      insertedPets: pets,
    });
  } catch (error) {
    next(error);
  }
});



export default router;

