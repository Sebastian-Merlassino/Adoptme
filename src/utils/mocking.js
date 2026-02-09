import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

// Genera N usuarios mock
export const generateMockUsers = async (count = 50) => {
  
  // Hash de la contraseña "coder123" (una sola vez)
  const passwordHash = await bcrypt.hash("coder123", 10);

  const users = [];

  for (let i = 0; i < count; i++) {
    users.push({
      _id: new mongoose.Types.ObjectId(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: passwordHash,
      role: faker.helpers.arrayElement(["user", "admin"]),
      pets: [],
    });
  }

  return users;
};