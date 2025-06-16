import { Component, signal } from '@angular/core';
import { DndDirective } from '../../../common-ui/directives/dnd.directive';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-avatar-upload',
  imports: [DndDirective,SvgIconComponent],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {
  preview = signal<string>('/assets/imgs/eyse.svg');


  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
 
    this.proccessFile(file);
  }

  onFileDroped(file: File) {
      this.proccessFile(file);
  }

  proccessFile(file: File | null | undefined) {
    if(!file || !file.type.match('image')) return

    const reader = new FileReader();

    reader.onload = event => {
      this.preview.set(event.target?.result?.toString() ?? '')
    }

    reader.readAsDataURL(file)
  }

}
