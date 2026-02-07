import React from 'react';
import { notFound } from 'next/navigation';
import { Detail_Sample } from '@/views/portfolio/story-detail/Detail_Sample';
import { Detail_ServiceTransfer } from '@/views/portfolio/story-detail/Detail_ServiceTransfer';
import { Detail_PaymentMigration } from '@/views/portfolio/story-detail/Detail_PaymentMigration';
import { Detail_RevenueApi } from '@/views/portfolio/story-detail/Detail_RevenueApi';
import { Detail_LogPipeline } from '@/views/portfolio/story-detail/Detail_LogPipeline';
import { Detail_AppleTransfer } from '@/views/portfolio/story-detail/Detail_AppleTransfer';
import { Detail_GuildMineCqrs } from '@/views/portfolio/story-detail/Detail_GuildMineCqrs';
import { Detail_GuildMineConcurrency } from '@/views/portfolio/story-detail/Detail_GuildMineConcurrency';

// Map story IDs to their detail components
const storyMap: Record<string, React.ComponentType> = {
    'sample': Detail_Sample,
    'service-transfer': Detail_ServiceTransfer,
    'payment-migration': Detail_PaymentMigration,
    'revenue-api': Detail_RevenueApi,
    'log-pipeline': Detail_LogPipeline,
    'apple-transfer': Detail_AppleTransfer,
    'guild-mine-cqrs': Detail_GuildMineCqrs,
    'guild-mine-concurrency': Detail_GuildMineConcurrency
};

interface PageProps {
    params: {
        id: string;
    };
}

export default function StoryDetailPage({ params }: PageProps) {
    const { id } = params;
    const DetailComponent = storyMap[id];

    if (!DetailComponent) {
        // For development, if not found, just show a placeholder or 404
        // return <div>Story Detail not found for ID: {id}</div>;
        return notFound();
    }

    return <DetailComponent />;
}

// Generate static params if optimizing for static export (SSG)
export function generateStaticParams() {
    return Object.keys(storyMap).map((id) => ({ id }));
}
