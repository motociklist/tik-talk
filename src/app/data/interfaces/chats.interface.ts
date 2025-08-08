import { Profile } from "./profile.interfase";

export interface Chats {
    id: string;
    message: string;
    created: Date;
    undeadMessage: string;
    userFrom: Profile;
}
