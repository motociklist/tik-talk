import { Component, signal, OnInit, inject, OnDestroy } from '@angular/core';
import { DndDirective } from '../../../common-ui/directives/dnd.directive';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../data/services/profile.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-avatar-upload',
    imports: [DndDirective, FormsModule],
    templateUrl: './avatar-upload.component.html',
    styleUrl: './avatar-upload.component.scss',
})
export class AvatarUploadComponent implements OnInit, OnDestroy {
    profileService = inject(ProfileService);
    me$ = toObservable(this.profileService.me);
    avatar: File | null = null;
    preview = signal<string>('/assets/imgs/eyse.svg');
    API_URL = 'https://icherniakov.ru/yt-course/';
    private destroy$ = new Subject<void>();

    ngOnInit() {
        this.me$.pipe(takeUntil(this.destroy$)).subscribe(me => {
            if (me?.avatarUrl) {
                this.preview.set(`${this.API_URL}${me.avatarUrl}`);
            }
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    fileBrowserHandler(event: Event) {
        const file = (event.target as HTMLInputElement)?.files?.[0];
        this.proccessFile(file);
    }

    onFileDroped(file: File) {
        this.proccessFile(file);
    }

    proccessFile(file: File | null | undefined) {
        if (!file || !file.type.match('image')) return;

        const reader = new FileReader();

        reader.onload = event => {
            this.preview.set(event.target?.result?.toString() ?? '');
        };

        reader.readAsDataURL(file);
        this.avatar = file;
    }
}
