import { Component, inject } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { CommonModule } from '@angular/common';
import { SubscribeCardComponent } from "./subscribe-card/subscribe-card.component";
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [SvgIconComponent, CommonModule, SubscribeCardComponent, RouterModule]
})

export class SidebarComponent {
  profileService = inject(ProfileService)

  subscribers$ = this.profileService.getSubscribersShortList()

 


  menuItems = [{
    label: 'Моя страница',
    icon: 'home',
    link: ''
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
}
