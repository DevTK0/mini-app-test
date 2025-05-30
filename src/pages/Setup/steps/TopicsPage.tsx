import {
    List,
    Steps,
    FixedLayout,
    Button,
    LargeTitle,
    Chip,
    Multiselectable,
    Headline,
    Caption,
} from "@telegram-apps/telegram-ui";
import { useState, type FC } from "react";

import { Page } from "@/components/Page.tsx";
import { useNavigate } from "react-router-dom";
import { useStore } from "@tanstack/react-store";
import { setTopics, setup_store } from "@/helpers/stores";
import { TOPIC_OPTIONS } from "@/helpers/defaults";

export const TopicsPage: FC = () => {
    const navigate = useNavigate();

    const topics = useStore(setup_store, (state) => state.topics);
    const [selectedTopics, setSelectedTopics] = useState<Set<string>>(topics);

    const updateTopics = (event: React.ChangeEvent<HTMLInputElement>) => {
        const topicLabel = event.target.name;

        setSelectedTopics((prev) => {
            const newSet = new Set(prev);
            newSet.has(topicLabel)
                ? newSet.delete(topicLabel)
                : newSet.add(topicLabel);

            setTopics(Array.from(newSet));

            return newSet;
        });
    };

    const categories = [
        ...new Set(TOPIC_OPTIONS.map((option) => option.category)),
    ];

    return (
        <Page back={true}>
            <List
                style={{
                    padding: "16px",
                    margin: "0 16px", // Adds horizontal margin
                }}
            >
                <Steps count={7} progress={4} />

                <LargeTitle weight="3">
                    What topics are you interested in?
                </LargeTitle>
                <Caption level="1" weight="3">
                    Pick at least 2.
                </Caption>

                <div
                    style={{
                        display: "flex",
                        gap: 16,
                        flexWrap: "wrap",
                    }}
                >
                    {categories.map((category) => (
                        <div key={category}>
                            <Headline
                                weight="3"
                                style={{
                                    marginBottom: 16,
                                }}
                            >
                                {category}
                            </Headline>

                            <div
                                style={{
                                    display: "flex",
                                    gap: 16,
                                    flexWrap: "wrap",
                                }}
                            >
                                {TOPIC_OPTIONS.filter(
                                    (topic) => topic.category === category
                                ).map((topic) => (
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
                                                    checked={selectedTopics.has(
                                                        topic.label
                                                    )}
                                                    onChange={updateTopics}
                                                />
                                            </div>
                                        }
                                    >
                                        {topic.label}
                                    </Chip>
                                ))}
                            </div>
                        </div>
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
                            navigate("/filters");
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                            });
                        }}
                        disabled={topics.size < 2}
                    >
                        Next
                    </Button>
                </FixedLayout>
            </List>
        </Page>
    );
};
