// A estrutura vai ser a mesma, o que mudará é a logica.
import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { createConnection1 } from "../../../../shared/infra/database/DataSource";
import { app } from "../../../../shared/infra/http/app";

let connection: Connection;

describe("Create Category Controller", () => {
    beforeAll(async () => {
        connection = await createConnection1();
        await connection.runMigrations();
        const id = uuidV4();
        const password = await hash("admin", 10);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
            `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.destroy();
    });

    it("should be to list all categories", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin",
        });
        const { token } = responseToken.body;

        await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Description Supertest",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });
        const response = await request(app).get("/categories");

        expect(response.status).toBe(200);
    });
});
