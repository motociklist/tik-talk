import { ActionReducerMap } from '@ngrx/store';
import { appReducer } from './app.reducer';
import { AppState } from './app.state';

export interface RootState {
    app: AppState;
}

export const reducers: ActionReducerMap<RootState> = {
    app: appReducer,
};
