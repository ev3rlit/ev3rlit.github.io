import { WhiteboardPage } from '@/views/whiteboard/ui/WhiteboardPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Whiteboard | ev3r.lit',
    description: 'Interactive MDX Mind Mapping and Learning Tool',
};

export default function Page() {
    return <WhiteboardPage />;
}
