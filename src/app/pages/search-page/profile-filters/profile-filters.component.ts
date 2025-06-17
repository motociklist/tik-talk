import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, startWith, Subscribable, Subscription, switchMap } from 'rxjs';
import { ProfileService } from '../../../data/services/profile.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent implements OnDestroy {
  fb = inject(FormBuilder);
  profileServis = inject(ProfileService);

  searchForm = this.fb.group({
    firstName:[''],
    lastName:[''],
    stack:[''],
  })

  searchFormSub!: Subscription

  constructor() {
    this.searchFormSub = this.searchForm.valueChanges
      .pipe(
        startWith({}), //fix
        debounceTime(300),
        switchMap(fromValue => {
          return this.profileServis.filterProfils(fromValue)
        }),
        takeUntilDestroyed() //ngOnDestroy
      )
       .subscribe()
  }

  ngOnDestroy() {
    this.searchFormSub.unsubscribe()
  }
}
