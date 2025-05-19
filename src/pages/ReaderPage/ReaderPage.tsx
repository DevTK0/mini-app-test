import { Page } from "@/components/Page";
import { Section, List, FixedLayout, Button } from "@telegram-apps/telegram-ui";
import { useState, type FC } from "react";

export const ReaderPage: FC = () => {
    const [isActive, setIsActive] = useState(false);

    const handleVote = () => {
        setIsActive(true);
    };

    return (
        <Page back={true}>
            <List>
                <Section>
                    <div
                        style={{
                            width: "100%",
                            height: "calc(100vh - 80px)", // Adjust height to leave space for voting section
                            marginBottom: "16px",
                            position: "relative",
                        }}
                    >
                        <iframe
                            src="https://openai.com/index/introducing-codex/"
                            style={{
                                width: "100%",
                                height: "100%",
                                border: "none",
                                borderRadius: "8px",
                                backgroundColor: "#fff",
                            }}
                            title="Content"
                            allowFullScreen
                        />
                    </div>

                    <FixedLayout
                        style={{
                            padding: 16,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                                gap: "12px",
                            }}
                        >
                            <Button
                                size="m"
                                onClick={() => handleVote()}
                                style={{
                                    flex: 1,
                                }}
                            >
                                👍🏻
                            </Button>
                            <Button
                                size="m"
                                onClick={() => handleVote()}
                                style={{
                                    flex: 1,
                                }}
                            >
                                👎🏻
                            </Button>
                            <div
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "50%",
                                    backgroundColor: isActive
                                        ? "#4CAF50"
                                        : "#EAEAEA",
                                    color: isActive ? "blue" : "#000",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    transition: "background-color 0.3s ease",
                                }}
                            >
                                50
                            </div>
                        </div>
                    </FixedLayout>
                </Section>
            </List>
        </Page>
    );
};
