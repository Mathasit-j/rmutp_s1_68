"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const service_1 = require("./service");
const prisma = new client_1.PrismaClient();
const app = new hono_1.Hono();
app.get("/", (c) => c.text("Hono!"));
app.get("/about", (c) => {
    return c.json({ message: "Mathasit Jaihow " });
});
app.get("/profile", async (c) => {
    const profile = await prisma.profile.findMany();
    const decodedProfiles = profile.map((p) => (Object.assign(Object.assign({}, p), { mobile: (0, service_1.decode)(p.mobile), cardId: (0, service_1.decode)(p.cardId) })));
    return c.json(decodedProfiles);
});
app.post("/profile", async (c) => {
    const body = await c.req.json();
    console.log("input of profile", body);
    console.log("body.password(original)", body.password);
    // encode 
    const encMobile = (0, service_1.encode)(body.mobile);
    const encCardId = (0, service_1.encode)(body.cardId);
    const existingProfile = await prisma.profile.findFirst({
        where: {
            OR: [{ mobile: encMobile }, { cardId: encCardId }],
        },
    });
    if (existingProfile) {
        let duplicatedFields = [];
        if ((0, service_1.decode)(existingProfile.mobile) === body.mobile)
            duplicatedFields.push("mobile");
        if ((0, service_1.decode)(existingProfile.cardId) === body.cardId)
            duplicatedFields.push("cardId");
        return c.json({ message: `ข้อมูลซ้ำ: ${duplicatedFields.join(", ")}` }, 503);
    }
    // hash password 
    body.password = await bcrypt.hash(body.password, 18);
    // save
    body.mobile = encMobile;
    body.cardId = encCardId;
    body.status = false;
    const result = await prisma.profile.create({
        data: body,
    });
    // decode 
    c.status(200);
    return c.json({
        message: "create profile completed",
        data: result,
    });
});
exports.default = app;
