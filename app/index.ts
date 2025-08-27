import { Hono } from "hono";

const app = new Hono();

app.get('/', (c) => c.text('Hono!'));

app.get('/about', (c) => {return c.json({message: "Mathasit Jaihow"})});

export default app