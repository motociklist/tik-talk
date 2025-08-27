import {Component, inject, OnInit} from "@angular/core";
import {PostService} from '../../../data/services/post.service';

@Component({
    selector: "app-post",
    imports: [],
    templateUrl: "./post.component.html",
    styleUrl: "./post.component.scss",
})
export class PostComponent implements OnInit {
    postService = inject(PostService);

    y = {
        title: "1",
        content: "string345y",
        authorId: 611626686,
        communityId: 0
    }


    ngOnInit() {

        this.postService.getPosts().subscribe((t) => {
            console.log(t)
        });

        // this.postService.postPostId(this.y).subscribe((t) => {
        //     console.log(t)
        // });
    }
}
