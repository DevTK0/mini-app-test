import {
    Cell,
    List,
    Steps,
    FixedLayout,
    Button,
    LargeTitle,
    Switch,
    Headline,
} from "@telegram-apps/telegram-ui";
import { type FC } from "react";

import { Page } from "@/components/Page.tsx";

export const SettingsPage: FC = () => {
    return (
        <Page back={true}>
            <List
                style={{
                    padding: "16px",
                    margin: "0 16px", // Adds horizontal margin
                }}
            >
                <Steps count={3} progress={3} />
                <LargeTitle weight="3">Settings</LargeTitle>
                <Headline
                    weight="3"
                    style={{
                        marginBottom: 16,
                    }}
                >
                    Notifications
                </Headline>
                <Cell
                    Component="label"
                    after={<Switch defaultChecked />}
                    description="Get notified of AI news daily."
                    multiline
                >
                    Daily
                </Cell>
                <FixedLayout
                    style={{
                        padding: 16,
                    }}
                >
                    <Button size="m" stretched>
                        Submit
                    </Button>
                </FixedLayout>
            </List>
        </Page>
    );
};
