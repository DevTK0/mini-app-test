import {
    List,
    Steps,
    FixedLayout,
    Button,
    LargeTitle,
    Text,
} from "@telegram-apps/telegram-ui";
import { useEffect, type FC } from "react";

import { Page } from "@/components/Page.tsx";
import { useNavigate } from "react-router-dom";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { client } from "@/helpers/api";
import {
    setField,
    setIndustries,
    setNotifications,
    setRecommender,
    setSources,
    setTopics,
} from "@/helpers/stores";

export const SetupPage: FC = () => {
    const navigate = useNavigate();
    const { tgWebAppData: app } = useLaunchParams();

    useEffect(() => {
        const initSettings = async () => {
            if (!app?.user?.id) {
                console.error("Missing telegram id.");
                return;
            }

            const { data: init, error } = await client.GET("/setup", {
                params: {
                    query: {
                        telegram_id: app.user.id,
                    },
                },
            });

            if (init) {
                const topics = Array.isArray(init.settings["topics"])
                    ? init.settings["topics"]
                    : [];
                setTopics(topics);

                const sources = Array.isArray(init.settings["sources"])
                    ? init.settings["sources"]
                    : [];
                setSources(sources);

                const industries = Array.isArray(init.settings["industries"])
                    ? init.settings["industries"]
                    : [];
                setIndustries(industries);

                const field =
                    typeof init.settings["field"] === "string"
                        ? init.settings["field"]
                        : "";
                setField(field);

                setRecommender(init.strategy);
                setNotifications(init.push_notifications);
            }
            if (error) {
                console.error("Failed to init setup: ", error);
            }

            console.log(init);
        };
        initSettings();
    }, []);

    return (
        <Page back={true}>
            <List
                style={{
                    padding: "16px",
                    margin: "0 16px",
                }}
            >
                <Steps count={7} progress={1} />
                <LargeTitle weight="3">
                    Welcome {app?.user?.first_name}
                </LargeTitle>
                <Text>
                    AI News Bot is a recommendation service that delivers news
                    to you twice daily.
                    <br />
                    <br />
                    Each day, 5 recommendations will be sent to you in the
                    morning and evening. Vote on the articles to earn points and
                    get featured on the leaderboard!
                </Text>

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
