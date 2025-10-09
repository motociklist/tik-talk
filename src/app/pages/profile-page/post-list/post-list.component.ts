import { Component, inject, Input, OnChanges } from "@angular/core";
import { PostService } from "../../../data/services/post.service";
import { Profile } from "../../../data/interfaces/profile.interfase";
import { AsyncPipe } from "@angular/common";
import { PostComponent } from "../post/post.component";
import { BehaviorSubject } from "rxjs";
import { Post } from "../../../data/interfaces/post.interface";

@Component({
    selector: "app-post-list",
    imports: [AsyncPipe, PostComponent],
    templateUrl: "./post-list.component.html",
    styleUrl: "./post-list.component.scss",
})
export class PostListComponent implements OnChanges {
    postService = inject(PostService);
    @Input() profile!: Profile;

    private postListSubject = new BehaviorSubject<Post[]>([]);
    postList$ = this.postListSubject.asObservable();

    ngOnChanges(): void {
        this.postService.getPosts(this.profile.id).subscribe(posts => {
            this.postListSubject.next(posts);
        });
    }

    addPost(post: Post) {
        const currentPosts = this.postListSubject.getValue();
        this.postListSubject.next([post, ...currentPosts]);
    }
}
