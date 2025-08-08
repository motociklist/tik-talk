import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { Chat } from "../interfaces/chat.interface";
import { Chats } from '../interfaces/chats.interface';
import {Message} from '../interfaces/message.interface';

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

    postMessageId(id: string, message: string) {
        return this.http.post<Message>(`${this.baseApiUrl}message/send/${id}`, null, {
                params:{message}
        });
    }

    getMessageId(id: string) {
        return this.http.get<Message>(`${this.baseApiUrl}message/${id}`);
    }

    updateMessageId(id: string, text: string) {
        return this.http.patch<Message>(`${this.baseApiUrl}message/${id}`, null, {
            params:{text}
        });
    }

    deleteMessageId(id: string) {
        return this.http.delete<Message>(`${this.baseApiUrl}message/${id}`);
    }
}
