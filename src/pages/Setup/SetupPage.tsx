import {
    List,
    Steps,
    FixedLayout,
    Button,
    LargeTitle,
} from "@telegram-apps/telegram-ui";
import { type FC } from "react";

import { Page } from "@/components/Page.tsx";
import { useNavigate } from "react-router-dom";

export const SetupPage: FC = () => {
    const navigate = useNavigate();

    return (
        <Page back={true}>
            <List
                style={{
                    padding: "16px",
                    margin: "0 16px",
                }}
            >
                <Steps count={6} progress={1} />

                <LargeTitle weight="3">Welcome ???</LargeTitle>

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
                            navigate("/field");
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                            });
                        }}
                    >
                        Start
                    </Button>
                </FixedLayout>
            </List>
        </Page>
    );
};
