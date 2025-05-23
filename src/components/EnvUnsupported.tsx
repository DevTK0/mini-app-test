import { Placeholder, AppRoot } from "@telegram-apps/telegram-ui";
import {
    retrieveLaunchParams,
    isColorDark,
    isRGB,
} from "@telegram-apps/sdk-react";
import { useMemo } from "react";

export function EnvUnsupported() {
    const [platform, isDark] = useMemo(() => {
        try {
            const lp = retrieveLaunchParams();
            const { bg_color: bgColor } = lp.tgWebAppThemeParams;
            return [
                lp.tgWebAppPlatform,
                bgColor && isRGB(bgColor) ? isColorDark(bgColor) : false,
            ];
        } catch {
            return ["android", false];
        }
    }, []);

    return (
        <AppRoot
            appearance={isDark ? "dark" : "light"}
            platform={["macos", "ios"].includes(platform) ? "ios" : "base"}
        >
            <Placeholder
                header="Oops"
                description="Environment unsupported. Please run on the latest Telegram version."
            >
                <img
                    alt="Telegram sticker"
                    src="https://xelene.me/telegram.gif"
                    style={{
                        display: "block",
                        width: "144px",
                        height: "144px",
                    }}
                />
            </Placeholder>
        </AppRoot>
    );
}
