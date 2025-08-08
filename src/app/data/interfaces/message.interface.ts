export interface Message {
    id: string;
    userFromId: string;
    personalChatId: string;
    text: "string";
    createdAt: Date;
    isRead: boolean;
    updatedAt: Date;
}
