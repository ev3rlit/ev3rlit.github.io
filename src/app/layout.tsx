import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/shared/lib/cn';
import { ContentWatchdog } from '@/features/dev-tools/ui/ContentWatchdog';
import { WhiteboardLayout } from '@/widgets/layout/ui/WhiteboardLayout';
import { Sidebar } from '@/widgets/sidebar/ui';
import { getPostList } from '@/entities/post/api/get-posts';

import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { SITE_CONFIG } from '@/shared/config/site';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const posts = await getPostList();

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(inter.className, "antialiased selection:bg-indigo-100 selection:text-indigo-900")}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <WhiteboardLayout sidebarContent={<Sidebar posts={posts} />} posts={posts}>
                        {children}
                    </WhiteboardLayout>
                    {process.env.NODE_ENV === 'development' && <ContentWatchdog />}
                </ThemeProvider>
            </body>
        </html>
    );
}
