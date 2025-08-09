import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { Subject } from "rxjs";
import { RouterLink } from "@angular/router";
import { Chats } from "../../data/interfaces/chats.interface";
import { DatePipe } from "@angular/common";

@Component({
    selector: "app-chat-card",
    imports: [ImgUrlPipe, RouterLink, DatePipe],
    templateUrl: "./chat-card.component.html",
    styleUrl: "./chat-card.component.scss",
})
export class ChatCardComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    @Input() chat!: Chats;
    @Input() chatMode: boolean = false;

    ngOnInit() {}

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
