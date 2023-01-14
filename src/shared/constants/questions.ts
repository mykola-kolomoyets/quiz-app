import { Question } from "../utils/types";

export const questions: Question[] = [
  {
    id: "1",
    title: "The title of the question",
    description: [
      "The text of the questionThe text of the questionThe text of the questionThe text of the questionThe text of the questionThe text of the questionThe text of the questionThe text of the questionThe text of the questionThe text of the questionThe text of the questionThe text of the questionThe text of the questionThe text of the question",
      "2 + 2 = ?",
    ],
    explanation: "2 + 2 = 4",
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
  {
    id: "2",
    title: "The title of the question",
    description: ["What is the capital of Great Britain?"],
    explanation: "London as capital of Great Britain",
    correctAnswer: "London",
  },
  {
    id: "3",
    title: "The title of the question",
    description: ["What s on the image?"],
    imageUrl:
      "https://images.unsplash.com/photo-1673712622614-6cf518efab93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    explanation: "This is a bicycle",
    correctAnswer: "Bicycle",
  },
];
