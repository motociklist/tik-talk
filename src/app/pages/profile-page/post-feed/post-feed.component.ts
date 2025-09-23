import { Component, Input } from "@angular/core";
import { PostInputComponent } from "../post-input/post-input.component";
import { PostComponent } from "../post/post.component";
import { Profile } from '../../../data/interfaces/profile.interfase';
import { PostListComponent } from "../post-list/post-list.component";

@Component({
    selector: "app-post-feed",
    imports: [PostInputComponent, PostComponent, PostListComponent],
    templateUrl: "./post-feed.component.html",
    styleUrl: "./post-feed.component.scss",
})
export class PostFeedComponent {
    @Input() profile!: Profile;
}
