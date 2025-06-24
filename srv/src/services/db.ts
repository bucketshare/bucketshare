import { db } from "./../config/db";
import bcrypt from "bcryptjs";
import { DocumentData } from "firebase-admin/firestore";

// Add document
async function addData<T extends DocumentData>(collectionName: string, data: T) {
    const docRef = await db.collection(collectionName).add(data);
    return docRef.id;
}

// Get all documents
async function getAll<T = DocumentData>(collectionName: string): Promise<T[]> {
    const snapshot = await db.collection(collectionName).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
}

// Update a document
async function updateData<T>(collectionName: string, docId: string, data: Partial<T>) {
    const docRef = db.collection(collectionName).doc(docId);
    await docRef.update(data);
    return docId;
}

// Get one document
async function getOne<T = DocumentData>(collectionName: string, docId: string): Promise<T | null> {
    const docRef = db.collection(collectionName).doc(docId);
    const snapshot = await docRef.get();
    if (snapshot.exists) {
        return { id: snapshot.id, ...snapshot.data() } as T;
    } else {
        return null;
    }
}

// Get user by email and check password
async function getUserByEmailAndCheckPassword(
    email: string,
    password: string
): Promise<{ success: boolean; user?: any; message?: string }> {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).get();

    if (snapshot.empty) {
        return { success: false, message: "User not found" };
    }

    const userDoc = snapshot.docs[0];
    const user = userDoc.data();

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        return { success: true, user: { id: userDoc.id, ...user } };
    } else {
        return { success: false, message: "Incorrect password" };
    }
}

async function checkUsernameExists(username: string): Promise<boolean> {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("username", "==", username).limit(1).get();
    return !snapshot.empty;
}

async function checkEmailExists(email: string): Promise<boolean> {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).limit(1).get();
    return !snapshot.empty;
}


export { addData, getAll, updateData, getOne, getUserByEmailAndCheckPassword, checkEmailExists, checkUsernameExists };
