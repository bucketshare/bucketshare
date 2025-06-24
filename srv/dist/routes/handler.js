"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_1 = require("../controllers/token");
const handler = (0, express_1.Router)();
handler.post('save-fcm-token', token_1.saveFCMtoken);
exports.default = handler;
