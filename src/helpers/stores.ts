import { Store } from "@tanstack/react-store";

interface StoreState {
    field: string | null;
    topics: Set<string>;
    industries: Set<string>;
    sources: Set<string>;
}

export const store = new Store<StoreState>({
    field: null,
    topics: new Set<string>(),
    industries: new Set<string>(),
    sources: new Set<string>(),
});

export const setTopics = (topics: string[]) => {
    store.setState((state) => ({
        ...state,
        topics: new Set(topics),
    }));
};
