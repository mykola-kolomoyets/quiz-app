import { Question } from "../utils/types";

export const questions: Question[] = [
  {
    id: "1",
    title: "Maths question",
    description: [
      "You have the most complicated question.",
      "Question: 2 + 2 = ?",
    ],
    answersVariants: [
      {
        label: "4",
        value: "4",
      },
      {
        label: "3",
        value: "3",
      },
      {
        label: "2",
        value: "2",
      },
      {
        label: "1",
        value: "1",
      },
    ],
    correctAnswer: {
      label: "4",
      value: "4",
    },
  },
];
