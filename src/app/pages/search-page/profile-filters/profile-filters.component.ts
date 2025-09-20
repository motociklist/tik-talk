import { Component, inject, OnDestroy } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, startWith, Subscription, switchMap } from "rxjs";
import { ProfileService } from "../../../data/services/profile.service";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { SidebarTopComponent } from "../../../common-ui/sidebar-top/sidebar-top.component";
import { selectIsView } from "../../../+store/app.selectors";
import { Store } from "@ngrx/store";

@Component({
    selector: "app-profile-filters",
    imports: [ReactiveFormsModule, SidebarTopComponent],
    templateUrl: "./profile-filters.component.html",
    styleUrl: "./profile-filters.component.scss",
})
export class ProfileFiltersComponent implements OnDestroy {
    store = inject(Store);

    fb = inject(FormBuilder);
    profileService = inject(ProfileService);

    isView = toSignal(this.store.select(selectIsView));

    searchForm = this.fb.group({
        firstName: [""],
        lastName: [""],
        stack: [""],
    });

    searchFormSub!: Subscription;

    constructor() {
        this.searchFormSub = this.searchForm.valueChanges
            .pipe(
                startWith({}), //fix
                debounceTime(300),
                switchMap(fromValue => {
                    return this.profileService.filterProfiles(fromValue);
                }),
                takeUntilDestroyed() //ngOnDestroy
            )
            .subscribe();
    }

    ngOnDestroy() {
        this.searchFormSub.unsubscribe();
    }
}
