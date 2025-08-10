import { Component, inject, OnInit } from "@angular/core";
import { firstValueFrom, switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { AsyncPipe, NgClass } from "@angular/common";
import { ChatService } from "../../../data/services/chat.service";
import { Message } from "../../../data/interfaces/message.interface";
import { ProfileService } from "../../../data/services/profile.service";
import { ImgUrlPipe } from "../../../helpers/pipes/img-url.pipe";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-current-chat-page.component",
    imports: [AsyncPipe, NgClass, ImgUrlPipe, FormsModule],
    templateUrl: "./current-chat-page.component.component.html",
    styleUrl: "./current-chat-page.component.component.scss",
})
export class CurrentChatPageComponentComponent implements OnInit {
    profileService = inject(ProfileService);
    chatService = inject(ChatService);
    route = inject(ActivatedRoute);
    newMessage = "";
    me = this.profileService.me;
    idChat = "";

    chatData$ = this.route.params.pipe(
        switchMap(({ id }) => {
            this.idChat = id;
            return this.chatService.getChatId(id);
        })
    );

    ngOnInit() {
        // this.chatData$.subscribe(chatData => {
        //     console.log(chatData);
        // });
    }

    async sendMessage() {
        const trimmed = this.newMessage.trim();
        firstValueFrom(this.chatService.postMessageId(this.idChat, trimmed));
    }

    isMyMessage(message: Message): boolean {
        return message.userFromId === this.me()?.id;
    }

    onDelete(id: string) {
        firstValueFrom(this.chatService.deleteMessageId(id));
    }

    openModalRed() {
        firstValueFrom(this.chatService.updateMessageId("5183", "26768877"));
    }
}
