import { Component, inject, Input, OnChanges, OnInit } from "@angular/core";
import { PostService } from "../../../data/services/post.service";
import { Profile } from "../../../data/interfaces/profile.interfase";
import { AsyncPipe } from "@angular/common";
import { PostComponent } from "../post/post.component";
import { Observable } from "rxjs";
import { Post } from "../../../data/interfaces/post.interface";

@Component({
    selector: "app-post-list",
    imports: [AsyncPipe, PostComponent],
    templateUrl: "./post-list.component.html",
    styleUrl: "./post-list.component.scss",
})
export class PostListComponent implements OnInit, OnChanges {
    postService = inject(PostService);
    @Input() profile!: Profile;

    postList$!: Observable<Post[]>;
    postList2$: any;
    postList3$: any;
    postList4$: any;

    ngOnInit(): void {
        this.postList3$ = this.postService.getPostMySubscriptions().subscribe(jk => console.log(jk));
        this.postList2$ = this.postService.getPosts("493703965").subscribe(posts => console.log(posts));
        this.postList4$ = this.postService.getPosts(this.profile.id).subscribe(posts => console.log(posts));
    }

    ngOnChanges(): void {
        if (this.profile?.id) {
            console.log(1);
            this.postList$ = this.postService.getPosts(this.profile.id);
        }
    }
}
