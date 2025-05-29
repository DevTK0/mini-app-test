import {
    List,
    Steps,
    FixedLayout,
    Button,
    LargeTitle,
    Chip,
    Multiselectable,
    Caption,
} from "@telegram-apps/telegram-ui";
import { useState, type FC } from "react";

import { Page } from "@/components/Page.tsx";
import { useNavigate } from "react-router-dom";
import { INDUSTRY_OPTIONS } from "@/helpers/defaults";
import { useStore } from "@tanstack/react-store";
import { setIndustries, setup_store } from "@/helpers/stores";

export const IndustryPage: FC = () => {
    const navigate = useNavigate();

    const industries = useStore(setup_store, (state) => state.industries);
    const [selectedIndustries, setSelectedIndustries] = useState<Set<string>>(
        industries ?? new Set<string>()
    );

    const updateIndustries = (event: React.ChangeEvent<HTMLInputElement>) => {
        const label = event.target.name;

        setSelectedIndustries((prev) => {
            const newSet = new Set(prev);
            newSet.has(label) ? newSet.delete(label) : newSet.add(label);

            setIndustries(Array.from(newSet));

            return newSet;
        });
    };

    return (
        <Page back={true}>
            <List
                style={{
                    padding: "16px",
                    margin: "0 16px", // Adds horizontal margin
                }}
            >
                <Steps count={7} progress={3} />

                <LargeTitle weight="3">
                    What industries are you interested in?
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
                    {INDUSTRY_OPTIONS.map((topic) => (
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
                        disabled={industries.size < 2}
                    >
                        Next
                    </Button>
                </FixedLayout>
            </List>
        </Page>
    );
};
