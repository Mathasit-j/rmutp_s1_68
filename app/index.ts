import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { encode, decode } from "./service";  

const prisma = new PrismaClient();
const app = new Hono();

app.get("/", (c) => c.text("Hono!"));
app.get("/about", (c) => {
  return c.json({ message: "Mathasit Jaihow " });
});
app.get("/profile", async (c) => {
  const profile = await prisma.profile.findMany();

  const decodedProfiles = profile.map((p) => ({
    ...p,
    mobile: decode(p.mobile),
    cardId: decode(p.cardId),
  }));

  return c.json(decodedProfiles);
});

app.post("/profile", async (c) => {
  const body = await c.req.json();
  console.log("input of profile", body);
  console.log("body.password(original)", body.password);

  // encode 
  const encMobile = encode(body.mobile);
  const encCardId = encode(body.cardId);

  const existingProfile = await prisma.profile.findFirst({
    where: {
      OR: [{ mobile: encMobile }, { cardId: encCardId }],
    },
  });

  if (existingProfile) {
    let duplicatedFields = [];
    if (decode(existingProfile.mobile) === body.mobile)
      duplicatedFields.push("mobile");
    if (decode(existingProfile.cardId) === body.cardId)
      duplicatedFields.push("cardId");

    return c.json(
      { message: `ข้อมูลซ้ำ: ${duplicatedFields.join(", ")}` },
      503
    );
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
export default app;