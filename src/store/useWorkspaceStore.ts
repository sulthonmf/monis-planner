import { create } from 'zustand';
import { WorkspaceSetup } from '@/types/workspace';

interface WorkspaceState extends WorkspaceSetup {
  // Actions
  setDesk: (deskId: string) => void;
  setChair: (chairId: string) => void;
  toggleAccessory: (accessoryId: string) => void;
  removeAccessory: (accessoryId: string) => void;
  incrementAccessory: (accessoryId: string) => void;
  setBackground: (bgId: string) => void;
  setDuration: (weeks: number) => void;
  clearAll: () => void;
}

const initialState: WorkspaceSetup = {
  selectedDeskId: '',
  selectedChairId: '',
  selectedAccessories: {},
  selectedBackgroundId: 'gaming-room',
  duration: 1,
};

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  ...initialState,

  setDesk: (deskId) => set({ selectedDeskId: deskId }),

  setChair: (chairId) => set({ selectedChairId: chairId }),

  toggleAccessory: (accessoryId) =>
    set((state) => {
      const current = { ...state.selectedAccessories };
      if (current[accessoryId]) {
        delete current[accessoryId];
      } else {
        current[accessoryId] = 1;
      }
      return { selectedAccessories: current };
    }),

  removeAccessory: (accessoryId) =>
    set((state) => {
      const current = { ...state.selectedAccessories };
      delete current[accessoryId];
      return { selectedAccessories: current };
    }),

  incrementAccessory: (accessoryId) =>
    set((state) => {
      const current = { ...state.selectedAccessories };
      current[accessoryId] = Math.min((current[accessoryId] || 0) + 1, 4);
      return { selectedAccessories: current };
    }),

  setBackground: (bgId) => set({ selectedBackgroundId: bgId }),

  setDuration: (weeks) => set({ duration: weeks }),

  clearAll: () =>
    set({
      selectedDeskId: '',
      selectedChairId: '',
      selectedAccessories: {},
      duration: 1,
    }),
}));
