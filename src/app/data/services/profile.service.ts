import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interfase';
import { Pageble } from '../interfaces/pagable.interfase';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  http = inject(HttpClient);

  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  getTestAccounts(){
    return this.http.get<Profile[]>(`${ this.baseApiUrl }account/test_accounts`);
  }

  getSubscribersShortList(){
    return this.http.get<Pageble<Profile>>(`${ this.baseApiUrl }account/subscribers/`)
      .pipe(
        map(res => res.items.slice(0,3))
      )
  }

  getMe(){
    return this.http.get<Profile>(`${ this.baseApiUrl }account/me`);
  }

}
