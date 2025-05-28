import { Store } from "@tanstack/react-store";

interface FormStore {
    field: string | null;
    topics: Set<string>;
    industries: Set<string>;
    sources: Set<string>;
}

export const form_store = new Store<FormStore>({
    field: null,
    topics: new Set<string>(),
    industries: new Set<string>(),
    sources: new Set<string>(),
});

export interface PageData {
    url: string;
    vote: "up" | "down" | null;
    id: number;
}

interface PageStore {
    pages: PageData[];
}

export const page_store = new Store<PageStore>({ pages: [] });

interface URLStore {
    paths: string[];
}

export const url_store = new Store<URLStore>({
    paths: [],
});

export const setTopics = (topics: string[]) => {
    form_store.setState((state) => ({
        ...state,
        topics: new Set(topics),
    }));
};
