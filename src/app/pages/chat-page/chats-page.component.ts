import { Component, inject, OnInit } from "@angular/core";
import { ProfileService } from "../../data/services/profile.service";
import { AsyncPipe } from "@angular/common";
import { ProfileCardComponent } from "../../common-ui/profile-card/profile-card.component";
import { firstValueFrom } from "rxjs";

@Component({
    selector: "app-chats-page",
    templateUrl: "./chats-page.component.html",
    imports: [ProfileCardComponent, AsyncPipe],
    styleUrl: "./chats-page.component.scss",
})
export class ChatsPageComponent implements OnInit {
    profileService = inject(ProfileService);
    chats$ = this.profileService.getChatMe();

    ngOnInit() {
        this.chats$.subscribe(l => {
            console.log(l);
        });
    }

    onPush() {
        firstValueFrom(this.profileService.getChatMe());
        firstValueFrom(this.profileService.getChatId("210"));
        firstValueFrom(this.profileService.postChatId("124"));
    }
}
