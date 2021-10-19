"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
const app_1 = require("./app");
app_1.app.listen(process.env.PORT);
