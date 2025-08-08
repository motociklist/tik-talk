import { Profile } from "./profile.interfase";

export interface Chat {
    id: string;
    message?: string;
    created?: Date;
    undeadMessage?: string;
    userFrom?: Profile;

    messages?: [];
    userFirst?: Profile;
    userSecond?: Profile;
}
