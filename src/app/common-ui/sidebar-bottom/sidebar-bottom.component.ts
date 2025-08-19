import { Component, OnInit } from "@angular/core";
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";


@Component({
    selector: "app-sidebar-bottom",
    standalone: true,
    templateUrl: "./sidebar-bottom.component.html",
    styleUrl: "./sidebar-bottom.component.scss",
    imports: [SvgIconComponent, CommonModule, RouterModule],
})
export class SidebarBottomComponent implements OnInit {
    menuItems = [
        {
            label: "Моя страница",
            icon: "home",
            link: "profile/me",
        },
        {
            label: "Чаты",
            icon: "direct",
            link: "chats",
        },
        {
            label: "Поиск",
            icon: "search",
            link: "search",
        },
        {
            label: "Настройки",
            icon: "settings",
            link: "settings",
        },
    ];

    ngOnInit() {}
}
