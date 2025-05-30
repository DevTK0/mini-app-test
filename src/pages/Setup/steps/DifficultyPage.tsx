import {
    List,
    Steps,
    FixedLayout,
    Button,
    LargeTitle,
    Select,
} from "@telegram-apps/telegram-ui";
import { type FC } from "react";

import { Page } from "@/components/Page.tsx";
import { useNavigate } from "react-router-dom";

export const DifficultyPage: FC = () => {
    const navigate = useNavigate();

    return (
        <Page back={true}>
            <List
                style={{
                    padding: "16px",
                    margin: "0 16px", // Adds horizontal margin
                }}
            >
                <Steps count={7} progress={6} />

                <LargeTitle weight="3">
                    What level of news are you comfortable with?
                </LargeTitle>

                <div
                    style={{
                        display: "flex",
                        gap: 16,
                        flexWrap: "wrap",
                    }}
                ></div>
                <Select header="Select">
                    <option value="easy">Light and easy </option>
                    <option value="medium">Moderate with some depth </option>
                    <option value="hard">In-depth and complex </option>
                </Select>
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
                            navigate("/settings");
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
