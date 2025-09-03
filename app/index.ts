import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

//import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();

const app = new Hono();

app.get('/', (c) => c.text('Hono!'));

app.get('/about', (c) => {return c.json({message: "Mathasit Jaihow"})});

app.get("/profile", async(c) => {
    //logic
    const profiles = prisma.profile.findMany();
    return c.json(profiles);
});
app.post("/profile", async (c) => {
    //logic to create a new profile
    const body = await c.req.json();
    console.log("input of profile", body);
    console.log("body.passwaord(original)",body.password);


    //encode password
    const passwordHash = await bcrypt.hash(body.password, 10);
    console.log("hash.password(after)", passwordHash);
    body.password = passwordHash;
    console.log("body.password(replace)", body);
    
    //save to db
    await prisma.profile.create({
        data:body
    });

    //output response
    return c.json({
        message: "create profile completed"
    })
});

export default app