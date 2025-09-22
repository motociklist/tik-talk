import {Component, inject, Input, OnInit} from "@angular/core";
import { PostService } from "../../../data/services/post.service";
import {Profile} from '../../../data/interfaces/profile.interfase';

@Component({
    selector: "app-post",
    imports: [],
    templateUrl: "./post-list.component.html",
    styleUrl: "./post-list.component.scss",
})
export class PostListComponent implements OnInit {
    postService = inject(PostService);

    @Input() profile!: Profile;

    ngOnInit() {
    }
}
