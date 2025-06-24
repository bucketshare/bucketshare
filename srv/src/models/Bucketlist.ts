import { Bucketlistitem } from "./Bucketlistitem"

export interface Bucketlist {
    name: string
    items: Bucketlistitem[]
    createdAt: string
}