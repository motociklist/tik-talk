import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, tap } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { loadData, loadDataFailure, loadDataSuccess } from './app.actions';

@Injectable()
export class AppEffects {

    private actions$ = inject(Actions);

    loadData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadData),
            delay(1000),
            tap(() => console.log('Load Data')),
            map(() => loadDataSuccess({ items: ['One', 'Two', 'Three'] })),
            catchError((error) => of(loadDataFailure({ error })))
        )
    );

}
