import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Profile } from '../interfaces/profile.interfase';
import { Pageble } from '../interfaces/pagable.interfase';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  me = signal<Profile | null>(null) ;

  getTestAccounts(){
    return this.http.get<Profile[]>(`${ this.baseApiUrl }account/test_accounts`);
  }

  getSubscribersShortList(subsAmount = 3){
    return this.http.get<Pageble<Profile>>(`${ this.baseApiUrl }account/subscribers/`)
      .pipe(
        map(res => res.items.slice(0,subsAmount))
      )
  }

  getMe(){
    return this.http.get<Profile>(`${ this.baseApiUrl }account/me`)
    .pipe(
      tap(res => this.me.set(res))
    )
  }

  getAccount(id: string){
    return this.http.get<Profile>(`${ this.baseApiUrl }account/${id}`)
  }

  patchProfile(profile: Partial<Profile>) {
      return this.http.patch<Profile>(
        `${ this.baseApiUrl }account/me`,
        profile
      )
  }
}
