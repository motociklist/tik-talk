import { Profile } from "./profile.interfase";

export interface Chat {
    id: string;
    messages: [];
    userFirst: Profile;
    userSecond: Profile;
}
