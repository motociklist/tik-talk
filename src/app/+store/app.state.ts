export interface AppState {
    counter: number;
    items: string[];
    loading: boolean;
    error: any;
}

export const initialAppState: AppState = {
    counter: 0,
    items: [],
    loading: false,
    error: null,
};
