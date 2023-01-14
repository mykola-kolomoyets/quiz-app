import { create } from "zustand";
import { QuotesStore } from "./models";

export const useQuotesStore = create<QuotesStore>((set) => {
  return {
    quotes: [],
    setQuotes: (quotes) => {
      set({ quotes });
    },
  };
});
