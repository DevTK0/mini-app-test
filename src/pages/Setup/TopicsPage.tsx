import {
    List,
    Steps,
    FixedLayout,
    Button,
    LargeTitle,
    Chip,
    Multiselectable,
    Headline,
} from "@telegram-apps/telegram-ui";
import { type FC } from "react";

import { Page } from "@/components/Page.tsx";
import { useNavigate } from "react-router-dom";

export const TopicsPage: FC = () => {
    const navigate = useNavigate();

    const AI_TOPICS = [
        // Core AI & ML
        { id: "ml", label: "Machine Learning", category: "Core AI & ML" },
        { id: "dl", label: "Deep Learning", category: "Core AI & ML" },
        { id: "rl", label: "Reinforcement Learning", category: "Core AI & ML" },
        {
            id: "transfer",
            label: "Transfer Learning",
            category: "Core AI & ML",
        },
        { id: "meta", label: "Meta Learning", category: "Core AI & ML" },
        {
            id: "optimization",
            label: "AI Optimization",
            category: "Core AI & ML",
        },

        // Language & Vision
        {
            id: "nlp",
            label: "Natural Language Processing",
            category: "Language & Vision",
        },
        { id: "cv", label: "Computer Vision", category: "Language & Vision" },
        {
            id: "llm",
            label: "Large Language Models",
            category: "Language & Vision",
        },
        {
            id: "speech",
            label: "Speech Recognition & Synthesis",
            category: "Language & Vision",
        },
        {
            id: "multimodal",
            label: "Multimodal AI",
            category: "Language & Vision",
        },

        // Advanced AI Systems
        {
            id: "genai",
            label: "Generative AI",
            category: "Advanced AI Systems",
        },
        {
            id: "agi",
            label: "Artificial General Intelligence",
            category: "Advanced AI Systems",
        },
        {
            id: "robotics",
            label: "Robotics & Automation",
            category: "Advanced AI Systems",
        },
        {
            id: "augmented",
            label: "Augmented Intelligence",
            category: "Advanced AI Systems",
        },

        // AI Infrastructure
        {
            id: "mlops",
            label: "Machine Learning Operations",
            category: "AI Infrastructure",
        },
        { id: "edge", label: "Edge AI & IoT", category: "AI Infrastructure" },
        {
            id: "quantum",
            label: "Quantum AI & Computing",
            category: "AI Infrastructure",
        },
        {
            id: "neuromorphic",
            label: "Neuromorphic Computing",
            category: "AI Infrastructure",
        },
        {
            id: "federated",
            label: "Federated Learning",
            category: "AI Infrastructure",
        },
        {
            id: "automl",
            label: "AutoML & Neural Architecture Search",
            category: "AI Infrastructure",
        },

        // AI Ethics & Safety
        {
            id: "ethics",
            label: "AI Ethics & Responsibility",
            category: "AI Ethics & Safety",
        },
        {
            id: "safety",
            label: "AI Safety & Security",
            category: "AI Ethics & Safety",
        },
        {
            id: "privacy",
            label: "AI Privacy & Data Protection",
            category: "AI Ethics & Safety",
        },
        {
            id: "fairness",
            label: "AI Fairness & Bias",
            category: "AI Ethics & Safety",
        },
        {
            id: "explainable",
            label: "Explainable AI",
            category: "AI Ethics & Safety",
        },

        // Domain Applications
        {
            id: "healthcare",
            label: "AI in Healthcare",
            category: "Domain Applications",
        },
        {
            id: "finance",
            label: "AI in Finance",
            category: "Domain Applications",
        },
        {
            id: "timeseries",
            label: "Time Series Analysis",
            category: "Domain Applications",
        },
        {
            id: "knowledge",
            label: "Knowledge Graphs & Reasoning",
            category: "Domain Applications",
        },
    ];

    const categories = [...new Set(AI_TOPICS.map((option) => option.category))];

    return (
        <Page back={true}>
            <List
                style={{
                    padding: "16px",
                    margin: "0 16px", // Adds horizontal margin
                }}
            >
                <Steps count={3} progress={1} />

                <LargeTitle weight="3">Select Topics</LargeTitle>

                <div
                    style={{
                        display: "flex",
                        gap: 16,
                        flexWrap: "wrap",
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
                                {AI_TOPICS.filter(
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
                            navigate("/filters");
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                            });
                        }}
                    >
                        Next
                    </Button>
                </FixedLayout>
            </List>
        </Page>
    );
};
