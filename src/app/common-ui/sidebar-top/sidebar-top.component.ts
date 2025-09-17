import { Component, Input, OnInit } from "@angular/core";
import { Location } from '@angular/common';

@Component({
    selector: "app-sidebar-top",
    standalone: true,
    templateUrl: "./sidebar-top.component.html",
    styleUrl: "./sidebar-top.component.scss",
    imports: [],
})
export class SidebarTopComponent implements OnInit {

    constructor(private location: Location) {}

    @Input() description: string = '';

    ngOnInit() {}

    goBack() {
        this.location.back();
    }
}
