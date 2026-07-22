import { create } from 'zustand';

interface AppState {
  currentSection: string;
  setCurrentSection: (section: string) => void;
  hasInteracted: boolean;
  setHasInteracted: (val: boolean) => void;
  performanceTier: 'high' | 'low';
  setPerformanceTier: (tier: 'high' | 'low') => void;
}

export const useStore = create<AppState>((set) => ({
  currentSection: 'hero',
  setCurrentSection: (section) => set({ currentSection: section }),
  hasInteracted: false,
  setHasInteracted: (val) => set({ hasInteracted: val }),
  performanceTier: 'high',
  setPerformanceTier: (tier) => set({ performanceTier: tier })
}));
