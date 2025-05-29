import { Page } from "@/components/Page";
import {
    isMiniAppDark,
    // on,
    useLaunchParams,
    useSignal,
} from "@telegram-apps/sdk-react";
import {
    Section,
    List,
    FixedLayout,
    Button,
    // Spinner,
    // Tooltip,
} from "@telegram-apps/telegram-ui";
import { useEffect, useRef, useState, type FC } from "react";
import {
    FaAngleLeft,
    FaAngleRight,
    FaThumbsDown,
    FaThumbsUp,
} from "react-icons/fa";
// import { useLocation, useNavigate } from "react-router-dom";
import { page_store, PageData } from "@/helpers/stores";
import { useStore } from "@tanstack/react-store";
import { client, url } from "@/helpers/api";

// type GetResponse =
//     paths["/fetch_rec"]["get"]["responses"]["200"]["content"]["application/json"];
// type PageData = NonNullable<GetResponse>;

export const DirectPage: FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    // const [isLoading, setIsLoading] = useState(true);
    const {
        tgWebAppThemeParams: theme,
        tgWebAppData: app,
        tgWebAppStartParam: startParam,
    } = useLaunchParams();
    const isDark = useSignal(isMiniAppDark);
    const [date, time_period] = startParam?.split("_") || [];
    // const [pages, setPages] = useState<PageData[]>([]);
    const pages = useStore(page_store, (state) => state.pages);

    const ref = useRef(null);
    // const [shown, setShown] = useState(false);

    useEffect(() => {
        fetchRec(0);
    }, [app?.user?.id, date, time_period]);

    const copyToClipboard = async () => {
        if (pages[currentIndex])
            await navigator.clipboard.writeText(pages[currentIndex]?.url);
    };

    const goToPrevious = () => {
        // setIsLoading(true);
        setCurrentIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
    };

    const fetchRec = async (index: number) => {
        const telegramId = app?.user?.id;

        if (!telegramId) {
            console.error("No Telegram ID found in launch params");
            return;
        }

        if (time_period != "am" && time_period != "pm") {
            console.error("Invalid time_period.");
            return;
        }

        try {
            const { data: content, error: fetch_error } = await client.GET(
                "/direct",
                {
                    params: {
                        query: {
                            content_id: index,
                        },
                    },
                }
            );

            console.log("fetch: ", content, date, time_period);

            if (content) {
                const rec: PageData[] = content.map((rec) => ({
                    id: rec.id!,
                    url: rec.url,
                    vote: null, // Initialize votes as null
                }));
                page_store.setState((state) => {
                    const existingIds = new Set(state.pages.map((p) => p.id));
                    const newRecs = rec.filter((r) => !existingIds.has(r.id));
                    return {
                        pages: [...state.pages, ...newRecs],
                    };
                });

                console.log(rec);
                console.log(
                    "content_ids: ",
                    content
                        .map((rec) => rec.id)
                        .filter((id) => id !== undefined) as number[]
                );

                const content_ids = content
                    .map((rec) => rec.id)
                    .filter((id) => id !== undefined) as number[];
                console.log("inputs: ", telegramId, content_ids);
            } else if (fetch_error) {
                console.error("Error fetching user data:", fetch_error);
            }
        } catch (err) {
            console.error("Error in API call:", err);
        }
    };

    const goToNext = () => {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        if (nextIndex % 4 === 0) {
            // Fetch slightly earlier than needed
            fetchRec(nextIndex + 1);
        }
    };

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
                        {/* {isLoading && (
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
                                    zIndex: 1,
                                }}
                            >
                                <Spinner size="l" />
                            </div>
                        )} */}
                        {pages[currentIndex] && (
                            <iframe
                                // src={pages[currentIndex].url}
                                src={`${url}/proxy?url=${encodeURIComponent(
                                    pages[currentIndex].url
                                )}`}
                                // key={url}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    border: "none",
                                }}
                                title="Content"
                                allowFullScreen
                                // onLoad={() => setIsLoading(false)}
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
                                mode="gray"
                                style={{
                                    height: "24px",
                                    padding: "0 8px",
                                    minWidth: "auto",
                                }}
                                disabled
                            >
                                +5
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
                                    : "loading..."}
                            </Button>
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
                                ref={ref}
                                mode="plain"
                                size="s"
                                onClick={goToPrevious}
                                // onClick={() => setShown(!shown)}
                                disabled={currentIndex === 0}
                                style={{
                                    flex: 0.5,
                                }}
                            >
                                <FaAngleLeft />
                            </Button>

                            <Button
                                size="s"
                                mode="plain"
                                disabled
                                style={{
                                    flex: 1,
                                }}
                            >
                                <FaThumbsUp />
                            </Button>
                            <Button
                                size="s"
                                mode="plain"
                                disabled
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
                                // disabled={isLoading}
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
