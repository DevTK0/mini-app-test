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
import { setField, setup_store } from "@/helpers/stores";
import { useStore } from "@tanstack/react-store";
import { FIELD } from "@/helpers/defaults";

export const FieldPage: FC = () => {
    const navigate = useNavigate();

    const field = useStore(setup_store, (state) => state.field);

    const updateField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.name;

        setField(value);
    };

    return (
        <Page back={true}>
            <List
                style={{
                    padding: "16px",
                    margin: "0 16px", // Adds horizontal margin
                }}
            >
                <Steps count={7} progress={2} />

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
                                    <Radio
                                        name={topic.id}
                                        id={topic.label}
                                        value={topic.id}
                                        checked={field === topic.id}
                                        onChange={updateField}
                                    />
                                </div>
                            }
                        >
                            {topic.label}
                        </Chip>
                    ))}
                </div>
                {field === "others" && <Input header="Please state which:" />}
                <div style={{ height: 72 }} />

                <FixedLayout
                    style={{
                        padding: 16,
                    }}
                >
                    <Button
                        size="m"
                        stretched
                        disabled={!field}
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
