"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
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
    const passwordHash = await bcrypt.hash(body.password, 10);
    console.log("hash.password(after)", passwordHash);
    body.password = passwordHash;
    console.log("body.password(replace)", body);
    //save to db
    body.status = false;
    const result = await prisma.profile.create({
        data: body
    });
    //output response
    return c.json({
        message: "create profile completed",
        data: result
    });
});
exports.default = app;
