import { Component, inject, OnInit } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { ProfileCardComponent } from "../../common-ui/profile-card/profile-card.component";
import { firstValueFrom } from "rxjs";
import { ChatService } from '../../data/services/chat.service';

@Component({
    selector: "app-chats-page",
    templateUrl: "./chats-page.component.html",
    imports: [ProfileCardComponent, AsyncPipe],
    styleUrl: "./chats-page.component.scss",
})
export class ChatsPageComponent implements OnInit {
    chatService = inject(ChatService);
    chats$ = this.chatService.getChatMe();

    ngOnInit() {
        this.chats$.subscribe(l => {
            console.log(l);
        });
    }

    onPush() {

        // firstValueFrom(this.chatService.getChatMe());
         firstValueFrom(this.chatService.getChatId("210"));
        // firstValueFrom(this.chatService.postChatId("124"));

        firstValueFrom(this.chatService.postMessageId('210', '1'));
        firstValueFrom(this.chatService.getMessageId('5055'));
        firstValueFrom(this.chatService.updateMessageId('5055', '2'));
       // firstValueFrom(this.chatService.deleteMessageId('5059'));
    }
}
