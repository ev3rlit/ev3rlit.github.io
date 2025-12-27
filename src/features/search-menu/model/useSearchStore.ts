import { create } from 'zustand';

interface SearchState {
    isOpen: boolean;
    searchQuery: string;
    open: () => void;
    close: () => void;
    toggle: () => void;
    setSearchQuery: (query: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
    isOpen: false,
    searchQuery: '',
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    setSearchQuery: (query) => set({ searchQuery: query }),
}));
