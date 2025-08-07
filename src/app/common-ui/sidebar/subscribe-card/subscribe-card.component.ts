import { Component, Input } from '@angular/core';
import { Profile } from '../../../data/interfaces/profile.interfase';
import { ImgUrlPipe } from '../../../helpers/pipes/img-url.pipe';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-subscribe-card',
    imports: [ImgUrlPipe, RouterLink],
    templateUrl: './subscribe-card.component.html',
    styleUrl: './subscribe-card.component.scss',
})
export class SubscribeCardComponent {
    @Input() profile!: Profile;
}
