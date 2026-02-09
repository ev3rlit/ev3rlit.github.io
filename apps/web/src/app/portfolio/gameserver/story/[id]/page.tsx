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
import { Detail_ErrorHandling } from '@/views/portfolio/story-detail/Detail_ErrorHandling';
import { Detail_WebsocketMiddleware } from '@/views/portfolio/story-detail/Detail_WebsocketMiddleware';
import { Detail_TrackingContainer } from '@/views/portfolio/story-detail/Detail_TrackingContainer';

const storyMap: Record<string, React.ComponentType> = {
    'sample': Detail_Sample,
    'service-transfer': Detail_ServiceTransfer,
    'payment-migration': Detail_PaymentMigration,
    'revenue-api': Detail_RevenueApi,
    'log-pipeline': Detail_LogPipeline,
    'apple-transfer': Detail_AppleTransfer,
    'guild-mine-cqrs': Detail_GuildMineCqrs,
    'guild-mine-concurrency': Detail_GuildMineConcurrency,
    'error-handling': Detail_ErrorHandling,
    'websocket-middleware': Detail_WebsocketMiddleware,
    'tracking-container': Detail_TrackingContainer
};

interface PageProps {
    params: {
        id: string;
    };
}

export default function GameServerStoryDetailPage({ params }: PageProps) {
    const { id } = params;
    const DetailComponent = storyMap[id];

    if (!DetailComponent) {
        return notFound();
    }

    return <DetailComponent />;
}

export function generateStaticParams() {
    return Object.keys(storyMap).map((id) => ({ id }));
}
