import { Component, Input } from "@angular/core";

@Component({
    selector: "svg[icon]",
    standalone: true,
    template: '<svg:use [attr.href]="href" />',
})
export class SvgIconComponent {
    @Input() icon = "";
    //FIXME
    get href() {
        return `/assets/imgs/icon-${this.icon}.svg#${this.icon}`;
    }
}
