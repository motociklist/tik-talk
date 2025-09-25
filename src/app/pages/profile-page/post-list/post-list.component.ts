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
    postList2$ : any  ;
    postList3$ : any  ;
    postList4$ : any  ;
    postList$=  this.postService.getPostMySubscriptions();

    ngOnInit() {
       // this.postList$ = this.postService.getPosts(this.profile.id);
        this.postList3$=  this.postService.getPostMySubscriptions().subscribe(jk => console.log(jk));
        this.postList2$ = this.postService.getPosts('493703965').subscribe(posts => console.log(posts));
        this.postList4$ = this.postService.getPosts(this.profile.id).subscribe(posts => console.log(posts));
    }
}
