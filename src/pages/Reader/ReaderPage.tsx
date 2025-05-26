import { paths } from "@/api/schema";
import { Page } from "@/components/Page";
import {
    isMiniAppDark,
    useLaunchParams,
    useSignal,
} from "@telegram-apps/sdk-react";
import {
    Section,
    List,
    FixedLayout,
    Button,
    Progress,
    Spinner,
} from "@telegram-apps/telegram-ui";
import createClient from "openapi-fetch";
import { useEffect, useState, type FC } from "react";
import {
    FaAngleLeft,
    FaAngleRight,
    FaThumbsDown,
    FaThumbsUp,
} from "react-icons/fa";

// interface PageData {
//     url: string;
//     vote: "up" | "down" | null;
// }

type GetResponse =
    paths["/fetch_rec"]["get"]["responses"]["200"]["content"]["application/json"];
type PageData = NonNullable<GetResponse>;
const url = "https://c534-137-132-26-145.ngrok-free.app";

export const ReaderPage: FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const {
        tgWebAppThemeParams: theme,
        tgWebAppData: app,
        tgWebAppStartParam: startParam,
    } = useLaunchParams();
    const isDark = useSignal(isMiniAppDark);
    const [date, time_period] = startParam?.split("_") || [];
    const [pages, setPages] = useState<PageData>([]);

    const client = createClient<paths>({
        headers: {
            "ngrok-skip-browser-warning": "true",
        },
        baseUrl: url,
    });

    useEffect(() => {
        const fetchRec = async () => {
            const telegramId = app?.user?.id;

            if (!telegramId) {
                console.error("No Telegram ID found in launch params");
                return;
            }

            try {
                const { data, error } = await client.GET("/fetch_rec", {
                    params: {
                        query: {
                            telegram_id: telegramId,
                            date: date,
                            time_period:
                                time_period == "am" || time_period == "pm"
                                    ? time_period
                                    : null,
                        },
                    },
                });

                console.log(data);
                if (data) {
                    setPages(data);
                } else if (error) {
                    console.error("Error fetching user data:", error);
                }
            } catch (err) {
                console.error("Error in API call:", err);
            }
        };

        fetchRec();
    }, []);

    const handleVote = (voteType: "up" | "down") => {
        setPages((currentPages) => {
            return currentPages.map((page, index) => {
                if (index === currentIndex) {
                    console.log(voteType);
                    // Toggle vote if clicking the same button again
                    // const newVote = page.vote === voteType ? null : voteType;
                    // return { ...page, vote: newVote };
                }
                return page;
            });
        });
    };

    const copyToClipboard = async () => {
        if (pages[currentIndex])
            await navigator.clipboard.writeText(pages[currentIndex]?.url);
    };

    const goToPrevious = () => {
        setIsLoading(true);
        setCurrentIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
    };

    const goToNext = () => {
        setIsLoading(true);
        setCurrentIndex((prevIndex) =>
            prevIndex < pages.length - 1 ? prevIndex + 1 : prevIndex
        );
    };

    const progressValue = ((currentIndex + 1) / pages.length) * 100;
    // const currentVote = pages[currentIndex].vote;
    const currentVote = null;

    return (
        <Page back={true}>
            <List>
                <Section>
                    <div
                        style={{
                            width: "100%",
                            height: "calc(100vh - 130px)", // Adjust height to leave space for voting section
                        }}
                    >
                        {isLoading && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    // background: "rgba(255, 255, 255, 0.8)", // Semi-transparent background
                                    zIndex: 1,
                                    // borderRadius: "8px",
                                }}
                            >
                                <Spinner size="l" />
                            </div>
                        )}
                        {pages[currentIndex] && (
                            <iframe
                                // src={pages[currentIndex].url}
                                src={`${url}/proxy?url=${encodeURIComponent(
                                    pages[currentIndex].url
                                )}`}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    border: "none",
                                }}
                                title="Content"
                                allowFullScreen
                                onLoad={() => setIsLoading(false)}
                            />
                        )}
                    </div>

                    <FixedLayout
                        style={{
                            padding: 16,
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: theme.bg_color,
                                padding: 5,
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                mode={false ? "gray" : "bezeled"}
                                style={{
                                    height: "24px",
                                    padding: "0 8px",
                                    minWidth: "auto",
                                }}
                            >
                                +100
                            </Button>
                            <Button
                                mode="plain"
                                style={{
                                    color: isDark ? "white" : "black",
                                    width: "100%",
                                    height: "24px",
                                    padding: "0 10px",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                }}
                                onClick={copyToClipboard}
                            >
                                {pages[currentIndex]
                                    ? pages[currentIndex].url
                                    : "http://example.com"}
                            </Button>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                // width: "100%",
                                padding: 5,
                            }}
                        >
                            <Progress
                                value={progressValue}
                                style={{
                                    flex: 1,
                                }}
                            />
                            <br />
                        </div>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                                gap: "12px",
                            }}
                        >
                            <Button
                                mode="plain"
                                size="s"
                                onClick={goToPrevious}
                                disabled={currentIndex === 0}
                                style={{
                                    flex: 0.5,
                                }}
                            >
                                <FaAngleLeft />
                            </Button>
                            <Button
                                size="s"
                                mode={
                                    currentVote === "up" ? "bezeled" : "plain"
                                }
                                onClick={() => handleVote("up")}
                                style={{
                                    flex: 1,
                                }}
                            >
                                <FaThumbsUp />
                            </Button>
                            <Button
                                size="s"
                                mode={
                                    currentVote === "down" ? "bezeled" : "plain"
                                }
                                onClick={() => handleVote("down")}
                                style={{
                                    flex: 1,
                                }}
                            >
                                <FaThumbsDown />
                            </Button>
                            <Button
                                mode="plain"
                                size="s"
                                onClick={goToNext}
                                disabled={
                                    currentIndex === pages.length - 1 ||
                                    isLoading
                                }
                                style={{
                                    flex: 0.5,
                                }}
                            >
                                <FaAngleRight />
                            </Button>
                        </div>
                    </FixedLayout>
                </Section>
            </List>
        </Page>
    );
};
