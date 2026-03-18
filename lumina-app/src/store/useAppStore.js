import { create } from 'zustand';

/**
 * Global application UI state — managed by Zustand.
 *
 * This store handles ephemeral UI state that doesn't belong in
 * server-state (React Query) or component-local state.
 */
export const useAppStore = create((set) => ({
  // Sidebar state
  isSidebarExpanded: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarExpanded: !state.isSidebarExpanded })),

  // Command palette state
  isCommandPaletteOpen: false,
  openCommandPalette: () => set({ isCommandPaletteOpen: true }),
  closeCommandPalette: () => set({ isCommandPaletteOpen: false }),
  toggleCommandPalette: () =>
    set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),

  // Active note being edited
  activeNoteId: null,
  setActiveNoteId: (id) => set({ activeNoteId: id }),

  // Theme (for future multi-theme support)
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
}));
