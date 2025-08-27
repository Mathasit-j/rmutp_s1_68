"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const client_1 = require("@prisma/client");
//import { PrismaClient } from "../generated/prisma/client";
const prisma = new client_1.PrismaClient();
const app = new hono_1.Hono();
app.get('/', (c) => c.text('Hono!'));
app.get('/about', (c) => { return c.json({ message: "Mathasit Jaihow" }); });
app.get("/profile", (c) => {
    //logic
    const profiles = prisma.profile.findMany();
    return c.json(profiles);
});
exports.default = app;
