import create from "zustand";
import { UserStore } from "./models";

export const useUserStore = create<UserStore>((set, get) => {
  return {
    name: "",
    form: undefined,
    isCorrectAnswer: false,

    setUserData: (data) => {
      set(data);
    },

    setIsCorrectAnswer: (isCorrectAnswer) => {
      set({ isCorrectAnswer });
    },
  };
});
