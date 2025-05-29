import { Store } from "@tanstack/react-store";

interface SetupStore {
    field: string | null;
    topics: Set<string>;
    industries: Set<string>;
    sources: Set<string>;
    notifications: boolean;
    recommender: "v1" | "v2";
}

export const setup_store = new Store<SetupStore>({
    field: null,
    industries: new Set<string>(),
    topics: new Set<string>(),
    sources: new Set<string>(),
    notifications: true,
    recommender: "v1",
});

export const setTopics = (topics: string[]) => {
    setup_store.setState((state) => ({
        ...state,
        topics: new Set(topics),
    }));
};

export const setSources = (sources: string[]) => {
    setup_store.setState((state) => ({
        ...state,
        sources: new Set(sources),
    }));
};

export const setIndustries = (industries: string[]) => {
    setup_store.setState((state) => ({
        ...state,
        industries: new Set(industries),
    }));
};

export const setField = (field: string) => {
    setup_store.setState((state) => ({
        ...state,
        field: field,
    }));
};

export const setNotifications = (notify: boolean) => {
    setup_store.setState((state) => ({
        ...state,
        notifications: notify,
    }));
};

export const setRecommender = (version: "v1" | "v2") => {
    setup_store.setState((state) => ({
        ...state,
        recommender: version,
    }));
};

export interface PageData {
    url: string;
    vote: "up" | "down" | null;
    id: number;
}

interface PageStore {
    pages: PageData[];
}

export const page_store = new Store<PageStore>({ pages: [] });
