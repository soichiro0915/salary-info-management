import create from "zustand";
import type { updateTermInput, selectedTermInput } from "../schema/term";

type State = {
  editedTerm: updateTermInput;
  updateEditedTerm: (payload: updateTermInput) => void;
  resetEditedTerm: () => void;

  selectedTerm: selectedTermInput;
  updateSelectedTerm: (payload: selectedTermInput) => void;
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

  selectedTerm: {
    termId: "",
    year: 0,
  },

  updateSelectedTerm: (payload) =>
    set({
      selectedTerm: payload,
    }),
}));

export default useStore;
