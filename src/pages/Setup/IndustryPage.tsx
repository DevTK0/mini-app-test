import {
    List,
    Steps,
    FixedLayout,
    Button,
    LargeTitle,
    Chip,
    Multiselectable,
} from "@telegram-apps/telegram-ui";
import { type FC } from "react";

import { Page } from "@/components/Page.tsx";
import { useNavigate } from "react-router-dom";

export const IndustryPage: FC = () => {
    const navigate = useNavigate();

    const AREAS_OF_INTEREST = [
        {
            id: "finance",
            label: "Finance",
        },
        {
            id: "maritime",
            label: "Maritime",
        },
        {
            id: "transport",
            label: "Transport",
        },
        {
            id: "medical",
            label: "Medical",
        },
        {
            id: "technology",
            label: "Technology",
        },
        {
            id: "education",
            label: "Education",
        },
        {
            id: "environment",
            label: "Environment",
        },
        {
            id: "real_estate",
            label: "Real Estate",
        },
        {
            id: "manufacturing",
            label: "Manufacturing",
        },
        {
            id: "retail",
            label: "Retail",
        },
    ];

    // const categories = [...new Set(AREAS_OF_INTEREST.map((option) => option.category))];

    return (
        <Page back={true}>
            <List
                style={{
                    padding: "16px",
                    margin: "0 16px", // Adds horizontal margin
                }}
            >
                <Steps count={6} progress={2} />

                <LargeTitle weight="3">
                    What industries are you interested in?
                </LargeTitle>

                <div
                    style={{
                        display: "flex",
                        gap: 16,
                        flexWrap: "wrap",
                    }}
                >
                    {AREAS_OF_INTEREST.map((topic) => (
                        <Chip
                            key={topic.id}
                            mode="mono"
                            Component="label"
                            before={
                                <div
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        display: "grid",
                                        placeItems: "center",
                                    }}
                                >
                                    <Multiselectable
                                        name={topic.label}
                                        id={topic.label}
                                    />
                                </div>
                            }
                        >
                            {topic.label}
                        </Chip>
                    ))}
                </div>
                <div style={{ height: 72 }} />

                <FixedLayout
                    style={{
                        padding: 16,
                    }}
                >
                    <Button
                        size="m"
                        stretched
                        onClick={() => {
                            navigate("/topics");
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                            });
                        }}
                    >
                        Next
                    </Button>
                </FixedLayout>
            </List>
        </Page>
    );
};
