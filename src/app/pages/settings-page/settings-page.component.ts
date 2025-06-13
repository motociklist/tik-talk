import { Component, effect, inject } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { FormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../data/services/profile.service';
 

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  imports : [ReactiveFormsModule,ProfileHeaderComponent]
})

export class SettingsPageComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  form = this.fb.group({
    firstName : ['', Validators.required],
    lastName : ['', Validators.required],
    username : [{value: '', disabled: true}, Validators.required],
    desctiption : [''],
    stack : ['']
  })

  constructor() {
    effect(()=> {
      //@ts-ignore
      this.form.patchValue(this.profileService.me())
    })
  }

  onSave() {
    
  }
 
 
}
