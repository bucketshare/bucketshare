"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addData = addData;
exports.getAll = getAll;
exports.updateData = updateData;
exports.getOne = getOne;
exports.getUserByEmailAndCheckPassword = getUserByEmailAndCheckPassword;
exports.checkEmailExists = checkEmailExists;
exports.checkUsernameExists = checkUsernameExists;
const db_1 = require("./../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Add document
async function addData(collectionName, data) {
    const docRef = await db_1.db.collection(collectionName).add(data);
    return docRef.id;
}
// Get all documents
async function getAll(collectionName) {
    const snapshot = await db_1.db.collection(collectionName).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
// Update a document
async function updateData(collectionName, docId, data) {
    const docRef = db_1.db.collection(collectionName).doc(docId);
    await docRef.update(data);
    return docId;
}
// Get one document
async function getOne(collectionName, docId) {
    const docRef = db_1.db.collection(collectionName).doc(docId);
    const snapshot = await docRef.get();
    if (snapshot.exists) {
        return { id: snapshot.id, ...snapshot.data() };
    }
    else {
        return null;
    }
}
// Get user by email and check password
async function getUserByEmailAndCheckPassword(email, password) {
    const usersRef = db_1.db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).get();
    if (snapshot.empty) {
        return { success: false, message: "User not found" };
    }
    const userDoc = snapshot.docs[0];
    const user = userDoc.data();
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (isMatch) {
        return { success: true, user: { id: userDoc.id, ...user } };
    }
    else {
        return { success: false, message: "Incorrect password" };
    }
}
async function checkUsernameExists(username) {
    const usersRef = db_1.db.collection("users");
    const snapshot = await usersRef.where("username", "==", username).limit(1).get();
    return !snapshot.empty;
}
async function checkEmailExists(email) {
    const usersRef = db_1.db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).limit(1).get();
    return !snapshot.empty;
}
