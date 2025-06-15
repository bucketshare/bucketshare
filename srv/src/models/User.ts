// models/User.ts
import { Timestamp } from 'firebase/firestore';

export interface User {
    id: string;
    username: string;
    name: string;
    lastname: string;
    email: string;
    phoneNumber?: string;
    passwordHash: string;
    emailVerified: boolean;
    avatarUrl?: string;
    bio?: string;
    role: 'user' | 'admin';
    isActive: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    settings: {
        language: string;
        notificationsEnabled: boolean;
    };
}
