import { MDXRemote } from "next-mdx-remote/rsc";
import { SqlPlayground } from "@/features/sql-playground/ui/SqlPlayground";
import { SchemaDiagram } from "@/features/schema-diagram/ui/SchemaDiagram";
import { ContextArchitectureFlow, FinalArchitectureFlow } from "@/features/schema-diagram/ui/LogArchitectureDiagrams";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { CareerTimeline } from "@/features/about/ui/CareerTimeline";
import { Experience, Project, Feature, FeatureItem } from "@/features/about/ui/TimelineItems";
import { CodeComparison } from "./CodeComparison";
import { BenchmarkSimulator } from "./BenchmarkSimulator";
import { ContextRaceDemo } from "./ContextRaceDemo";
import { StatCard } from "./StatCard";

const components = {
    SqlPlayground,
    SchemaDiagram,
    ContextArchitectureFlow,
    FinalArchitectureFlow,
    Button,
    Card,
    CareerTimeline,
    Experience,
    Project,
    Feature,
    FeatureItem,
    CodeComparison,
    BenchmarkSimulator,
    ContextRaceDemo,
    StatCard
};

interface MdxContentProps {
    source: string;
}

export function MdxContent({ source }: MdxContentProps) {
    return (
        <article className="prose dark:prose-invert max-w-none break-words prose-strong:font-bold prose-strong:text-foreground">
            <MDXRemote
                source={source}
                components={components}
            />
        </article>
    );
}
