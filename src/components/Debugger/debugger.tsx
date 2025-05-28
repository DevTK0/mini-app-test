import { FC, useState } from "react";
import { useStore } from "@tanstack/react-store";
import { form_store } from "@/helpers/stores";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

export const Debugger: FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const field = useStore(form_store, (state) => state.field);
    const topics = useStore(form_store, (state) => state.topics);
    const industries = useStore(form_store, (state) => state.industries);
    const sources = useStore(form_store, (state) => state.sources);
    const launchParams = retrieveLaunchParams();

    const containerStyle = {
        position: "fixed" as const,
        top: "20px",
        right: "20px",
        background: "#000",
        color: "#fff",
        padding: "10px",
        borderRadius: "4px",
        fontSize: "12px",
        zIndex: 9999,
        cursor: "pointer",
        transition: "all 0.3s ease",
    };

    // Collapsed view
    if (!isExpanded) {
        return (
            <div style={containerStyle} onClick={() => setIsExpanded(true)}>
                📊 T:{topics.size} I:{industries.size} N:{sources.size}
            </div>
        );
    }

    return (
        <div
            style={{
                ...containerStyle,
                minWidth: "300px",
                maxWidth: "400px",
                maxHeight: "80vh",
                overflow: "auto",
                cursor: "default",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                    borderBottom: "1px solid #333",
                    paddingBottom: "4px",
                    position: "sticky",
                    top: 0,
                    background: "#000",
                }}
            >
                <span>Debug Info</span>
                <span
                    onClick={() => setIsExpanded(false)}
                    style={{ cursor: "pointer" }}
                >
                    ✕
                </span>
            </div>

            {/* Store Data */}
            <div style={{ marginBottom: "16px" }}>
                <strong style={{ color: "#00ff00" }}>Store Data:</strong>

                <div style={{ marginBottom: "8px" }}>
                    <strong>Field:</strong>
                    <div style={{ marginLeft: "8px" }}>
                        <div key={field}>{field}</div>
                    </div>
                </div>

                <div style={{ marginBottom: "8px" }}>
                    <strong>Topics ({topics.size}):</strong>
                    <div style={{ marginLeft: "8px" }}>
                        {Array.from(topics).map((topic) => (
                            <div key={topic}>• {topic}</div>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: "8px" }}>
                    <strong>Industry:</strong>
                    <div style={{ marginLeft: "8px" }}>
                        {Array.from(industries).map((industry) => (
                            <div key={industry}>• {industry}</div>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: "8px" }}>
                    <strong>News Sources ({sources.size}):</strong>
                    <div style={{ marginLeft: "8px" }}>
                        {Array.from(sources).map((source) => (
                            <div key={source}>• {source}</div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Launch Params */}
            <div>
                <strong style={{ color: "#00ff00" }}>Launch Params:</strong>
                <div style={{ marginTop: "8px" }}>
                    <strong>User:</strong>
                    <pre
                        style={{
                            margin: "4px 0",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-all",
                        }}
                    >
                        {JSON.stringify(
                            launchParams?.tgWebAppData?.user,
                            null,
                            2
                        )}
                    </pre>
                </div>

                <div style={{ marginTop: "8px" }}>
                    <strong>Chat:</strong>
                    <pre
                        style={{
                            margin: "4px 0",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-all",
                        }}
                    >
                        {JSON.stringify(
                            launchParams?.tgWebAppData?.chat,
                            null,
                            2
                        )}
                    </pre>
                </div>

                <div style={{ marginTop: "8px" }}>
                    <strong>Other Params:</strong>
                    <pre
                        style={{
                            margin: "4px 0",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-all",
                        }}
                    >
                        {JSON.stringify(
                            {
                                version: launchParams?.tgWebAppVersion,
                                botInline: launchParams?.tgWebAppBotInline,
                                platform: launchParams?.tgWebAppPlatform,
                                themeParams: launchParams?.tgWebAppThemeParams,
                                startParams: launchParams?.tgWebAppStartParam,
                            },
                            null,
                            2
                        )}
                    </pre>
                </div>
            </div>
        </div>
    );
};
