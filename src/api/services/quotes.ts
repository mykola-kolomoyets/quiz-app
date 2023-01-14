import axios from "axios";
import { Quote } from "@/shared/utils/types/api/quotes";

export default class QuotesService {
  private static BASE_URL = "https://type.fit/api";

  private static paths = {
    getAll: "/quotes",
  };

  public static getAll = () =>
    axios.get<Quote[]>(`${this.BASE_URL}${this.paths.getAll}`);
}
