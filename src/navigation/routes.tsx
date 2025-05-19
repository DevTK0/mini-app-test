import type { ComponentType, JSX } from "react";

import { TopicsPage } from "@/pages/Setup/TopicsPage";
import { ReaderPage } from "@/pages/ReaderPage/ReaderPage";
import { SettingsPage as SettingsPage } from "@/pages/Setup/SettingsPage";
import { SourceFilterPage } from "@/pages/Setup/SourceFilterPage";
import { IndustryPage } from "@/pages/Setup/IndustryPage";
import { FieldPage } from "@/pages/Setup/FieldPage";
import { DifficultyPage } from "@/pages/Setup/DifficultyPage";

interface Route {
    path: string;
    Component: ComponentType;
    title?: string;
    icon?: JSX.Element;
}

export const routes: Route[] = [
    { path: "/field", Component: FieldPage },
    { path: "/industry", Component: IndustryPage },
    { path: "/topics", Component: TopicsPage },
    { path: "/filters", Component: SourceFilterPage },
    { path: "/difficulty", Component: DifficultyPage },
    { path: "/settings", Component: SettingsPage },

    { path: "/theme-params", Component: ReaderPage },
];
