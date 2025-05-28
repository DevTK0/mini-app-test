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
import { useEffect, useState, type FC } from "react";

import { closeMiniApp, useLaunchParams } from "@telegram-apps/sdk-react";

import { Page } from "@/components/Page.tsx";
import createClient from "openapi-fetch";
import { paths } from "@/api/schema";
import { useStore } from "@tanstack/react-store";
import { form_store } from "@/helpers/stores";

type GetUserResponse =
    paths["/getuser"]["get"]["responses"]["200"]["content"]["application/json"];
type UserData = NonNullable<GetUserResponse>;

export const SettingsPage: FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [dailyNotifications, setDailyNotifications] = useState(true);

    // Get store values
    const topics = useStore(form_store, (state) => state.topics);
    const industries = useStore(form_store, (state) => state.industries);
    const sources = useStore(form_store, (state) => state.sources);

    const client = createClient<paths>({
        headers: {
            "ngrok-skip-browser-warning": "true",
        },
        baseUrl: "http://127.0.0.1:8000",
    });

    useEffect(() => {
        const fetchUser = async () => {
            const launchParams = useLaunchParams();
            const telegramId = launchParams?.tgWebAppData?.user?.id;

            if (!telegramId) {
                console.error("No Telegram ID found in launch params");
                return;
            }

            try {
                const { data, error } = await client.GET("/getuser", {
                    params: {
                        query: {
                            telegram_id: telegramId,
                        },
                    },
                });

                if (data) {
                    setUserData(data);
                } else if (error) {
                    console.error("Error fetching user data:", error);
                }
            } catch (err) {
                console.error("Error in API call:", err);
            }
        };

        fetchUser();
    }, []);

    const handleSubmit = async () => {
        if (!userData?.id) {
            console.error("No user ID available");
            return;
        }

        setIsSubmitting(true);

        try {
            const settings = {
                industries: Array.from(industries ?? new Set()),
                sources: Array.from(sources ?? new Set()),
                topics: Array.from(topics ?? new Set()),
            };

            const { error } = await client.POST("/setup", {
                body: {
                    user_id: userData.id,
                    settings: settings,
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
