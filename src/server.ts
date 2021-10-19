if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

import { app } from "./app";

app.listen(process.env.PORT)