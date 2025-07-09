import { Component, inject, Input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interfase';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile-card',
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})

export class ProfileCardComponent {
  profileService = inject(ProfileService);
  @Input() profile!: Profile;

  Subscribe() {
    firstValueFrom(this.profileService.postSubscriber(this.profile.id))
  }

  Unsubscribe() {
    firstValueFrom(this.profileService.deleteSubscriber(this.profile.id))
  }
}
