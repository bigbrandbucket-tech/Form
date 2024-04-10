import { create } from "zustand";

export const useStore = create((set) => ({
  currentComponent: 6,
  setCurrentComponent: (index) =>
    set((state) => {
      return { currentComponent: index };
    }),
}));
