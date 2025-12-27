import { create } from 'zustand';

interface SidebarState {
    isSidebarOpen: boolean;
    isPlaygroundMode: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (isOpen: boolean) => void;
    setPlaygroundMode: (isPlayground: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
    isSidebarOpen: true,
    isPlaygroundMode: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
    setPlaygroundMode: (isPlayground) => set({ isPlaygroundMode: isPlayground }),
}));
