import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Post } from "../interfaces/post.interface";
import { PostInput } from "../interfaces/post-input.interface";

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

    getPostMySubscriptions() {
        return this.http.get<Post[]>(`${this.baseApiUrl}post/my_subscriptions/`);
    }

    getPostId(id: string) {
        return this.http.get<Post>(`${this.baseApiUrl}post/${id}`);
    }

    updatePostId(id: string, text: string) {
        return this.http.patch<Post>(`${this.baseApiUrl}post/${id}`, null, {
            params: { text },
            //?
        });
    }

    deletePostId(id: string) {
        return this.http.delete<Post>(`${this.baseApiUrl}post/${id}`);
    }

    postLoadImageId(id: string, image: string) {
        return this.http.post<Post>(`${this.baseApiUrl}post/upload_image/${id}`, null, {
            //?
            params: { image },
        });
    }

    postDeleteImageId(id: string, image: string) {
        return this.http.delete<Post>(`${this.baseApiUrl}post/delete_image/${id}`, {
            //?
            params: { image },
        });
    }

    postCreateLikeId(id: string) {
        return this.http.post<Post>(`${this.baseApiUrl}post/like/${id}`, null);
    }

    postDeleteLikeId(id: string) {
        return this.http.delete<Post>(`${this.baseApiUrl}post/like/${id}`);
    }
}
