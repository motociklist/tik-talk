import { Component, inject, OnInit, signal } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { CommonModule } from '@angular/common';
import { SubscribeCardComponent } from "./subscribe-card/subscribe-card.component";
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { AuthService } from '../../auth/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [SvgIconComponent, CommonModule, SubscribeCardComponent, RouterModule, ImgUrlPipe]
})

export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService);
  authService = inject(AuthService);
  subscribers$ = this.profileService.getSubscriptionsListMe();
  me = this.profileService.me;
  showSubscribers = signal(false);

  toggleSubscribers() {
    this.showSubscribers.update(value => !value);
  }

  menuItems = [{
    label: 'Моя страница',
    icon: 'home',
    link: 'profile/me'
  },
  {
    label: 'Чаты',
    icon: 'direct',
    link: 'profile/me'
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

  logout() {
    this.authService.logout()
  }
}
