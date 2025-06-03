import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { ProfileService } from '../../data/services/profile.service';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeaderComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})

export class ProfilePageComponent {
  profileService = inject(ProfileService)
}
