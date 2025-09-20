import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { SidebarBottomComponent } from "../sidebar-bottom/sidebar-bottom.component";

@Component({
    selector: "app-layout",
    imports: [RouterOutlet, SidebarBottomComponent, SidebarComponent],
    templateUrl: "./layout.component.html",
    styleUrl: "./layout.component.scss",
})
export class LayoutComponent {}
