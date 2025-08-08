import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Profile } from "../../data/interfaces/profile.interfase";
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { Subject } from "rxjs";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-profile-card",
    imports: [ImgUrlPipe, RouterLink],
    templateUrl: "./profile-card.component.html",
    styleUrl: "./profile-card.component.scss",
})
export class ProfileCardComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    @Input() profile!: Profile;
    @Input() chatMode: boolean = false;
    @Input() chatId?: string;

    ngOnInit() {}

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
