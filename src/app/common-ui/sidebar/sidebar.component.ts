import { Component, inject } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { CommonModule } from '@angular/common';
import { SubscribeCardComponent } from "./subscribe-card/subscribe-card.component";
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [SvgIconComponent, CommonModule, SubscribeCardComponent, RouterModule, ImgUrlPipe]
})

export class SidebarComponent {
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList();
  me = this.profileService.me;

  menuItems = [{
    label: 'Моя страница',
    icon: 'home',
    link: 'profile/me'
  },
  {
    label: 'Чаты',
    icon: 'direct',
    link: 'chats'
  },
  {
    label: 'Поиск',
      icon: 'search',
      link: 'search'
    }
]

  ngOnInit (){
    firstValueFrom(this.profileService.getMe());
  }
}
