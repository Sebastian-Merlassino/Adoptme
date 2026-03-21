import request from "supertest";
import { expect } from "chai";
import sinon from "sinon";
import app from "../src/app.js";
import {
    adoptionsService,
    usersService,
    petsService,
} from "../src/services/index.js";

describe("Adoption Router - Functional Tests", () => {
    afterEach(() => {
        sinon.restore();
    });

    describe("GET /api/adoptions", () => {
        it("debe devolver todas las adopciones con status 200", async () => {
            const fakeAdoptions = [
                { _id: "a1", owner: "u1", pet: "p1" },
                { _id: "a2", owner: "u2", pet: "p2" },
            ];

            sinon.stub(adoptionsService, "getAll").resolves(fakeAdoptions);

            const response = await request(app).get("/api/adoptions");

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("status", "success");
            expect(response.body).to.have.property("payload");
            expect(response.body.payload).to.be.an("array");
            expect(response.body.payload).to.have.lengthOf(2);
            expect(response.body.payload[0]).to.deep.equal(fakeAdoptions[0]);
        });
    });

    describe("GET /api/adoptions/:aid", () => {
        it("debe devolver una adopción existente con status 200", async () => {
            const fakeAdoption = { _id: "a1", owner: "u1", pet: "p1" };

            sinon.stub(adoptionsService, "getBy").resolves(fakeAdoption);

            const response = await request(app).get("/api/adoptions/a1");

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("status", "success");
            expect(response.body).to.have.property("payload");
            expect(response.body.payload).to.deep.equal(fakeAdoption);
        });

        it("debe devolver 404 si la adopción no existe", async () => {
            sinon.stub(adoptionsService, "getBy").resolves(null);

            const response = await request(app).get("/api/adoptions/adopcion-inexistente");

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property("status", "error");
            expect(response.body).to.have.property("error", "Adoption not found");
        });
    });

    describe("POST /api/adoptions/:uid/:pid", () => {
        it("debe crear una adopción correctamente", async () => {
            const fakeUser = {
                _id: "u1",
                pets: [],
            };

            const fakePet = {
                _id: "p1",
                adopted: false,
            };

            sinon.stub(usersService, "getUserById").resolves(fakeUser);
            sinon.stub(petsService, "getBy").resolves(fakePet);
            sinon.stub(usersService, "update").resolves({});
            sinon.stub(petsService, "update").resolves({});
            sinon.stub(adoptionsService, "create").resolves({});

            const response = await request(app).post("/api/adoptions/u1/p1");

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("status", "success");
            expect(response.body).to.have.property("message", "Pet adopted");
            expect(usersService.update.calledOnce).to.equal(true);
            expect(petsService.update.calledOnce).to.equal(true);
            expect(adoptionsService.create.calledOnce).to.equal(true);
        });

        it("debe devolver 404 si el usuario no existe", async () => {
            sinon.stub(usersService, "getUserById").resolves(null);

            const response = await request(app).post("/api/adoptions/u-inexistente/p1");

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property("status", "error");
            expect(response.body).to.have.property("error", "user Not found");
        });

        it("debe devolver 404 si la mascota no existe", async () => {
            const fakeUser = {
                _id: "u1",
                pets: [],
            };

            sinon.stub(usersService, "getUserById").resolves(fakeUser);
            sinon.stub(petsService, "getBy").resolves(null);

            const response = await request(app).post("/api/adoptions/u1/p-inexistente");

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property("status", "error");
            expect(response.body).to.have.property("error", "Pet not found");
        });

        it("debe devolver 400 si la mascota ya está adoptada", async () => {
            const fakeUser = {
                _id: "u1",
                pets: [],
            };

            const fakePet = {
                _id: "p1",
                adopted: true,
            };

            sinon.stub(usersService, "getUserById").resolves(fakeUser);
            sinon.stub(petsService, "getBy").resolves(fakePet);

            const response = await request(app).post("/api/adoptions/u1/p1");

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property("status", "error");
            expect(response.body).to.have.property("error", "Pet is already adopted");
        });
    });
});