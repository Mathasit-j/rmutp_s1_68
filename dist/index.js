"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
//import { PrismaClient } from "../generated/prisma/client";
const prisma = new client_1.PrismaClient();
const app = new hono_1.Hono();
app.get('/', (c) => c.text('Hono!'));
app.get('/about', (c) => { return c.json({ message: "Mathasit Jaihow" }); });
app.get("/profile", async (c) => {
    //logic
    const profiles = prisma.profile.findMany();
    return c.json(profiles);
});
app.post("/profile", async (c) => {
    //logic to create a new profile
    const body = await c.req.json();
    console.log("input of profile", body);
    console.log("body.passwaord(original)", body.password);
    //encode password
    const passwordHash = await bcrypt_1.default.hash(body.password, 10);
    console.log("hash.password(after)", passwordHash);
    //save to db
    //output response
    return c.json({
        message: "create profile completed"
    });
});
exports.default = app;
