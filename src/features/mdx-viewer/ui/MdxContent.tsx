import { MDXRemote } from "next-mdx-remote/rsc";
import { SqlPlayground } from "@/features/sql-playground/ui/SqlPlayground";
import { SchemaDiagram } from "@/features/schema-diagram/ui/SchemaDiagram";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { CareerTimeline } from "@/features/about/ui/CareerTimeline";
import { Experience, Project, Feature, FeatureItem } from "@/features/about/ui/TimelineItems";

const components = {
    SqlPlayground,
    SchemaDiagram,
    Button,
    Card,
    CareerTimeline,
    Experience,
    Project,
    Feature,
    FeatureItem
};

interface MdxContentProps {
    source: string;
}

export function MdxContent({ source }: MdxContentProps) {
    return (
        <article className="prose prose-stone dark:prose-invert max-w-none break-words prose-headings:font-bold prose-h1:text-2xl md:prose-h1:text-3xl prose-h2:text-xl md:prose-h2:text-2xl prose-a:text-indigo-600 hover:prose-a:text-indigo-500 prose-img:rounded-xl prose-img:w-full prose-img:h-auto">
            <MDXRemote source={source} components={components} />
        </article>
    );
}
