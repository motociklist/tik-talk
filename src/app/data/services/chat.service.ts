import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { Chat } from "../interfaces/chat.interface";
import { Chats } from '../interfaces/chats.interface';

@Injectable({
    providedIn: "root",
})
export class ChatService {
    http = inject(HttpClient);
    baseApiUrl = "https://icherniakov.ru/yt-course/";

    getChatMe() {
        return this.http.get<Chats[]>(`${this.baseApiUrl}chat/get_my_chats/`);
    }

    getChatId(id: string) {
        return this.http.get<Chat>(`${this.baseApiUrl}chat/${id}`);
    }

    postChatId(id: string) {
        return this.http.post<Chat>(`${this.baseApiUrl}chat/${id}`, null);
    }
}
