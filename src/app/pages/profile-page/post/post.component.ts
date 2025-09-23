import { Component, Input, OnInit } from "@angular/core";
import { Post } from '../../../data/interfaces/post.interface';
import { ImgUrlPipe } from "../../../helpers/pipes/img-url.pipe";
import { DatePipe } from "@angular/common";

@Component({
    selector: "app-post",
    imports: [ImgUrlPipe, DatePipe],
    templateUrl: "./post.component.html",
    styleUrl: "./post.component.scss",
})
export class PostComponent implements OnInit {
    @Input() post!: Post;

    ngOnInit() {}
}
