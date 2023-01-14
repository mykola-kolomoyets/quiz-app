import { useQuery } from "react-query";
import QuotesService from "@/api/services/quotes";

type UseGetAllQuotesParams = {
  enabled: boolean;
};

const useGetAllQuotes = ({ enabled }: UseGetAllQuotesParams) =>
  useQuery(
    ["quotes/all", enabled],
    async () => {
      return QuotesService.getAll();
    },
    {
      enabled,
      select: (data) => data.data,
    }
  );

export default useGetAllQuotes;
