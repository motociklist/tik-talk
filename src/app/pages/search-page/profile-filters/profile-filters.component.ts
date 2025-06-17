import { Component, inject } from '@angular/core';
import { FormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';
import { ProfileService } from '../../../data/services/profile.service';

@Component({
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent {
  fb = inject(FormBuilder);
  profileServis = inject(ProfileService);

  searchForm = this.fb.group({
    firstName:[''],
    lastName:[''],
    stack:[''],
  })

  constructor() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(fromValue => {
          return this.profileServis.filterProfils(fromValue)
        })
      )
       .subscribe()
  }
}
