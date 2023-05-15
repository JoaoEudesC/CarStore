import dotenv from "dotenv";

import { app } from "./app";

dotenv.config();

const { PORT } = process.env;
app.listen(() => {
    console.log(`O servidor está rodando em http://localhost:${PORT}`);
});
