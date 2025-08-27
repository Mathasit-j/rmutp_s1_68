"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const index_js_1 = require("./index.js");
(0, node_server_1.serve)(index_js_1.default, (info) => {
    console.log(`Server is running at http://localhost:${info.port}`);
});
