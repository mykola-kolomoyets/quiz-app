import { Quote } from "@/shared/utils/types/api/quotes";

type QuotesState = {
  quotes: Quote[];
};

export type QuotesStore = {
  setQuotes: (quotes: Quote[]) => void;
} & QuotesState;
