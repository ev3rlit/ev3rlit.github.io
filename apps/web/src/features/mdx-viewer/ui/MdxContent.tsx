import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from 'rehype-slug';
import { Network } from "lucide-react";
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
import { GraphwriteDemo } from "./GraphwriteDemo";
import { CodeBlock } from "./CodeBlock";

// MDX Operators (Polymorphic Components)
import { Head } from "@/features/mdx-operators/ui/Head";
import { Branch } from "@/features/mdx-operators/ui/Branch";
import { Compose } from "@/features/mdx-operators/ui/Compose";
import { Switch, Case, Default } from "@/features/mdx-operators/ui/Switch";
import { Map } from "@/features/mdx-operators/ui/Map";
import { MindmapViewer } from "@/features/mdx-viewer/ui/MindmapViewer";

// Portfolio Components
import { ProblemSolution, Problem, Solution, Result, TechDetail, Lesson } from "@/features/portfolio/ui/PortfolioComponents";

// Custom component for code blocks with syntax highlighting
const Pre = ({ children }: { children?: React.ReactNode }) => {
    return <>{children}</>;
};

const Code = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    // If it has a language class (e.g., language-typescript), render with syntax highlighting
    if (className && typeof children === 'string') {
        return <CodeBlock className={className}>{children}</CodeBlock>;
    }
    // Inline code (no language class)
    return <code className="bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>;
};

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
    StatCard,
    GraphwriteDemo,
    // MDX Operators
    Head,
    Branch,
    Compose,
    Switch,
    Case,
    Default,
    Map,
    MindmapViewer,
    Network,
    // Portfolio Components
    ProblemSolution,
    Problem,
    Solution,
    Result,
    TechDetail,
    Lesson,
    // Code block with syntax highlighting
    pre: Pre,
    code: Code,
};

interface MdxContentProps {
    source: string;
}

export function MdxContent({ source }: MdxContentProps) {
    return (
        <article className="prose dark:prose-invert max-w-none break-words prose-strong:font-bold prose-strong:text-foreground prose-headings:scroll-mt-28">
            <MDXRemote
                source={source}
                components={components}
                options={{
                    mdxOptions: {
                        rehypePlugins: [rehypeSlug]
                    }
                }}
            />
        </article>
    );
}
