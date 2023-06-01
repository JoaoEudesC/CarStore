import dotenv from "dotenv";
import { container } from "tsyringe";

import { IStorageProvider } from "../IStorageProvider";
import { LocalStorageProvider } from "./LocalStorageProvider";
import { S3StorageProvider } from "./S3StorageProvider";

dotenv.config();

// Váriavel que vai receber a váriavel de ambiente disk, tipei para string porque o typescript fornece um erro de tipagem, caso não fça isso
const disk = process.env.disk as "local" | "s3";

// Váriavel que vai receber o meu objeto, junto com a minha váriavel de ambiente disk
const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider,
};

// Váriavel que vai receber o meu obejto, junto com a minha váriavel de ambiente disk

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[disk]
);
