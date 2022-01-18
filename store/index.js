import { persist, devtools } from "zustand/middleware";
import create from "zustand";

export const useStore = create(
  persist(
    devtools(
      (set) => ({
        user: null,
        fingerprint: null,
        setFingerprint: (fingerprint) =>
          set((state) => ({ ...state, fingerprint })),
        setUser: (user) => set((state) => state || { user }),
        bears: 0,
        increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
        removeAllBears: () => set({ bears: 0 }),
      }),
      { name: "useStore" }
    ),
    {
      name: "useStore",
    }
  )
);
