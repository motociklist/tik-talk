import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: "app-sidebar-top",
    standalone: true,
    templateUrl: "./sidebar-top.component.html",
    styleUrl: "./sidebar-top.component.scss",
    imports: [],
})
export class SidebarTopComponent implements OnInit {
    @Input() description: string = '';
    ngOnInit() {

    }

}
