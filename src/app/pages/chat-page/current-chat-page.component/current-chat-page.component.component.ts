import { Component, inject, OnInit } from "@angular/core";
import { switchMap } from "rxjs";
import { ProfileService } from "../../../data/services/profile.service";
import { ActivatedRoute } from "@angular/router";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: "app-current-chat-page.component",
    imports: [AsyncPipe],
    templateUrl: "./current-chat-page.component.component.html",
    styleUrl: "./current-chat-page.component.component.scss",
})
export class CurrentChatPageComponentComponent implements OnInit {
    profileService = inject(ProfileService);
    route = inject(ActivatedRoute);

    chatData$ = this.route.params.pipe(
        switchMap(({ id }) => {
            return this.profileService.getChatId(id);
        })
    );

    ngOnInit() {
        this.chatData$.subscribe(chatData => {
            console.log(chatData);
        });
    }
}
