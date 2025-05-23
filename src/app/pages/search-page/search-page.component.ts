import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from "../../common-ui/profile-card/profile-card.component";
import { Profile } from '../../data/interfaces/profile.interfase';
import { ProfileService } from '../../data/services/profile.service';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})

export class SearchPageComponent {
  profileService = inject(ProfileService);
  profiles: Profile[] = [];

  constructor() {
    this.profileService.getTestAccounts()
      .subscribe(val => {
        this.profiles = val
      })
  }
}
