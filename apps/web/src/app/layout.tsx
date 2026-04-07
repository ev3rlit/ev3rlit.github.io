import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/shared/lib/cn';
import { ContentWatchdog } from '@/features/dev-tools/ui/ContentWatchdog';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { ViewProvider } from '@/shared/context/ViewContext';
import { SITE_CONFIG } from '@/shared/config/site';
import { SiteTopbar } from '@/widgets/layout/ui/SiteTopbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(inter.className, "antialiased selection:bg-indigo-100 selection:text-stone-900")}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ViewProvider>
                        <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
                            <SiteTopbar />
                            <main className="mx-auto w-full max-w-[640px] px-6 pb-20 pt-[104px] sm:pt-[112px]">
                                {children}
                            </main>
                        </div>
                    </ViewProvider>
                    {process.env.NODE_ENV === 'development' && <ContentWatchdog />}
                </ThemeProvider>
            </body>
        </html>
    );
}
