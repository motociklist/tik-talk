import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { delay, map, take, tap } from 'rxjs';
import { from } from 'rxjs/internal/observable/from';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService = inject(AuthService);

  form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required)
  })

  constructor() {
    from([1,2,3,4])
    .pipe(
      map((val: number) => val*2),
      take(2),
      delay(1000),
      tap((val:any) =>{
        this.form.patchValue({username: val.toString()})
      })
    )
    .subscribe( (val: any) =>{
      console.log(val);
    })
  }

  onSubmit() {
    if (this.form.valid) {
      //@ts-ignore
      this.authService.login(this.form.value).subscribe({
        next: (response) => {
          console.log('Успешный ответ:', response);
        },
        error: (error) => {
          console.error('Ошибка:', error);

        }
      });
    }
  }

}
