import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Message } from "../interfaces/message.interface";
import {Post} from '../interfaces/post.interface';
import {PostInput} from '../interfaces/post-input.interface';

@Injectable({
    providedIn: "root",
})
export class PostService {
    http = inject(HttpClient);
    baseApiUrl = "https://icherniakov.ru/yt-course/";

    getPosts() {
        return this.http.get<Post[]>(`${this.baseApiUrl}post/`);
    }

    postPostId(PostInput: PostInput) {
        return this.http.post<Post>(`${this.baseApiUrl}post/`, PostInput);
    }

    getPostMe() {
        return this.http.get<Post[]>(`${this.baseApiUrl}post/get_my_posts/`);
    }

    getPostId(id: string) {
        return this.http.get<Post>(`${this.baseApiUrl}post/${id}`);
    }

    postMessageId(id: string, message: string) {
        return this.http.post<Message>(`${this.baseApiUrl}message/send/${id}`, null, {
            params: { message },
        });
    }

    getMessageId(id: string) {
        return this.http.get<Message>(`${this.baseApiUrl}message/${id}`);
    }

    updateMessageId(id: string, text: string) {
        return this.http.patch<Message>(`${this.baseApiUrl}message/${id}`, null, {
            params: { text },
        });
    }

    deleteMessageId(id: string) {
        return this.http.delete<Message>(`${this.baseApiUrl}message/${id}`);
    }
}
