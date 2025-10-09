import { Component, inject, Input, ViewChild } from "@angular/core";
import { PostInputComponent } from "../post-input/post-input.component";
import { Profile } from "../../../data/interfaces/profile.interfase";
import { PostListComponent } from "../post-list/post-list.component";
import { ProfileService } from "../../../data/services/profile.service";
import { Post } from "../../../data/interfaces/post.interface";

@Component({
    selector: "app-post-feed",
    imports: [PostInputComponent, PostListComponent],
    templateUrl: "./post-feed.component.html",
    styleUrl: "./post-feed.component.scss",
})
export class PostFeedComponent {
    profileService = inject(ProfileService);
    @Input() profile!: Profile;
    me = this.profileService.me;

    @ViewChild(PostListComponent) postListComponent!: PostListComponent;

    onPostCreated(newPost: Post) {
        this.postListComponent.addPost(newPost);
    }
}
