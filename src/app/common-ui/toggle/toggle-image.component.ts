import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-toggle-image',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './toggle-image.component.html',
    styleUrls: ['./toggle-image.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleImageComponent {

    isSecondImage = signal(false);

    toggle() {
        this.isSecondImage.update(v => !v);
        console.log('value:', this.isSecondImage());
    }

}
