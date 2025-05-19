import {
    Section,
    Cell,
    List,
    Steps,
    FixedLayout,
    Button,
    LargeTitle,
    Multiselect,
    Switch,
} from "@telegram-apps/telegram-ui";
import { useState, type FC } from "react";

import { Page } from "@/components/Page.tsx";
import { MultiselectOption } from "@telegram-apps/telegram-ui/dist/components/Form/Multiselect/types";

export const IndexPage: FC = () => {
    // Define all your form data states
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        topics: [] as MultiselectOption[],
        sources: [] as MultiselectOption[],
    });

    const TOPIC_OPTIONS: MultiselectOption[] = [
        { value: "cv", label: "Computer Vision" },
        { value: "gen_ai", label: "Generative AI" },
        { value: "nlp", label: "Natural Language Processing" },
        { value: "ml", label: "Machine Learning" },
        { value: "dl", label: "Deep Learning" },
        { value: "rl", label: "Reinforcement Learning" },
        { value: "ai_ethics", label: "AI Ethics" },
    ];

    const CONTENT_SOURCE_OPTIONS: MultiselectOption[] = [
        { value: "arxiv", label: "arXiv" },
        { value: "openai_blog", label: "OpenAI Blog" },
        { value: "towards_ai", label: "Towards AI" },
        { value: "ai_trends", label: "AI Trends" },
        { value: "deepmind_blog", label: "DeepMind Blog" },
        { value: "distill", label: "Distill" },
        { value: "ml_research", label: "Machine Learning Research" },
    ];

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            // Handle form submission
            console.log("Form submitted:", formData);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Section>
                        <LargeTitle weight="3">Select Topics</LargeTitle>
                        <Multiselect
                            header="topics"
                            placeholder="Select topics"
                            options={TOPIC_OPTIONS}
                            value={formData.topics}
                            onChange={(newOptions) =>
                                setFormData({ ...formData, topics: newOptions })
                            }
                        />
                    </Section>
                );
            case 2:
                return (
                    <Section>
                        <LargeTitle weight="3">Select Sources</LargeTitle>
                        <Multiselect
                            header="sources"
                            placeholder="Select sources"
                            options={CONTENT_SOURCE_OPTIONS}
                            value={formData.sources}
                            onChange={(newOptions) =>
                                setFormData({
                                    ...formData,
                                    sources: newOptions,
                                })
                            }
                        />
                    </Section>
                );
            case 3:
                return (
                    <Section>
                        <LargeTitle weight="3">Settings</LargeTitle>
                        <Cell
                            Component="label"
                            after={<Switch defaultChecked />}
                            description="Get notified of AI news daily."
                            multiline
                        >
                            Notifications
                        </Cell>
                    </Section>
                );
            default:
                return null;
        }
    };

    return (
        <Page back={true}>
            <List>
                <Section>
                    <Steps count={3} progress={currentStep} />
                    {renderStep()}
                    <FixedLayout
                        style={{
                            padding: 16,
                        }}
                    >
                        <Button size="m" stretched onClick={handleNext}>
                            {currentStep === 3 ? "Submit" : "Next"}
                        </Button>
                    </FixedLayout>
                </Section>
            </List>
        </Page>
    );
};
