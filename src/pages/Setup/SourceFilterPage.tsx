import {
    List,
    Steps,
    FixedLayout,
    Button,
    LargeTitle,
    Multiselectable,
    Chip,
    Headline,
} from "@telegram-apps/telegram-ui";
import { useState, type FC } from "react";

import { Page } from "@/components/Page.tsx";
import { useNavigate } from "react-router-dom";
import { useStore } from "@tanstack/react-store";
import { store } from "@/helpers/stores";
import { SOURCE_OPTIONS } from "@/helpers/defaults";

export const SourceFilterPage: FC = () => {
    const navigate = useNavigate();

    const sources = useStore(store, (state) => state.sources);
    const [selectedSources, setSelectedSources] =
        useState<Set<string>>(sources);

    const updateSources = (event: React.ChangeEvent<HTMLInputElement>) => {
        const label = event.target.name;

        setSelectedSources((prev) => {
            const newSet = new Set(prev);
            newSet.has(label) ? newSet.delete(label) : newSet.add(label);

            // Update store
            store.setState((state) => ({
                ...state,
                sources: newSet,
            }));

            return newSet;
        });
    };

    const categories = [
        ...new Set(SOURCE_OPTIONS.map((option) => option.category)),
    ];

    return (
        <Page back={true}>
            <List
                style={{
                    padding: "16px",
                    margin: "0 16px", // Adds horizontal margin
                }}
            >
                <Steps count={6} progress={4} />
                <LargeTitle weight="3">
                    Which sources would you like to receive news from?
                </LargeTitle>
                <div
                    style={{
                        display: "flex",
                        gap: 16,
                        flexWrap: "wrap",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
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
                                    {SOURCE_OPTIONS.filter(
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
                                                        checked={selectedSources.has(
                                                            topic.label
                                                        )}
                                                        onChange={updateSources}
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
                            navigate("/difficulty");
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
