import { Bucketlist } from "./Bucketlist";

export interface User {
    id?: string
    username: string
    firstname: string | null
    lastname: string | null
    email: string
    passwordhash: string
    isAdult: boolean | null
    bucketlist: Bucketlist | null
    sharedbucketlists: Bucketlist[] | null
    profilePicture?: string | null
    onboardingComplete: boolean
    settings: {
        notification: boolean,
    }
    token?: string
    createdAt: string
}