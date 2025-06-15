import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/User';

const db = getFirestore();
const usersRef = collection(db, 'users');

export class UserDAO {
    static async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
        const id = uuidv4();

        const userData: User = {
            ...data,
            id,
            createdAt: serverTimestamp() as any,
            updatedAt: serverTimestamp() as any,
        };

        await setDoc(doc(db, 'users', id), userData);

        return userData;
    }

    static async getUserById(id: string): Promise<User | null> {
        const snapshot = await getDoc(doc(db, 'users', id));
        return snapshot.exists() ? (snapshot.data() as User) : null;
    }

    static async getUserByEmail(email: string): Promise<User | null> {
        const q = query(usersRef, where('email', '==', email));
        const snapshot = await getDocs(q);
        if (snapshot.empty) return null;
        return snapshot.docs[0].data() as User;
    }

    static async updateUser(id: string, updates: Partial<User>): Promise<void> {
        updates.updatedAt = serverTimestamp() as any;
        await updateDoc(doc(db, 'users', id), updates);
    }

    static async checkPassword(user: User, password: string): Promise<boolean> {
        return await bcrypt.compare(password, user.passwordHash);
    }
}
