import { create } from 'zustand';

interface SidebarState {
    isSidebarOpen: boolean;
    isPlaygroundMode: boolean;
    isWhiteboardMode: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (isOpen: boolean) => void;
    setPlaygroundMode: (isPlayground: boolean) => void;
    setWhiteboardMode: (isWhiteboard: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
    isSidebarOpen: true,
    isPlaygroundMode: false,
    isWhiteboardMode: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
    setPlaygroundMode: (isPlayground) => set({ isPlaygroundMode: isPlayground }),
    setWhiteboardMode: (isWhiteboard) => set({ isWhiteboardMode: isWhiteboard }),
}));
