import { createAction, props } from '@ngrx/store';

export const increment = createAction(
    '[App] Increment'
);

export const decrement = createAction('[App] Decrement');

export const reset = createAction('[App] Reset');

export const loadData = createAction('[App] Load Data');

export const loadDataSuccess = createAction(
    '[App] Load Data Success',
    props<{ items: string[] }>()
);

export const loadDataFailure = createAction(
    '[App] Load Data Failure',
    props<{ error: any }>()
);
