"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
require("reflect-metadata"); // Required for class-validator and class-transformer
const part_routes_1 = __importDefault(require("./routes/part.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }
    initializeMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
    }
    initializeRoutes() {
        this.app.use("/api/parts", part_routes_1.default);
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.errorMiddleware);
    }
    async connectToDatabase(mongoUri) {
        try {
            await mongoose_1.default.connect(mongoUri);
            console.log("Connected to MongoDB");
        }
        catch (error) {
            console.error("MongoDB connection error:", error);
            process.exit(1);
        }
    }
    listen(port) {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}
exports.App = App;
