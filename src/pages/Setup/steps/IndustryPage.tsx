import {
    List,
    Steps,
    FixedLayout,
    Button,
    LargeTitle,
    Chip,
    Multiselectable,
} from "@telegram-apps/telegram-ui";
import { useState, type FC } from "react";

import { Page } from "@/components/Page.tsx";
import { useNavigate } from "react-router-dom";
import { INDUSTRY } from "@/helpers/defaults";
import { useStore } from "@tanstack/react-store";
import { store } from "@/helpers/stores";

export const IndustryPage: FC = () => {
    const navigate = useNavigate();

    const industries = useStore(store, (state) => state.industries);
    const [selectedIndustries, setSelectedIndustries] = useState<Set<string>>(
        industries ?? new Set<string>()
    );

    const updateIndustries = (event: React.ChangeEvent<HTMLInputElement>) => {
        const label = event.target.name;

        setSelectedIndustries((prev) => {
            const newSet = new Set(prev);
            newSet.has(label) ? newSet.delete(label) : newSet.add(label);

            // Update store
            store.setState((state) => ({
                ...state,
                industries: newSet,
            }));

            return newSet;
        });
    };

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
                    {INDUSTRY.map((topic) => (
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
                                        checked={selectedIndustries.has(
                                            topic.label
                                        )}
                                        onChange={updateIndustries}
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
