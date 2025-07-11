import {Component, inject, Input, OnInit} from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interfase';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { ProfileService } from '../../data/services/profile.service';
import {firstValueFrom, switchMap, tap} from 'rxjs';

@Component({
  selector: 'app-profile-card',
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})

export class ProfileCardComponent implements OnInit {
  profileService = inject(ProfileService);
  @Input() profile!: Profile;
  isSubscribed: boolean = false;

  ngOnInit() {
    this.subscribersListMe$.subscribe(t => (t));
  }

  subscribersListMe$ = this.profileService.getSubscriptionsListMe().pipe(
    tap((subscribers) => {
      this.isSubscribed = subscribers.some(sub => sub.id === this.profile.id);
      console.log('Is subscribed:', this.isSubscribed);
    })
  );

  Subscribe() {
    firstValueFrom(this.profileService.postSubscriber(this.profile.id))
  }

  Unsubscribe() {
    firstValueFrom(this.profileService.deleteSubscriber(this.profile.id))
  }
}
