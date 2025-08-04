import { Component, inject, OnInit } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { SvgIconComponent } from "../../common-ui/svg-icon/svg-icon.component";
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { PostFeedComponent } from "./post-feed/post-feed.component";


@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeaderComponent, AsyncPipe, SvgIconComponent, RouterModule, ImgUrlPipe, PostFeedComponent, NgClass],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})

export class ProfilePageComponent implements OnInit{
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  me$ = this.profileService.getMe();
  subscribersListMe$ = this.profileService.getSubscriptionsListMe();
  editMode = true;
  // @ts-ignore
  currentProfile: Profile = {};

  ngOnInit() {
    this.profile$.subscribe(profile => {
      this.currentProfile = profile;
    })
  }

  Subscribe() {
    if (!this.currentProfile) return;
    this.profileService.postSubscriber(this.currentProfile.id).subscribe(() => {
      this.currentProfile = {
        ...this.currentProfile,
        isSubscribed: true
      };
    });
  }

  Unsubscribe() {
    if (!this.currentProfile) return;
    this.profileService.deleteSubscriber(this.currentProfile.id).subscribe(() => {
      this.currentProfile = {
        ...this.currentProfile,
        isSubscribed: false
      };
    });
  }

  profile$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        if (id === 'me') {
          this.editMode = true;
          return this.me$
        } else {
          this.editMode = false;
          return this.profileService.getAccount(id)
        }
      })
    )

  subscribersList$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'me') {
        return this.subscribersListMe$;
      } else {
        return this.profileService.getSubscriptions(id);
      }
    })
  )
}
