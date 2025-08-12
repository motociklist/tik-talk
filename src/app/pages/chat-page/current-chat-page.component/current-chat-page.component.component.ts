import { Component, inject, OnInit } from "@angular/core";
import { combineLatest, firstValueFrom, startWith, Subject, switchMap } from "rxjs";
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
    private refresh$ = new Subject<void>();
    profileService = inject(ProfileService);
    chatService = inject(ChatService);
    route = inject(ActivatedRoute);
    newMessage = "";
    me = this.profileService.me;
    idChat = "";
    isModalOpen: boolean = false;
    editText: string = '';
    idMessage: string = '';

    chatData$ = combineLatest([
        this.route.params,
        this.refresh$.pipe(startWith(null))
    ]).pipe(
        switchMap(([{ id }]) => {
            this.idChat = id;
            return this.chatService.getChatId(id);
        })
    );

    ngOnInit() {}

    isMyMessage(message: Message): boolean {
        return message.userFromId === this.me()?.id;
    }

    async sendMessage() {
        const trimmed = this.newMessage.trim();
        await firstValueFrom(this.chatService.postMessageId(this.idChat, trimmed));
        this.refresh$.next(); // Обновляем данные
    }

    async onDelete(id: string) {
        await firstValueFrom(this.chatService.deleteMessageId(id));
        this.refresh$.next(); // Обновляем данные
    }

    async saveMessage() {
        await firstValueFrom(this.chatService.updateMessageId(this.idMessage, this.editText));
        this.closeModal();
        this.refresh$.next(); // Обновляем данные
    }

    openModalEdit(message: Message) {
        this.editText = message.text;
        this.isModalOpen = true;
        this.idMessage = message.id;
    }

    closeModal() {
        this.isModalOpen = false;
    }
}
