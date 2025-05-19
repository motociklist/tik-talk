import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  standalone: true,
  imports: [],
  template: '<svg:use [attr.href]="href" />',
  styles: ['']
})

export class SvgIconComponent {
  @Input() icon = '';

  get href() {
    return `/assets/imgs/icon-${this.icon}.svg#${this.icon}`;
  }

}
