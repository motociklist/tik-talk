import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../data/interfaces/app-state.interface";

export const selectAppState = createFeatureSelector<AppState>("app");

export const selectCounter = createSelector(selectAppState, state => state.counter);

export const selectItems = createSelector(selectAppState, state => state.items);

export const selectLoading = createSelector(selectAppState, state => state.loading);

export const selectIsView = createSelector(selectAppState, state => state.isView);
