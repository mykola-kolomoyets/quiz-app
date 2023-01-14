import { questions } from "@/shared/constants/questions";
import { useCallback, useEffect, useState } from "react";
import { getRandomInt, sleep } from "../functions/common";
import { Question } from "../types";

type QuestionStatus = "loading" | "loaded";

const useGetQuestion = () => {
  const [status, setStatus] = useState<QuestionStatus>("loading");

  const [question, setQuestion] = useState<Question | null>(null);

  const refetch = useCallback(async () => {
    setStatus("loading");

    await sleep(1500);

    const currentQuestion = questions[getRandomInt(0, questions.length - 1)];
    setQuestion(currentQuestion);

    setStatus("loaded");
  }, []);

  useEffect(() => {
    refetch();
  }, []);

  return {
    status,
    question,
    refetch,
  };
};

export default useGetQuestion;
