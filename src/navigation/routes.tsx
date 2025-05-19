import type { ComponentType, JSX } from "react";

import { TopicsPage } from "@/pages/Setup/TopicsPage";
import { ReaderPage } from "@/pages/ReaderPage/ReaderPage";
import { SettingsPage as SettingsPage } from "@/pages/Setup/SettingsPage";
import { SourceFilterPage } from "@/pages/Setup/SourceFilterPage";

interface Route {
    path: string;
    Component: ComponentType;
    title?: string;
    icon?: JSX.Element;
}

export const routes: Route[] = [
    { path: "/topics", Component: TopicsPage },
    { path: "/filters", Component: SourceFilterPage },
    { path: "/settings", Component: SettingsPage },

    { path: "/theme-params", Component: ReaderPage },
];
