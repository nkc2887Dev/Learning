"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const app = new app_1.App();
const PORT = Number.parseInt(process.env.PORT || "3000", 10);
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/assembly-parts";
// Connect to database and start server
const startServer = async () => {
    try {
        await app.connectToDatabase(MONGO_URI);
        app.listen(PORT);
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
