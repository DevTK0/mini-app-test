import {
    List,
    Steps,
    FixedLayout,
    Button,
    LargeTitle,
    Chip,
    Radio,
    Input,
} from "@telegram-apps/telegram-ui";
import { type FC } from "react";

import { Page } from "@/components/Page.tsx";
import { useNavigate } from "react-router-dom";

export const FieldPage: FC = () => {
    const navigate = useNavigate();

    const FIELD = [
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
        {
            id: "other",
            label: "None of your fkin business",
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
                <Steps count={6} progress={1} />

                <LargeTitle weight="3">What field do you work in?</LargeTitle>

                <div
                    style={{
                        display: "flex",
                        gap: 16,
                        flexWrap: "wrap",
                    }}
                >
                    {FIELD.map((topic) => (
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
                                    <Radio name="field" id={topic.label} />
                                </div>
                            }
                        >
                            {topic.label}
                        </Chip>
                    ))}
                </div>
                <Input header="Other" />
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
                            navigate("/industry");
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
