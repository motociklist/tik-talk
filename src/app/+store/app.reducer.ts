import { AppState, initialAppState } from "./app.state";
import { Action, createReducer, on } from "@ngrx/store";
import {
    decrement,
    increment,
    loadData,
    loadDataFailure,
    loadDataSuccess,
    reset
} from "./app.actions";


// export const serverFeatureKey = "server";

const reducer = createReducer(
    initialAppState,

    on(increment, (state: AppState) => {
        return {
            ...state,
            loading: false,
            counter: state.counter + 1
        };
    }),

    // on(increment, state => ({ ...state, counter: state.counter + 1 })),
    //
    // on(decrement, (state: AppState) => ({ ...state, counter: state.counter - 1 })),
    //
    // on(reset, (state: AppState) => ({ ...state, counter: 0 })),
    //
    //
    // on(loadData, (state: AppState) => ({
    //     ...state,
    //     loading: true
    // })),
    //
    // on(loadDataSuccess, (state: AppState, { items }) => ({
    //     ...state,
    //     loading: false,
    //     items,
    // })),
    //
    // on(loadDataFailure, (state: AppState, { error }) => ({
    //     ...state,
    //     loading: false,
    //     error,
    // }))
);

export function appReducer(state: AppState | undefined, action: Action) {
    return reducer(state, action);
}
