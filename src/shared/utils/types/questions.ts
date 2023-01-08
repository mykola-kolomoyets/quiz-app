type QuestionVariant = {
  label: string;
  value: string;
};

export type Question = {
  id: string;
  title: string;
  description: string[];
  imageUrl?: string;
  answersVariants?: QuestionVariant[];
  correctAnswer: QuestionVariant | string;
};
