import { Component, inject, OnInit } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { ChatService } from "../../data/services/chat.service";
import { ChatCardComponent } from "../../common-ui/chat-card/chat-card.component";
import { SidebarTopComponent } from "../../common-ui/sidebar-top/sidebar-top.component";

@Component({
    selector: "app-chats-page",
    templateUrl: "./chats-page.component.html",
    imports: [AsyncPipe, ChatCardComponent, SidebarTopComponent],
    styleUrl: "./chats-page.component.scss",
})
export class ChatsPageComponent implements OnInit {
    chatService = inject(ChatService);
    chats$ = this.chatService.getChatMe();

    ngOnInit() {
        // this.chats$.subscribe(l => {
        //     console.log(l);
        // });
    }
}
