import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
//import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();

const app = new Hono();

app.get('/', (c) => c.text('Hono!'));

app.get('/about', (c) => {return c.json({message: "Mathasit Jaihow"})});

app.get("/profile", (c) => {
    //logic
    const profiles = prisma.profile.findMany();
    return c.json(profiles);
});

export default app