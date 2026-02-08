import { notFound } from "next/navigation";
import {
    StabilityStoryPage,
    EfficiencyStoryPage,
    OwnershipStoryPage,
    DataEngineeringStoryPage,
    DocumentationStoryPage,
    GrowthStoryPage
} from "@/views/portfolio/story-detail";

interface Props {
    params: Promise<{ storyId: string }>;
}

// Component Registry
const STORY_COMPONENTS: Record<string, React.ComponentType> = {
    'stability': StabilityStoryPage,
    'efficiency': EfficiencyStoryPage,
    'ownership': OwnershipStoryPage,
    'data-engineering': DataEngineeringStoryPage,
    'documentation': DocumentationStoryPage,
    'growth': GrowthStoryPage,
};

export async function generateStaticParams() {
    return Object.keys(STORY_COMPONENTS).map((storyId) => ({ storyId }));
}

export default async function Page({ params }: Props) {
    const { storyId } = await params;
    const StoryComponent = STORY_COMPONENTS[storyId];

    if (!StoryComponent) notFound();

    return <StoryComponent />;
}
