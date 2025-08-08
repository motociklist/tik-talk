import { Routes } from "@angular/router";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { SearchPageComponent } from "./pages/search-page/search-page.component";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";
import { LayoutComponent } from "./common-ui/layout/layout.component";
import { canActivateAuth } from "./auth/access.guard";
import { SettingsPageComponent } from "./pages/settings-page/settings-page.component";
import { ChatsPageComponent } from "./pages/chat-page/chats-page.component";
import { CurrentChatPageComponentComponent } from "./pages/chat-page/current-chat-page.component/current-chat-page.component.component";

export const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
            { path: "", redirectTo: "profile/me", pathMatch: "full" },
            { path: "search", component: SearchPageComponent },
            { path: "profile/:id", component: ProfilePageComponent },
            { path: "settings", component: SettingsPageComponent },
            { path: "chats", component: ChatsPageComponent },
            { path: "chat/:id", component: CurrentChatPageComponentComponent },
        ],
        canActivate: [canActivateAuth],
    },
    {
        path: "login",
        component: LoginPageComponent,
    },
];
