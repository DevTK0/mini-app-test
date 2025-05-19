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

import { closeMiniApp } from "@telegram-apps/sdk-react";

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
                <Steps count={6} progress={6} />
                <LargeTitle weight="3">
                    How would you like to configure AI News?
                </LargeTitle>
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
                    <Button size="m" stretched onClick={() => closeMiniApp()}>
                        Submit
                    </Button>
                </FixedLayout>
            </List>
        </Page>
    );
};
