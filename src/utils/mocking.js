import { faker } from "@faker-js/faker";

// Genera 1 usuario mock
export const generateMockUser = () => ({
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password({ length: 10 }),
  role: faker.helpers.arrayElement(["user", "admin"]),
});

// Genera N usuarios mock
export const generateMockUsers = (count = 50) =>
  Array.from({ length: count }, () => generateMockUser());
