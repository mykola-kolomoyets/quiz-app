import { useCallback, useEffect } from "react";
import useGetAllQuotes from "@/api/hooks/quotes/useGetAllQuotes";
import { useQuotesStore } from "@/store/quotes";
import { getRandomInt } from "@/shared/utils/functions/common";

const useQuotes = () => {
  const { quotes, setQuotes } = useQuotesStore();

  const { data: quotesResponse } = useGetAllQuotes({
    enabled: !quotes || !quotes?.length,
  });

  const getRandomQuote = useCallback(async () => {
    const randomIndex = getRandomInt(0, quotes.length - 1);

    if (quotes.length) {
      return quotes[randomIndex];
    }
  }, [quotes]);

  useEffect(() => {
    if (quotesResponse?.length) {
      setQuotes(quotesResponse.slice(0, 100));
    }
  }, [quotesResponse]);

  return {
    quotes,
    getRandomQuote,
  };
};

export default useQuotes;
