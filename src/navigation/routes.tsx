import type { ComponentType, JSX } from "react";

import { TopicsPage } from "@/pages/Setup/steps/TopicsPage";
import { ReaderPage } from "@/pages/Reader/ReaderPage";
import { SettingsPage as SettingsPage } from "@/pages/Setup/steps/SettingsPage";
import { SourceFilterPage } from "@/pages/Setup/steps/SourceFilterPage";
import { IndustryPage } from "@/pages/Setup/steps/IndustryPage";
import { FieldPage } from "@/pages/Setup/steps/FieldPage";
import { DifficultyPage } from "@/pages/Setup/steps/DifficultyPage";
import { SetupPage } from "@/pages/Setup/SetupPage";

interface Route {
    path: string;
    Component: ComponentType;
    title?: string;
    icon?: JSX.Element;
}

export const routes: Route[] = [
    { path: "/setup", Component: SetupPage },
    { path: "/field", Component: FieldPage },
    { path: "/industry", Component: IndustryPage },
    { path: "/topics", Component: TopicsPage },
    { path: "/filters", Component: SourceFilterPage },
    { path: "/difficulty", Component: DifficultyPage },
    { path: "/settings", Component: SettingsPage },

    { path: "/reader", Component: ReaderPage },
];
