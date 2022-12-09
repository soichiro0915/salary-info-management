import type { FormEvent } from "react";
import useStore from "../store/salaryInfo";
import { useMutateSalaryInfo } from "../hooks/useMutateSalaryInfo";
import dayjs from "dayjs";

const nowYearMonth = dayjs().format("YYYY-MM");

export const SalaryInfoForm = () => {
  const { createSalaryInfoMutation, updateSalaryInfoMutation } =
    useMutateSalaryInfo();
  const { editedSalaryInfo } = useStore();
  const update = useStore((state) => state.updateEditedSalaryInfo);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedSalaryInfo.salaryInfoId === "")
      createSalaryInfoMutation.mutate({
        year: editedSalaryInfo.year,
        month: editedSalaryInfo.month,
        basicSalary: editedSalaryInfo.basicSalary,
        overtimePay: editedSalaryInfo.overtimePay,
        allowances: editedSalaryInfo.allowances,
        bonus: editedSalaryInfo.bonus,
        otherSalary: editedSalaryInfo.otherSalary,
        incomeTax: editedSalaryInfo.incomeTax,
        residentTax: editedSalaryInfo.residentTax,
        healthInsurancePremium: editedSalaryInfo.healthInsurancePremium,
        annuityPrice: editedSalaryInfo.annuityPrice,
        employmentInsurancePremium: editedSalaryInfo.employmentInsurancePremium,
        federalLawPermits: editedSalaryInfo.federalLawPermits,
        otherDeductin: editedSalaryInfo.otherDeductin,
      });
    else {
      updateSalaryInfoMutation.mutate({
        salaryInfoId: editedSalaryInfo.salaryInfoId,
        year: editedSalaryInfo.year,
        month: editedSalaryInfo.month,
        basicSalary: editedSalaryInfo.basicSalary,
        overtimePay: editedSalaryInfo.overtimePay,
        allowances: editedSalaryInfo.allowances,
        bonus: editedSalaryInfo.bonus,
        otherSalary: editedSalaryInfo.otherSalary,
        incomeTax: editedSalaryInfo.incomeTax,
        residentTax: editedSalaryInfo.residentTax,
        healthInsurancePremium: editedSalaryInfo.healthInsurancePremium,
        annuityPrice: editedSalaryInfo.annuityPrice,
        employmentInsurancePremium: editedSalaryInfo.employmentInsurancePremium,
        federalLawPermits: editedSalaryInfo.federalLawPermits,
        otherDeductin: editedSalaryInfo.otherDeductin,
      });
    }
  };

  const salary =
    editedSalaryInfo.basicSalary +
    editedSalaryInfo.overtimePay +
    editedSalaryInfo.allowances +
    editedSalaryInfo.bonus +
    editedSalaryInfo.otherSalary;
  const deduction =
    editedSalaryInfo.incomeTax +
    editedSalaryInfo.residentTax +
    editedSalaryInfo.healthInsurancePremium +
    editedSalaryInfo.annuityPrice +
    editedSalaryInfo.employmentInsurancePremium +
    editedSalaryInfo.federalLawPermits +
    editedSalaryInfo.otherDeductin;
  const netIncome = salary - deduction;

  return (
    <form onSubmit={handleSubmit} className="mb-5 text-center">
      {(updateSalaryInfoMutation.isLoading ||
        createSalaryInfoMutation.isLoading) && (
        <p className="mb-2 text-green-500">Mutation under process...</p>
      )}
      <input
        type="month"
        required
        autoComplete="on"
        value={
          editedSalaryInfo.year
            ? editedSalaryInfo.year +
              "-" +
              ("00" + editedSalaryInfo.month).slice(-2)
            : nowYearMonth
        }
        onChange={(e) => {
          update({
            ...editedSalaryInfo,
            year: parseInt(e.target.value.slice(0, 4)),
            month: parseInt(e.target.value.slice(5, 7)),
          });
        }}
      />
      <p className="mb-3 text-pink-500">
        {createSalaryInfoMutation.error?.data?.zodError &&
          createSalaryInfoMutation.error.data.zodError.fieldErrors.year &&
          createSalaryInfoMutation.error.data.zodError.fieldErrors.month}
      </p>

      <h1>手取り　{netIncome}円</h1>

      <h2>収入 {salary}円</h2>

      <label>基本給</label>
      <input
        type="number"
        className="mb-3 border border-gray-300 px-3 py-2"
        value={editedSalaryInfo.basicSalary}
        onChange={(e) => {
          update({
            ...editedSalaryInfo,
            basicSalary: parseInt(e.target.value),
          });
        }}
      />
      <span>円</span>
      <p className="mb-3 text-pink-500">
        {createSalaryInfoMutation.error?.data?.zodError &&
          createSalaryInfoMutation.error.data.zodError.fieldErrors.basicSalary}
      </p>

      <label>残業代</label>
      <input
        type="number"
        className="mb-3 border border-gray-300 px-3 py-2"
        value={editedSalaryInfo.overtimePay}
        onChange={(e) => {
          update({
            ...editedSalaryInfo,
            overtimePay: parseInt(e.target.value),
          });
        }}
      />
      <span>円</span>
      <p className="mb-3 text-pink-500">
        {createSalaryInfoMutation.error?.data?.zodError &&
          createSalaryInfoMutation.error.data.zodError.fieldErrors.overtimePay}
      </p>

      <label>各種手当</label>
      <input
        type="number"
        className="mb-3 border border-gray-300 px-3 py-2"
        value={editedSalaryInfo.allowances}
        onChange={(e) => {
          update({
            ...editedSalaryInfo,
            allowances: parseInt(e.target.value),
          });
        }}
      />
      <span>円</span>
      <p className="mb-3 text-pink-500">
        {createSalaryInfoMutation.error?.data?.zodError &&
          createSalaryInfoMutation.error.data.zodError.fieldErrors.allowances}
      </p>

      <label>ボーナス</label>
      <input
        type="number"
        className="mb-3 border border-gray-300 px-3 py-2"
        value={editedSalaryInfo.bonus}
        onChange={(e) => {
          update({
            ...editedSalaryInfo,
            bonus: parseInt(e.target.value),
          });
        }}
      />
      <span>円</span>
      <p className="mb-3 text-pink-500">
        {createSalaryInfoMutation.error?.data?.zodError &&
          createSalaryInfoMutation.error.data.zodError.fieldErrors.bonus}
      </p>

      <label>その他</label>
      <input
        type="number"
        className="mb-3 border border-gray-300 px-3 py-2"
        value={editedSalaryInfo.otherSalary}
        onChange={(e) => {
          update({
            ...editedSalaryInfo,
            otherSalary: parseInt(e.target.value),
          });
        }}
      />
      <span>円</span>
      <p className="mb-3 text-pink-500">
        {createSalaryInfoMutation.error?.data?.zodError &&
          createSalaryInfoMutation.error.data.zodError.fieldErrors.otherSalary}
      </p>

      <h2>控除　{deduction}円</h2>

      <label>所得税</label>
      <input
        type="number"
        className="mb-3 border border-gray-300 px-3 py-2"
        value={editedSalaryInfo.incomeTax}
        onChange={(e) => {
          update({
            ...editedSalaryInfo,
            incomeTax: parseInt(e.target.value),
          });
        }}
      />
      <span>円</span>
      <p className="mb-3 text-pink-500">
        {createSalaryInfoMutation.error?.data?.zodError &&
          createSalaryInfoMutation.error.data.zodError.fieldErrors.incomeTax}
      </p>

      <label>住民税</label>
      <input
        type="number"
        className="mb-3 border border-gray-300 px-3 py-2"
        value={editedSalaryInfo.residentTax}
        onChange={(e) => {
          update({
            ...editedSalaryInfo,
            residentTax: parseInt(e.target.value),
          });
        }}
      />
      <span>円</span>
      <p className="mb-3 text-pink-500">
        {createSalaryInfoMutation.error?.data?.zodError &&
          createSalaryInfoMutation.error.data.zodError.fieldErrors.residentTax}
      </p>

      <label>健康保険料</label>
      <input
        type="number"
        className="mb-3 border border-gray-300 px-3 py-2"
        value={editedSalaryInfo.healthInsurancePremium}
        onChange={(e) => {
          update({
            ...editedSalaryInfo,
            healthInsurancePremium: parseInt(e.target.value),
          });
        }}
      />
      <span>円</span>
      <p className="mb-3 text-pink-500">
        {createSalaryInfoMutation.error?.data?.zodError &&
          createSalaryInfoMutation.error.data.zodError.fieldErrors
            .healthInsurancePremium}
      </p>

      <label>年金保険料</label>
      <input
        type="number"
        className="mb-3 border border-gray-300 px-3 py-2"
        value={editedSalaryInfo.annuityPrice}
        onChange={(e) => {
          update({
            ...editedSalaryInfo,
            annuityPrice: parseInt(e.target.value),
          });
        }}
      />
      <span>円</span>
      <p className="mb-3 text-pink-500">
        {createSalaryInfoMutation.error?.data?.zodError &&
          createSalaryInfoMutation.error.data.zodError.fieldErrors.annuityPrice}
      </p>

      <label>雇用保険料</label>
      <input
        type="number"
        className="mb-3 border border-gray-300 px-3 py-2"
        value={editedSalaryInfo.employmentInsurancePremium}
        onChange={(e) => {
          update({
            ...editedSalaryInfo,
            employmentInsurancePremium: parseInt(e.target.value),
          });
        }}
      />
      <span>円</span>
      <p className="mb-3 text-pink-500">
        {createSalaryInfoMutation.error?.data?.zodError &&
          createSalaryInfoMutation.error.data.zodError.fieldErrors
            .employmentInsurancePremium}
      </p>

      <label>労働組合費</label>
      <input
        type="number"
        className="mb-3 border border-gray-300 px-3 py-2"
        value={editedSalaryInfo.federalLawPermits}
        onChange={(e) => {
          update({
            ...editedSalaryInfo,
            federalLawPermits: parseInt(e.target.value),
          });
        }}
      />
      <span>円</span>
      <p className="mb-3 text-pink-500">
        {createSalaryInfoMutation.error?.data?.zodError &&
          createSalaryInfoMutation.error.data.zodError.fieldErrors
            .federalLawPermits}
      </p>

      <label>その他</label>
      <input
        type="number"
        className="mb-3 border border-gray-300 px-3 py-2"
        value={editedSalaryInfo.otherDeductin}
        onChange={(e) => {
          update({
            ...editedSalaryInfo,
            otherDeductin: parseInt(e.target.value),
          });
        }}
      />
      <span>円</span>
      <p className="mb-3 text-pink-500">
        {createSalaryInfoMutation.error?.data?.zodError &&
          createSalaryInfoMutation.error.data.zodError.fieldErrors
            .otherDeductin}
      </p>

      <button className="rounded bg-indigo-600 py-1 px-3 text-white hover:bg-indigo-700 focus:outline-none">
        {editedSalaryInfo.salaryInfoId === "" ? "Create" : "Update"}
      </button>
    </form>
  );
};
