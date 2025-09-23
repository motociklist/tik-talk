import {Component, inject, Input, OnInit} from "@angular/core";
import { PostService } from "../../../data/services/post.service";
import {Profile} from '../../../data/interfaces/profile.interfase';
import {Post} from '../../../data/interfaces/post.interface';
import { ImgUrlPipe } from "../../../helpers/pipes/img-url.pipe";

@Component({
    selector: "app-post",
    imports: [ImgUrlPipe],
    templateUrl: "./post.component.html",
    styleUrl: "./post.component.scss",
})
export class PostComponent implements OnInit {
    postService = inject(PostService);
    //FIXME
    post!: Post;


    @Input() profile!: Profile;

    ngOnInit() {
        this.postService.getPosts().subscribe(t => {
            this.post = t[0];
            console.log(this.post);
        });
    }
}
