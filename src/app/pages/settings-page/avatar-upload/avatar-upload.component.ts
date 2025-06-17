import { Component, signal, model, OnInit, inject } from '@angular/core';
import { DndDirective } from '../../../common-ui/directives/dnd.directive';
import { FormsModule } from '@angular/forms'
// import { ProfileService } from '../../../data/services/profile.service';
// import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-avatar-upload',
  imports: [DndDirective, FormsModule],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent  {
  // profileService = inject(ProfileService);
  // me$ = toObservable(this.profileService.me);
 
  // ngOnInit() {
  //   //@ts-ignore
  //    this.me$.subscribe(r => this.preview.set(r?.toString()))
  // }

  preview = signal<string>('/assets/imgs/eyse.svg');

  avatar:  File | null = null


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
    this.avatar = file
  }

}
