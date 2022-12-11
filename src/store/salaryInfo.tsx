import create from "zustand";
import type { updateSalaryInfoInput } from "../schema/salaryInfo";

type State = {
  editedSalaryInfo: updateSalaryInfoInput;
  updateEditedSalaryInfo: (payload: updateSalaryInfoInput) => void;
  resetEditedSalaryInfo: () => void;

  selectedSalaryInfos: updateSalaryInfoInput[];
  updateSelectedSalaryInfos: (payload: updateSalaryInfoInput[]) => void;
};

const useStore = create<State>((set) => ({
  editedSalaryInfo: {
    id: "",
    salaryInfoId: "",
    month: 0,
    basicSalary: 0,
    overtimePay: 0,
    allowances: 0,
    bonus: 0,
    otherSalary: 0,
    incomeTax: 0,
    residentTax: 0,
    healthInsurancePremium: 0,
    annuityPrice: 0,
    employmentInsurancePremium: 0,
    federalLawPermits: 0,
    otherDeductin: 0,
  },

  updateEditedSalaryInfo: (payload) =>
    set({
      editedSalaryInfo: payload,
    }),

  resetEditedSalaryInfo: () =>
    set({
      editedSalaryInfo: {
        id: "",
        salaryInfoId: "",
        month: 0,
        basicSalary: 0,
        overtimePay: 0,
        allowances: 0,
        bonus: 0,
        otherSalary: 0,
        incomeTax: 0,
        residentTax: 0,
        healthInsurancePremium: 0,
        annuityPrice: 0,
        employmentInsurancePremium: 0,
        federalLawPermits: 0,
        otherDeductin: 0,
      },
    }),

  selectedSalaryInfos: [],
  updateSelectedSalaryInfos: (payload) =>
    set({
      selectedSalaryInfos: payload,
    }),
}));

export default useStore;
