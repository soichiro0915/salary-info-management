import create from "zustand";
import type { updateSalaryInfoInput } from "../schema/salaryInfo";

type State = {
  editedSalaryInfo: updateSalaryInfoInput;
  updateEditedSalaryInfo: (payload: updateSalaryInfoInput) => void;
  resetEditedSalaryInfo: () => void;
};

const useStore = create<State>((set) => ({
  editedSalaryInfo: {
    salaryInfoId: "",
    year: 0,
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
    otheDeducting: 0,
  },

  updateEditedSalaryInfo: (payload) =>
    set({
      editedSalaryInfo: payload,
    }),

  resetEditedSalaryInfo: () =>
    set({
      editedSalaryInfo: {
        salaryInfoId: "",
        year: 0,
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
        otheDeducting: 0,
      },
    }),
}));

export default useStore;
