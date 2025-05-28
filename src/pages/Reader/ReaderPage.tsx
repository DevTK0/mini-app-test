import { paths } from "@/api/schema";
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
    Progress,
    Spinner,
    // Tooltip,
} from "@telegram-apps/telegram-ui";
import createClient from "openapi-fetch";
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

// type GetResponse =
//     paths["/fetch_rec"]["get"]["responses"]["200"]["content"]["application/json"];
// type PageData = NonNullable<GetResponse>;
const url =
    "https://sherpa-telegram-api-service.delightfulground-7cb093f7.southeastasia.azurecontainerapps.io";

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
    // const [pages, setPages] = useState<PageData[]>([]);
    const pages = useStore(page_store, (state) => state.pages);

    const ref = useRef(null);
    // const [shown, setShown] = useState(false);

    const client = createClient<paths>({
        baseUrl: url,
    });

    useEffect(() => {
        const fetchRec = async () => {
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
                const { data: recommendations, error: fetch_error } =
                    await client.GET("/fetch_rec", {
                        params: {
                            query: {
                                telegram_id: telegramId,
                                date: date,
                                time_period: time_period,
                            },
                        },
                    });

                console.log("fetch: ", recommendations, date, time_period);

                if (recommendations) {
                    const rec: PageData[] = recommendations.map((rec) => ({
                        id: rec.id!,
                        url: rec.url,
                        vote: null, // Initialize votes as null
                    }));
                    page_store.setState(() => ({
                        pages: rec,
                    }));

                    console.log(rec);
                    console.log(
                        "content_ids: ",
                        recommendations
                            .map((rec) => rec.id)
                            .filter((id) => id !== undefined) as number[]
                    );

                    const content_ids = recommendations
                        .map((rec) => rec.id)
                        .filter((id) => id !== undefined) as number[];
                    console.log("inputs: ", telegramId, content_ids);

                    // Fetch votes
                    const { data: votes, error: vote_error } =
                        await client.POST("/votes", {
                            body: {
                                content_ids: content_ids,
                                telegram_id: telegramId,
                            },
                        });

                    if (vote_error) {
                        console.error("Error fetching votes: ", vote_error);
                    }

                    if (votes) {
                        // Update the votes in the prepared data
                        const updatedPages: PageData[] = rec.map((page) => {
                            // Find matching vote for this page
                            const vote = votes.find(
                                (v) => v.content_id === page.id
                            );
                            // If vote exists, return page with updated vote, otherwise return unchanged page
                            return vote
                                ? {
                                      ...page,
                                      vote:
                                          vote.details === "up" ? "up" : "down",
                                  }
                                : page;
                        });

                        page_store.setState(() => ({
                            pages: updatedPages,
                        }));
                    }

                    console.log("votes: ", votes);
                } else if (fetch_error) {
                    console.error("Error fetching user data:", fetch_error);
                }
            } catch (err) {
                console.error("Error in API call:", err);
            }
        };

        fetchRec();
    }, [app?.user?.id, date, time_period]);

    const handleVote = async (voteType: "up" | "down") => {
        const currentPage = pages[currentIndex];
        if (!currentPage) return;

        page_store.setState(() => ({
            pages: pages.map((page, index) =>
                index === currentIndex
                    ? {
                          ...page,
                          vote: page.vote === voteType ? null : voteType,
                      }
                    : page
            ),
        }));

        if (!app?.user?.id) return;

        const { error: vote_error } = await client.POST("/vote", {
            body: {
                content_id: currentPage.id,
                telegram_id: app?.user?.id,
                value: voteType,
            },
        });

        if (vote_error) {
            console.error("Error sending vote data:", vote_error);
        }
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
    const currentVote = pages[currentIndex]?.vote || null;

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
                                key={url}
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
                                mode={
                                    pages[currentIndex]?.vote
                                        ? "bezeled"
                                        : "gray"
                                }
                                style={{
                                    height: "24px",
                                    padding: "0 8px",
                                    minWidth: "auto",
                                }}
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
                            {/* {shown && (
                                <Tooltip
                                    placement="top-start"
                                    mode={isDark ? "light" : "dark"}
                                    targetRef={ref}
                                >
                                    Vote on the article to get points!
                                </Tooltip>
                            )} */}

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
