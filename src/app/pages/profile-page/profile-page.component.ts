import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { ProfileService } from "../../data/services/profile.service";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Subscription, switchMap } from "rxjs";
import { AsyncPipe, NgClass } from "@angular/common";
import { SvgIconComponent } from "../../common-ui/svg-icon/svg-icon.component";
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { PostFeedComponent } from "./post-feed/post-feed.component";
import { Profile } from "../../data/interfaces/profile.interfase";
import { ChatService } from "../../data/services/chat.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectCounter } from "../../+store/app.selectors";
import { decrement, increment } from "../../+store/app.actions";
import { RootState } from "../../+store";

@Component({
    selector: "app-profile-page",
    imports: [ProfileHeaderComponent, SvgIconComponent, RouterModule, ImgUrlPipe, PostFeedComponent, NgClass, AsyncPipe],
    templateUrl: "./profile-page.component.html",
    styleUrl: "./profile-page.component.scss",
})
export class ProfilePageComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription();
    profileService = inject(ProfileService);
    chatService = inject(ChatService);
    route = inject(ActivatedRoute);
    me$ = this.profileService.getMe();
    subscribersListMe$ = this.profileService.getSubscriptionsListMe();
    editMode = true;
    currentProfile!: Profile;
    counter$!: Subscription;

    constructor(
        private router: Router,
        private store: Store<RootState>
    ) {}

    ngOnInit() {
        this.profile$.subscribe(profile => {
            this.currentProfile = profile;
            console.log(this.currentProfile);
        });
        console.log(this.store.select(selectCounter));
        this.counter$ = this.store.select(selectCounter).subscribe(df => console.log(df));

        this.Sube();
    }

    Subscribe() {
        if (!this.currentProfile) return;
        this.profileService.postSubscriber(this.currentProfile.id).subscribe(() => {
            this.currentProfile = {
                ...this.currentProfile,
                isSubscribed: true,
            };
        });
    }

    Sube() {
        this.store.dispatch(increment());
        this.store.dispatch(decrement());
    }

    Unsubscribe() {
        if (!this.currentProfile) return;
        this.profileService.deleteSubscriber(this.currentProfile.id).subscribe(() => {
            this.currentProfile = {
                ...this.currentProfile,
                isSubscribed: false,
            };
        });
    }

    profile$ = this.route.params.pipe(
        switchMap(({ id }) => {
            if (id === "me") {
                this.editMode = true;
                return this.me$;
            } else {
                this.editMode = false;
                return this.profileService.getAccount(id);
            }
        })
    );

    subscribersList$ = this.route.params.pipe(
        switchMap(({ id }) => {
            if (id === "me") {
                return this.subscribersListMe$;
            } else {
                return this.profileService.getSubscriptions(id);
            }
        })
    );

    openChat() {
        this.chatService.postChatId(this.currentProfile.id).subscribe(chat => {
            this.router.navigate(["/chat", chat.id]);
        });
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
