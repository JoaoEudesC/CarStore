import dotenv from "dotenv";

import { app } from "./app";

dotenv.config();
// eslint-disable-next-line prefer-destructuring
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`O servidor está rodando em http://localhost:${PORT}`);
});
