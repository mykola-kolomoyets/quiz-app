import { SelectOption } from "@/components/form/select";

export type UserState = {
  name?: string;
  form?: SelectOption;
  isCorrectAnswer: boolean;
};

export type UserStore = {
  setUserData: (data: Omit<UserState, "isCorrectAnswer">) => void;
  setIsCorrectAnswer: (value: boolean) => void;
} & UserState;
