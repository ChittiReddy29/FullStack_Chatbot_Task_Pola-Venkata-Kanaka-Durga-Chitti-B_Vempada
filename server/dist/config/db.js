"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
let mongoMemoryServer = null;
const connectDB = async () => {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dronetv_db';
    try {
        // Attempt standard connection with 3 sec selection timeout
        await mongoose_1.default.connect(mongoURI, {
            serverSelectionTimeoutMS: 3000,
        });
        console.log(`[Database] Connected to MongoDB database at ${mongoURI}`);
    }
    catch (error) {
        console.warn(`[Database] Could not connect to primary MongoDB at ${mongoURI}.`);
        console.log(`[Database] Initializing MongoDB In-Memory Server fallback for hassle-free execution...`);
        try {
            mongoMemoryServer = await mongodb_memory_server_1.MongoMemoryServer.create();
            const memoryUri = mongoMemoryServer.getUri();
            await mongoose_1.default.connect(memoryUri);
            console.log(`[Database] Connected successfully to In-Memory MongoDB instance at ${memoryUri}`);
        }
        catch (memError) {
            console.error('[Database] Failed to start In-Memory MongoDB:', memError);
            process.exit(1);
        }
    }
};
exports.connectDB = connectDB;
const closeDB = async () => {
    await mongoose_1.default.disconnect();
    if (mongoMemoryServer) {
        await mongoMemoryServer.stop();
    }
};
exports.closeDB = closeDB;
