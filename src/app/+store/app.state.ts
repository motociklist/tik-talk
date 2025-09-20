import { AppState } from "../data/interfaces/app-state.interface";

export const initialAppState: AppState = {
    counter: 0,
    items: [],
    loading: false,
    error: null,
    isView: false,
};
