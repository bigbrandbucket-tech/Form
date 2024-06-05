import { create } from "zustand";

export const useStore = create((set) => ({
  currentComponent: 0,
  setCurrentComponent: (index) =>
    set(() => {
      return { currentComponent: index };
    }),
  currentState: [],
  setCurrentState: (index) =>
    set(() => {
      return { currentState: index };
    }),
}));

