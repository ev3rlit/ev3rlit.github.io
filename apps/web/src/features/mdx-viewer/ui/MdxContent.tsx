import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { Network } from "lucide-react";
import Link from "next/link";
import { SqlPlayground } from "@/features/sql-playground/ui/SqlPlayground";
import { SchemaDiagram } from "@/features/schema-diagram/ui/SchemaDiagram";
import { ContextArchitectureFlow, FinalArchitectureFlow } from "@/features/schema-diagram/ui/LogArchitectureDiagrams";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { CareerTimeline } from "@/features/about/ui/CareerTimeline";
import { Experience, Project, Feature, FeatureItem, TechStack } from "@/features/about/ui/TimelineItems";
import { CodeComparison } from "./CodeComparison";
import { BenchmarkSimulator } from "./BenchmarkSimulator";
import { ContextRaceDemo } from "./ContextRaceDemo";
import { StatCard } from "./StatCard";
import { GraphwriteDemo } from "./GraphwriteDemo";
import { CodeBlock } from "./CodeBlock";
import { extractCodeBlockProps } from "../lib/extractCodeBlockProps";

// MDX Operators (Polymorphic Components)
import { Head } from "@/features/mdx-operators/ui/Head";
import { Branch } from "@/features/mdx-operators/ui/Branch";
import { Compose } from "@/features/mdx-operators/ui/Compose";
import { Switch, Case, Default } from "@/features/mdx-operators/ui/Switch";
import { Map } from "@/features/mdx-operators/ui/Map";
import { MindmapViewer } from "@/features/mdx-viewer/ui/MindmapViewer";



// Custom component for code blocks with syntax highlighting
const Pre = ({ children }: { children?: React.ReactNode }) => {
    const codeBlockProps = extractCodeBlockProps(children);

    if (codeBlockProps) {
        return <CodeBlock className={codeBlockProps.className}>{codeBlockProps.children}</CodeBlock>;
    }

    return <pre>{children}</pre>;
};

const Code = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    // If it has a language class (e.g., language-typescript), render with syntax highlighting
    if (className && typeof children === 'string') {
        return <CodeBlock className={className}>{children}</CodeBlock>;
    }
    // Inline code (no language class)
    return (
        <code className="rounded-[4px] bg-stone-100 px-[6px] py-[2px] font-mono text-[13px] text-stone-700 dark:bg-stone-800 dark:text-stone-300">
            {children}
        </code>
    );
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
    TechStack,
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
    // Code block with syntax highlighting
    pre: Pre,
    code: Code,
    h2: ({ children }: { children?: React.ReactNode }) => (
        <h2 className="mt-[60px] mb-4 text-[1.35rem] font-extrabold leading-[1.3] tracking-[-0.025em] text-stone-950 dark:text-stone-50">
            {children}
        </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
        <h3 className="mt-9 mb-3 text-[1.05rem] font-bold leading-[1.4] text-stone-950 dark:text-stone-50">
            {children}
        </h3>
    ),
    p: ({ children }: { children?: React.ReactNode }) => (
        <p className="mdx-paragraph mb-6 text-base leading-[1.85] text-stone-600 dark:text-stone-400">
            {children}
        </p>
    ),
    a: ({ href = '', children }: { href?: string; children?: React.ReactNode }) => {
        const isInternal = href.startsWith('/') || href.startsWith('#');

        if (isInternal) {
            return (
                <Link href={href} className="font-medium text-indigo-500 underline decoration-indigo-200 underline-offset-4 transition-colors hover:text-indigo-600 dark:text-indigo-400 dark:decoration-indigo-900 dark:hover:text-indigo-300">
                    {children}
                </Link>
            );
        }

        return (
            <a
                href={href}
                className="font-medium text-indigo-500 underline decoration-indigo-200 underline-offset-4 transition-colors hover:text-indigo-600 dark:text-indigo-400 dark:decoration-indigo-900 dark:hover:text-indigo-300"
                target="_blank"
                rel="noreferrer"
            >
                {children}
            </a>
        );
    },
    ul: ({ children }: { children?: React.ReactNode }) => (
        <ul className="mb-6 list-disc pl-5">
            {children}
        </ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
        <ol className="mb-6 list-decimal pl-5">
            {children}
        </ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
        <li className="mb-1.5 text-base leading-[1.75] text-stone-600 marker:text-indigo-500 dark:text-stone-400 dark:marker:text-indigo-400">
            {children}
        </li>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
        <blockquote className="my-8 border-l-[3px] border-indigo-500 py-1 pl-6 dark:border-indigo-400">
            {children}
        </blockquote>
    ),
    table: ({ children }: { children?: React.ReactNode }) => (
        <div className="my-8 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-[15px] leading-[1.7]">
                {children}
            </table>
        </div>
    ),
    thead: ({ children }: { children?: React.ReactNode }) => (
        <thead className="border-y border-stone-200 dark:border-stone-800">
            {children}
        </thead>
    ),
    tbody: ({ children }: { children?: React.ReactNode }) => (
        <tbody className="[&_tr:last-child]:border-b-0">
            {children}
        </tbody>
    ),
    tr: ({ children }: { children?: React.ReactNode }) => (
        <tr className="border-b border-stone-200 dark:border-stone-800">
            {children}
        </tr>
    ),
    th: ({ children }: { children?: React.ReactNode }) => (
        <th className="px-4 py-3 text-left text-[13px] font-bold uppercase tracking-[0.08em] text-stone-500 dark:text-stone-400">
            {children}
        </th>
    ),
    td: ({ children }: { children?: React.ReactNode }) => (
        <td className="px-4 py-3 align-top text-[15px] text-stone-600 dark:text-stone-400 [&_code]:whitespace-nowrap">
            {children}
        </td>
    ),
    hr: () => <hr className="my-12 border-none border-t border-stone-200 dark:border-stone-800" />,
    strong: ({ children }: { children?: React.ReactNode }) => (
        <strong className="font-semibold text-stone-950 dark:text-stone-50">{children}</strong>
    ),
    mark: ({ children }: { children?: React.ReactNode }) => (
        <mark className="bg-transparent font-semibold text-indigo-600 dark:text-indigo-400">{children}</mark>
    ),
};

interface MdxContentProps {
    source: string;
}

export function MdxContent({ source }: MdxContentProps) {
    return (
        <div className="article-body break-words pb-4 [&_.mdx-paragraph:first-of-type]:mb-8 [&_.mdx-paragraph:first-of-type]:text-[18px] [&_.mdx-paragraph:first-of-type]:leading-[1.75] [&_.mdx-paragraph:first-of-type]:text-stone-950 dark:[&_.mdx-paragraph:first-of-type]:text-stone-50 [&_blockquote_.mdx-paragraph]:mb-0 [&_blockquote_.mdx-paragraph]:text-[17px] [&_blockquote_.mdx-paragraph]:italic [&_blockquote_.mdx-paragraph]:leading-[1.7] [&_blockquote_.mdx-paragraph]:text-stone-600 dark:[&_blockquote_.mdx-paragraph]:text-stone-400 [&_li_.mdx-paragraph]:mb-0 [&_li_.mdx-paragraph]:text-inherit">
            <MDXRemote
                source={source}
                components={components}
                options={{
                    mdxOptions: {
                        remarkPlugins: [remarkGfm],
                        rehypePlugins: [rehypeSlug]
                    }
                }}
            />
        </div>
    );
}
