import { Profile } from "./profile.interfase";

export interface Post {
    id: string;
    title: string,
    communityId: number,
    content: string,
    author: Profile;
    images: string[],
    createdAt: Date,
    updatedAt: Date,
    likes: number,
    likesUsers: string[],
    comments: string[]
}
