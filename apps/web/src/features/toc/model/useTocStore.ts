import { create } from 'zustand';

export interface TocHeading {
    id: string;
    text: string;
    level: number;
}

interface TocState {
    headings: TocHeading[];
    activeId: string;
    isMobileOpen: boolean;

    setHeadings: (headings: TocHeading[]) => void;
    setActiveId: (id: string) => void;
    setMobileOpen: (isOpen: boolean) => void;
    toggleMobileOpen: () => void;
}

export const useTocStore = create<TocState>((set) => ({
    headings: [],
    activeId: '',
    isMobileOpen: false,

    setHeadings: (headings) => set({ headings }),
    setActiveId: (activeId) => set({ activeId }),
    setMobileOpen: (isOpen) => set({ isMobileOpen: isOpen }),
    toggleMobileOpen: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
}));
