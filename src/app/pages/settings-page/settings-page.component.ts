import {Component, effect, inject, ViewChild} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProfileService} from '../../data/services/profile.service';
import {firstValueFrom} from 'rxjs';
import {AvatarUploadComponent} from './avatar-upload/avatar-upload.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrl: './settings-page.component.scss',
    imports: [ReactiveFormsModule, AvatarUploadComponent],
})
export class SettingsPageComponent {
    fb = inject(FormBuilder);
    profileService = inject(ProfileService);
    router = inject(Router);
    @ViewChild(AvatarUploadComponent) avatarUplouder!: AvatarUploadComponent;

    form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: [{value: '', disabled: true}, Validators.required],
        description: [''],
        stack: [''],
    });

    constructor() {
        effect(() => {
            //@ts-ignore
            this.form.patchValue({
                ...this.profileService.me(),
                //@ts-ignore
                stack: this.mergeStack(this.profileService.me()?.stack),
            });
        });
    }


    onSave() {
        this.form.markAllAsTouched();
        this.form.updateValueAndValidity();

        if (this.form.invalid) return;

        if (this.avatarUplouder.avatar) {
            firstValueFrom(this.profileService.uploadAvatar(this.avatarUplouder.avatar));
        }


        //FIXME
        //@ts-ignore
        firstValueFrom(
            //@ts-ignore
            this.profileService.patchProfile({
                //@ts-ignore
                ...this.form.value,
                //@ts-ignore
                stack: this.splitStack(this.form.value.stack),
            })
        );

        this.router.navigate(['']);
    }

    splitStack(stack: any) {
        if (!stack) return [];
        if (Array.isArray(stack)) return stack;
        return stack.split(',');
    }

    mergeStack(stack: any) {
        if (!stack) return '';
        if (Array.isArray(stack)) return stack.join(',');
        return stack;
    }
}
