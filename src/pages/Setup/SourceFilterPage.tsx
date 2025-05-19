import {
    List,
    Steps,
    FixedLayout,
    Button,
    LargeTitle,
    Multiselectable,
    Chip,
    Headline,
} from "@telegram-apps/telegram-ui";
import { type FC } from "react";

import { Page } from "@/components/Page.tsx";
import { useNavigate } from "react-router-dom";

export const SourceFilterPage: FC = () => {
    const navigate = useNavigate();

    const CONTENT_SOURCE_OPTIONS = [
        // Company Blogs
        { id: "openai", label: "OpenAI Blog", category: "Company Blogs" },
        {
            id: "deepmind",
            label: "Google DeepMind",
            category: "Company Blogs",
        },
        { id: "anthropic", label: "Anthropic", category: "Company Blogs" },
        { id: "meta_ai", label: "Meta AI", category: "Company Blogs" },
        { id: "nvidia_ai", label: "NVIDIA AI", category: "Company Blogs" },
        {
            id: "aws_ml",
            label: "AWS Machine Learning",
            category: "Company Blogs",
        },
        {
            id: "microsoft_research",
            label: "Microsoft Research",
            category: "Company Blogs",
        },

        // Research Blogs
        {
            id: "bair",
            label: "Berkeley AI Research (BAIR)",
            category: "Research Blogs",
        },
        { id: "mit_ai", label: "MIT AI News", category: "Research Blogs" },

        // Papers
        { id: "vitalab", label: "VITALab", category: "Papers" },
        {
            id: "papers_with_code",
            label: "Papers With Code",
            category: "Papers",
        },
        { id: "arxiv", label: "arXiv", category: "Papers" },

        // Opinion & News
        {
            id: "techcrunch_ai",
            label: "TechCrunch AI",
            category: "Opinion & News",
        },
        {
            id: "venturebeat_ai",
            label: "VentureBeat AI",
            category: "Opinion & News",
        },
        {
            id: "marktechpost",
            label: "Marktechpost",
            category: "Opinion & News",
        },

        // AI Singapore
        {
            id: "aisg_governance",
            label: "AI Singapore Governance Updates",
            category: "AI Singapore",
        },
        {
            id: "aisg_roundtable",
            label: "AI Singapore Roundtable",
            category: "AI Singapore",
        },
    ];

    const categories = [
        ...new Set(CONTENT_SOURCE_OPTIONS.map((option) => option.category)),
    ];

    return (
        <Page back={true}>
            <List
                style={{
                    padding: "16px",
                    margin: "0 16px", // Adds horizontal margin
                }}
            >
                <Steps count={3} progress={2} />
                <LargeTitle weight="3">Select Sources</LargeTitle>
                <div
                    style={{
                        display: "flex",
                        gap: 16,
                        flexWrap: "wrap",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
                        }}
                    >
                        {categories.map((category) => (
                            <div key={category}>
                                <Headline
                                    weight="3"
                                    style={{
                                        marginBottom: 16,
                                    }}
                                >
                                    {category}
                                </Headline>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: 16,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {CONTENT_SOURCE_OPTIONS.filter(
                                        (topic) => topic.category === category
                                    ).map((topic) => (
                                        <Chip
                                            key={topic.id}
                                            mode="mono"
                                            Component="label"
                                            before={
                                                <div
                                                    style={{
                                                        width: "20px",
                                                        height: "20px",
                                                        display: "grid",
                                                        placeItems: "center",
                                                    }}
                                                >
                                                    <Multiselectable
                                                        name={topic.label}
                                                        id={topic.label}
                                                    />
                                                </div>
                                            }
                                        >
                                            {topic.label}
                                        </Chip>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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
                            navigate("/settings");
                        }}
                    >
                        Next
                    </Button>
                </FixedLayout>
            </List>
        </Page>
    );
};
