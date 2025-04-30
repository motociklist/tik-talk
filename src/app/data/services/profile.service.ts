import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interfase';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient)

  baseApiUrl = 'https://icherniakov.ru/yt-course'

  getTestAccounts(){
    return this.http.get<Profile[]>(`${ this.baseApiUrl }/account/test_accounts`);
  }
}
