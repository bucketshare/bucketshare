"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFCMtoken = void 0;
const db_1 = require("../services/db");
const saveFCMtoken = async (req, res) => {
    const { token } = req.body;
    const userid = "dlfa";
    await (0, db_1.updateData)('users', userid, { token: token });
};
exports.saveFCMtoken = saveFCMtoken;
