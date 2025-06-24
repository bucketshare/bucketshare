"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const db_1 = require("./db");
const validateUser = async (email, password) => {
    const user = await (0, db_1.getUserByEmailAndCheckPassword)(email, password);
    return user;
};
exports.validateUser = validateUser;
