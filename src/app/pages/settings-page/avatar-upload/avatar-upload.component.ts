import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-avatar-upload',
  imports: [],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {
  preview = signal<string>('/assets/imgs/eyse.svg');


  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    const reader = new FileReader();

    if(!file || !file.type.match('image')) return

    reader.onload = event => {
      this.preview.set(event.target?.result?.toString() ?? '')
    }

    reader.readAsDataURL(file)
  }

}
