import {
    Cell,
    List,
    Steps,
    FixedLayout,
    Button,
    LargeTitle,
    Switch,
    Select,
} from "@telegram-apps/telegram-ui";
import { ChangeEvent, useState, type FC } from "react";

import { closeMiniApp, useLaunchParams } from "@telegram-apps/sdk-react";

import { Page } from "@/components/Page.tsx";
import { useStore } from "@tanstack/react-store";
import {
    setNotifications,
    setRecommender,
    setup_store,
} from "@/helpers/stores";
import { client } from "@/helpers/api";

// type GetUserResponse =
//     paths["/getuser"]["get"]["responses"]["200"]["content"]["application/json"];
// type UserData = NonNullable<GetUserResponse>;

export const SettingsPage: FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [notifications, setNotifications] = useState(true);
    const launchParams = useLaunchParams();
    const telegramId = launchParams?.tgWebAppData?.user?.id;

    // Get store values
    const field = useStore(setup_store, (state) => state.field);
    const topics = useStore(setup_store, (state) => state.topics);
    const industries = useStore(setup_store, (state) => state.industries);
    const sources = useStore(setup_store, (state) => state.sources);
    const notifications = useStore(setup_store, (state) => state.notifications);
    const recommender = useStore(setup_store, (state) => state.recommender);

    const handleNotificationChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNotifications(event.target.checked);
    };

    const handleRecommenderChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const version = event.target.value == "v2" ? "v2" : "v1";
        setRecommender(version);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            const settings = {
                ...(field !== null && { field }),
                industries: Array.from(industries ?? new Set()),
                sources: Array.from(sources ?? new Set()),
                topics: Array.from(topics ?? new Set()),
            };

            console.log("sending: ", settings, notifications);
            if (!telegramId) {
                console.error("Missing telegram id.");
                return;
            }

            const { error } = await client.POST("/setup", {
                body: {
                    telegram_id: telegramId,
                    settings: settings,
                    notification: notifications,
                    recommender: recommender,
                },
            });

            if (error) {
                console.error("Error saving settings:", error);
                return;
            }
        } catch (err) {
            console.error("Error in submit:", err);
        } finally {
            setIsSubmitting(false);
            closeMiniApp();
        }
    };

    return (
        <Page back={true}>
            <List
                style={{
                    padding: "16px",
                    margin: "0 16px", // Adds horizontal margin
                }}
            >
                <Steps count={7} progress={7} />
                <LargeTitle weight="3">
                    How would you like to configure AI News?
                </LargeTitle>

                <Cell
                    Component="label"
                    after={
                        <Switch
                            checked={notifications}
                            onChange={handleNotificationChange}
                        />
                    }
                    description="Get notified of AI news twice daily."
                    multiline
                >
                    Notifications
                </Cell>
                <Cell
                    after={
                        <Select onChange={handleRecommenderChange}>
                            <option>v1</option>
                            <option disabled>v2</option>
                        </Select>
                    }
                    Component="label"
                    multiline
                    description="Recommendation engine for AI news."
                >
                    Recommender
                </Cell>

                <FixedLayout
                    style={{
                        padding: 16,
                    }}
                >
                    <Button
                        size="m"
                        stretched
                        loading={isSubmitting}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </FixedLayout>
            </List>
        </Page>
    );
};
