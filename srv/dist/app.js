"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handler_1 = __importDefault(require("./routes/handler"));
const auth_1 = __importDefault(require("./routes/auth"));
const dotenv_1 = require("dotenv");
const passport_1 = __importDefault(require("./config/passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(passport_1.default.initialize());
app.use((0, cookie_parser_1.default)());
app.use('/', handler_1.default);
app.use("/auth", auth_1.default);
const PORT = process.env.PORT || "5000";
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
