import { Page } from "@/components/Page";
import {
    Section,
    List,
    FixedLayout,
    Button,
    Progress,
    Spinner,
} from "@telegram-apps/telegram-ui";
import { useState, type FC } from "react";
import {
    FaAngleLeft,
    FaAngleRight,
    FaThumbsDown,
    FaThumbsUp,
} from "react-icons/fa";

interface PageData {
    url: string;
    vote: "up" | "down" | null;
}

export const ReaderPage: FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const [pages, setPages] = useState<PageData[]>([
        {
            url: "https://www.artificialintelligence-news.com/news/will-the-ai-boom-fuel-a-global-energy-crisis/",
            vote: null,
        },
        {
            url: "https://openai.com/index/introducing-codex/",
            vote: null,
        },
        {
            url: "https://venturebeat.com/ai/microsoft-just-launched-an-ai-that-discovered-a-new-chemical-in-200-hours-instead-of-years/",
            vote: null,
        },
        {
            url: "https://www.wired.com/story/how-to-watch-google-io-2025/",
            vote: null,
        },
        {
            url: "https://www.anthropic.com/news/tracing-thoughts-language-model",
            vote: null,
        },
        {
            url: "https://www.anthropic.com/news/claude-3-7-sonnet",
            vote: null,
        },
    ]);

    const handleVote = (voteType: "up" | "down") => {
        setPages((currentPages) => {
            return currentPages.map((page, index) => {
                if (index === currentIndex) {
                    // Toggle vote if clicking the same button again
                    const newVote = page.vote === voteType ? null : voteType;
                    return { ...page, vote: newVote };
                }
                return page;
            });
        });
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
    const currentVote = pages[currentIndex].vote;

    return (
        <Page back={true}>
            <List>
                <Section>
                    <div
                        style={{
                            width: "100%",
                            height: "calc(100vh - 80px)", // Adjust height to leave space for voting section
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
                        <iframe
                            src={pages[currentIndex].url}
                            style={{
                                width: "100%",
                                height: "100%",
                                border: "none",
                                // borderRadius: "8px",
                            }}
                            title="Content"
                            allowFullScreen
                            onLoad={() => setIsLoading(false)}
                        />
                    </div>

                    <FixedLayout
                        style={{
                            padding: 16,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                                gap: "12px",
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
                                mode="bezeled"
                                size="m"
                                onClick={goToPrevious}
                                disabled={currentIndex === 0}
                                style={{
                                    flex: 0.5,
                                }}
                            >
                                <FaAngleLeft />
                            </Button>
                            <Button
                                size="m"
                                mode={
                                    currentVote === "up" ? "outline" : "bezeled"
                                }
                                onClick={() => handleVote("up")}
                                style={{
                                    flex: 1,
                                }}
                            >
                                <FaThumbsUp />
                            </Button>
                            <Button
                                size="m"
                                mode={
                                    currentVote === "down"
                                        ? "outline"
                                        : "bezeled"
                                }
                                onClick={() => handleVote("down")}
                                style={{
                                    flex: 1,
                                }}
                            >
                                <FaThumbsDown />
                            </Button>
                            <Button
                                mode="bezeled"
                                size="m"
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
