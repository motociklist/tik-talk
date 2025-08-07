import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Profile } from '../interfaces/profile.interfase';
import { Pageable } from '../interfaces/pageable.interface';
import { map, tap } from 'rxjs';
import { Chat } from '../interfaces/chat.interface';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    http = inject(HttpClient);
    baseApiUrl = 'https://icherniakov.ru/yt-course/';
    me = signal<Profile | null>(null);
    filteretProfils = signal<Profile[]>([]);

    getTestAccounts() {
        return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`);
    }

    getSubscribersShortList(subsAmount = 3) {
        return this.http
            .get<Pageable<Profile>>(`${this.baseApiUrl}account/subscribers/`)
            .pipe(map(res => res.items.slice(0, subsAmount)));
    }

    getSubscriptions(id: number) {
        return this.http
            .get<Pageable<Profile>>(`${this.baseApiUrl}account/subscriptions/${id}`)
            .pipe(map(res => res.items));
    }

    postSubscriber(id: number) {
        return this.http.post<Profile>(`${this.baseApiUrl}account/subscribe/${id}`, null);
    }

    deleteSubscriber(id: number) {
        return this.http.delete<Profile>(`${this.baseApiUrl}account/subscribe/${id}`);
    }

    getSubscriptionsListMe() {
        return this.http.get<Pageable<Profile>>(`${this.baseApiUrl}account/subscriptions/`).pipe(map(res => res.items));
    }

    getMe() {
        return this.http.get<Profile>(`${this.baseApiUrl}account/me`).pipe(tap(res => this.me.set(res)));
    }

    getAccount(id: string) {
        return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`);
    }

    getChatMe() {
        return this.http.get<Chat[]>(`${this.baseApiUrl}chat/get_my_chats/`);
    }

    getChatId(id: string) {
        return this.http.get<Profile>(`${this.baseApiUrl}chat/${id}`);
    }

    postChatId(id: string) {
        return this.http.post<Profile>(`${this.baseApiUrl}chat/${id}`, null);
    }

    patchProfile(profile: Partial<Profile>) {
        return this.http.patch<Profile>(`${this.baseApiUrl}account/me`, profile);
    }

    uploadAvatar(file: File) {
        const fd = new FormData();
        fd.append('image', file);

        return this.http.post<Profile>(`${this.baseApiUrl}account/upload_image`, fd);
    }

    filterProfiles(params: Record<string, any>) {
        return this.http
            .get<Pageable<Profile>>(`${this.baseApiUrl}account/accounts`, { params })
            .pipe(tap(res => this.filteretProfils.set(res.items)));
    }
}
