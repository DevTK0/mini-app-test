import type { ComponentType, JSX } from "react";

import { IndexPage } from "@/pages/IndexPage/IndexPage";
import { ReaderPage } from "@/pages/ReaderPage/ReaderPage";

interface Route {
    path: string;
    Component: ComponentType;
    title?: string;
    icon?: JSX.Element;
}

export const routes: Route[] = [
    { path: "/", Component: IndexPage },
    { path: "/theme-params", Component: ReaderPage },
];
