import { useNavigate } from "react-router-dom";
import {
    hideBackButton,
    onBackButtonClick,
    showBackButton,
} from "@telegram-apps/sdk-react";
import { type PropsWithChildren, useEffect } from "react";
import { Debugger } from "./Debugger/debugger";

export function Page({
    children,
    back = true,
}: PropsWithChildren<{
    /**
     * True if it is allowed to go back from this page.
     */
    back?: boolean;
}>) {
    const navigate = useNavigate();

    useEffect(() => {
        if (back) {
            showBackButton();
            return onBackButtonClick(() => {
                navigate(-1);
            });
        }
        hideBackButton();
    }, [back]);

    return (
        <>
            <Debugger />
            {children}
        </>
    );
}
