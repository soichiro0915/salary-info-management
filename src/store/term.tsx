import create from "zustand";
import type { updateTermInput } from "../schema/term";

type State = {
  editedTerm: updateTermInput;
  updateEditedTerm: (payload: updateTermInput) => void;
  resetEditedTerm: () => void;
};

const useStore = create<State>((set) => ({
  editedTerm: {
    termId: "",
    year: 0,
  },

  updateEditedTerm: (payload) =>
    set({
      editedTerm: payload,
    }),

  resetEditedTerm: () =>
    set({
      editedTerm: {
        termId: "",
        year: 0,
      },
    }),
}));

export default useStore;
