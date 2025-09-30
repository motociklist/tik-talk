import { Component, inject, Input, OnInit } from "@angular/core";
import { Profile } from "../../../data/interfaces/profile.interfase";
import { ImgUrlPipe } from "../../../helpers/pipes/img-url.pipe";
import { FormsModule } from "@angular/forms";
import { PostService } from "../../../data/services/post.service";
import { PostInput } from "../../../data/interfaces/post-input.interface";
import { ProfileService } from "../../../data/services/profile.service";

@Component({
    selector: "app-post-input",
    imports: [ImgUrlPipe, FormsModule],
    templateUrl: "./post-input.component.html",
    styleUrl: "./post-input.component.scss",
})
export class PostInputComponent implements OnInit {
    postService = inject(PostService);
    profileService = inject(ProfileService);
    postText = "";
    @Input() profile!: Profile;

    me = this.profileService.me;
    ngOnInit() {
        console.log(this.me());
    }

    postSend() {
        const newPost: PostInput = {
            title: "1",
            content: this.postText,
            authorId: this.profile.id,
            communityId: 0,
        };

        this.postService.postPostId(newPost).subscribe(t => {
            console.log(t);
        });

        //FIXME output

        this.postText = "";
    }
}
