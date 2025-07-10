import { Component, inject, OnInit } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SvgIconComponent } from "../../common-ui/svg-icon/svg-icon.component";
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { PostFeedComponent } from "./post-feed/post-feed.component";


@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeaderComponent, AsyncPipe, SvgIconComponent, RouterModule, ImgUrlPipe, PostFeedComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})

export class ProfilePageComponent implements OnInit{
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  me$ = this.profileService.getMe();
  subscribers$ = this.profileService.getSubscribersShortList(10);
  subscribersList$ = this.profileService.getSubscriptions(500);
  subscribersListMe$ = this.profileService.getSubscriptionsListMe();
  editMode = true;

  ngOnInit() {
    this.profile$.subscribe((r) => console.log(r))
    this.subscribers$.subscribe((r) => console.log(r))
  }

  profile$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        //this.subscribersList$ = this.profileService.getSubscriptions(id);
        if (id === 'me') {
          this.editMode = true;
          return this.me$
        } else {
          this.editMode = false;
          return this.profileService.getAccount(id)
        }
      })
    )
}
