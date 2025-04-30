import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from "./common-ui/profile-card/profile-card.component";
import { ProfileService } from './data/services/profile.service';
import { Profile } from './data/interfaces/profile.interfase';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  profileService = inject(ProfileService);
  profiles : Profile[] = []

  constructor(){
    this.profileService.getTestAccounts()
    .subscribe(val => {
      this.profiles = val
    })
  }
}