import { Component, inject, Input, OnInit } from "@angular/core";
import { PostService } from "../../../data/services/post.service";
import { Profile } from '../../../data/interfaces/profile.interfase';
import { AsyncPipe } from "@angular/common";
import { PostComponent } from "../post/post.component";

@Component({
    selector: "app-post-list",
    imports: [AsyncPipe, PostComponent],
    templateUrl: "./post-list.component.html",
    styleUrl: "./post-list.component.scss",
})
export class PostListComponent implements OnInit {
    postService = inject(PostService);
    @Input() profile!: Profile;
    postList$=  this.postService.getPosts();

    ngOnInit() {}
}
