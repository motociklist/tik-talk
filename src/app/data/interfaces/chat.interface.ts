import { Profile } from "./profile.interfase";
import { Message } from "./message.interface";

export interface Chat {
    id: string;
    messages: Message[];
    userFirst: Profile;
    userSecond: Profile;
}
