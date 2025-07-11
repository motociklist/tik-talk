import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interfase';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom, Subject, takeUntil, tap} from 'rxjs';

@Component({
  selector: 'app-profile-card',
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})

export class ProfileCardComponent implements OnInit, OnDestroy {
  profileService = inject(ProfileService);
  isSubscribed: boolean = false;
  private destroy$ = new Subject<void>();

  @Input() profile!: Profile;

  ngOnInit() {
    this.subscribersListMe$.subscribe(t => (t));
  }

  //FIXME
  subscribersListMe$ = this.profileService.getSubscriptionsListMe().pipe(
    takeUntil(this.destroy$),
    tap((subscribers) => {
      this.isSubscribed = subscribers.some(sub => sub.id === this.profile.id);
      console.log('Is subscribed:', this.isSubscribed);
    })
  );

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  Subscribe() {
    firstValueFrom(this.profileService.postSubscriber(this.profile.id))
  }

  Unsubscribe() {
    firstValueFrom(this.profileService.deleteSubscriber(this.profile.id))
  }
}
