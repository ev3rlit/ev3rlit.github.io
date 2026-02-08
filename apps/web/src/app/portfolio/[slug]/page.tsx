import { StoryDetail_ErrorHandling } from '@/views/portfolio/projects/StoryDetail_ErrorHandling';
import { notFound } from 'next/navigation';

interface PageProps {
    params: {
        slug: string;
    };
}

const COMPONENT_MAP: Record<string, React.ComponentType> = {
    'error-handling': StoryDetail_ErrorHandling,
    // Add other stories here as they are migrated
};

export default function Page({ params }: PageProps) {
    const Component = COMPONENT_MAP[params.slug];

    if (!Component) {
        // Fallback for non-migrated content or 404
        // Logic to fetch MDX could remain here if we want hybrid, 
        // but for now let's strict to migration plan or 404 to force migration.
        notFound();
    }

    return <Component />;
}
