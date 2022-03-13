import { devtools } from "zustand/middleware";
import create from "zustand";

export const useStoreOpenChat = create(
  devtools(
    (set) => ({
      openChat: true,
      setOpenChat: (value) => set((state) => ({ ...state, openChat: value })),
    }),
    { name: "useStoreOpenChat" }
  )
);
