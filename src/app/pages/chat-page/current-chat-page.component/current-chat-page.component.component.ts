import { Component, inject, OnInit } from "@angular/core";
import { switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { ChatService } from '../../../data/services/chat.service';

@Component({
    selector: "app-current-chat-page.component",
    imports: [AsyncPipe],
    templateUrl: "./current-chat-page.component.component.html",
    styleUrl: "./current-chat-page.component.component.scss",
})
export class CurrentChatPageComponentComponent implements OnInit {
    chatService = inject(ChatService);
    route = inject(ActivatedRoute);

    chatData$ = this.route.params.pipe(
        switchMap(({ id }) => {
            return this.chatService.getChatId(id);
        })
    );

    ngOnInit() {
        this.chatData$.subscribe(chatData => {
            console.log(chatData);
        });
    }
}
