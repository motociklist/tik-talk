import {  initialAppState } from "./app.state";
import { createReducer, on } from "@ngrx/store";
import {
    decrement,
    increment,
    loadData,
    loadDataFailure,
    loadDataSuccess,
    reset
} from "./app.actions";
import { AppState } from '../data/interfaces/app-state.interface';

export const appReducer = createReducer(
    initialAppState,

    on(increment, (state: AppState) => {
        return {
            ...state,
            loading: false,
            counter: state.counter + 1
        };
    }),

    on(decrement, (state: AppState) => ({ ...state, counter: state.counter - 1 })),

    on(reset, (state: AppState) => ({ ...state, counter: 0 })),

    on(loadData, (state: AppState) => ({
        ...state,
        loading: true
    })),

    on(loadDataSuccess, (state: AppState, { items }) => ({
        ...state,
        loading: false,
        items,
    })),

    on(loadDataFailure, (state: AppState, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);
