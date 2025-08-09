import { Profile } from "./profile.interfase";

export interface Chats {
    id: string;
    message: string;
    createdAt: string;
    undeadMessage: string;
    userFrom: Profile;
}
