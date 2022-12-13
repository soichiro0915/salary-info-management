import { useState } from "react";
import { useRouter } from "next/router";
import { NumberInput, Text, Button, Modal } from "@mantine/core";

import { useMutateSalaryInfo } from "../../hooks/useMutateSalaryInfo";
import useStore from "../../store/salaryInfo";

import type { FormEvent } from "react";

const UpdateSalalyInfoModal = () => {
  const router = useRouter();
  const { year } = router.query;
  const [modalOpen, setModalOpen] = useState(false);
  const { updateSalaryInfoMutation } = useMutateSalaryInfo();
  const { editedSalaryInfo } = useStore();
  const updateDisplaySalaryInfo = useStore(
    (state) => state.updateDisplaySalaryInfo
  );
  const updateEditedSalaryInfo = useStore(
    (state) => state.updateEditedSalaryInfo
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSalaryInfoMutation.mutate(editedSalaryInfo);
    updateDisplaySalaryInfo(editedSalaryInfo);
    setModalOpen(false);
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
    <>
      <Button
        className="rounded bg-blue-600 py-2 px-4 font-bold text-white hover:bg-blue-800"
        onClick={() => setModalOpen(true)}
      >
        編集
      </Button>

      <Modal opened={modalOpen} onClose={() => setModalOpen(false)}>
        <Text className="text-center">
          {year}/{editedSalaryInfo?.month}
        </Text>

        <form onSubmit={handleSubmit} className="mb-5 text-center">
          <Text className="mb-3 text-pink-500">
            {updateSalaryInfoMutation.error?.data?.zodError &&
              updateSalaryInfoMutation.error.data.zodError.fieldErrors.year &&
              updateSalaryInfoMutation.error.data.zodError.fieldErrors.month}
          </Text>

          <Text>手取り {netIncome}円</Text>

          <Text>収入 {salary}円</Text>

          <NumberInput
            label="基本給"
            value={editedSalaryInfo.basicSalary}
            onChange={(value) => {
              updateEditedSalaryInfo({
                ...editedSalaryInfo,
                basicSalary: value || 0,
              });
            }}
            error={
              updateSalaryInfoMutation.error?.data?.zodError &&
              updateSalaryInfoMutation.error.data.zodError.fieldErrors
                .basicSalary
            }
            hideControls
          />

          <NumberInput
            label="残業代"
            value={editedSalaryInfo.overtimePay}
            onChange={(value) => {
              updateEditedSalaryInfo({
                ...editedSalaryInfo,
                overtimePay: value || 0,
              });
            }}
            error={
              updateSalaryInfoMutation.error?.data?.zodError &&
              updateSalaryInfoMutation.error.data.zodError.fieldErrors
                .overtimePay
            }
            hideControls
          />

          <NumberInput
            label="各種手当"
            value={editedSalaryInfo.allowances}
            onChange={(value) => {
              updateEditedSalaryInfo({
                ...editedSalaryInfo,
                allowances: value || 0,
              });
            }}
            error={
              updateSalaryInfoMutation.error?.data?.zodError &&
              updateSalaryInfoMutation.error.data.zodError.fieldErrors
                .allowances
            }
            hideControls
          />

          <NumberInput
            label="ボーナス"
            value={editedSalaryInfo.bonus}
            onChange={(value) => {
              updateEditedSalaryInfo({
                ...editedSalaryInfo,
                bonus: value || 0,
              });
            }}
            error={
              updateSalaryInfoMutation.error?.data?.zodError &&
              updateSalaryInfoMutation.error.data.zodError.fieldErrors.bonus
            }
            hideControls
          />

          <NumberInput
            label="その他"
            value={editedSalaryInfo.otherSalary}
            onChange={(value) => {
              updateEditedSalaryInfo({
                ...editedSalaryInfo,
                otherSalary: value || 0,
              });
            }}
            error={
              updateSalaryInfoMutation.error?.data?.zodError &&
              updateSalaryInfoMutation.error.data.zodError.fieldErrors
                .otherSalary
            }
            hideControls
          />

          <Text>控除 {deduction}円</Text>

          <NumberInput
            label="所得税"
            value={editedSalaryInfo.incomeTax}
            onChange={(value) => {
              updateEditedSalaryInfo({
                ...editedSalaryInfo,
                incomeTax: value || 0,
              });
            }}
            error={
              updateSalaryInfoMutation.error?.data?.zodError &&
              updateSalaryInfoMutation.error.data.zodError.fieldErrors.incomeTax
            }
            hideControls
          />

          <NumberInput
            label="住民税"
            value={editedSalaryInfo.residentTax}
            onChange={(value) => {
              updateEditedSalaryInfo({
                ...editedSalaryInfo,
                residentTax: value || 0,
              });
            }}
            error={
              updateSalaryInfoMutation.error?.data?.zodError &&
              updateSalaryInfoMutation.error.data.zodError.fieldErrors
                .residentTax
            }
            hideControls
          />

          <NumberInput
            label="健康保険料"
            value={editedSalaryInfo.healthInsurancePremium}
            onChange={(value) => {
              updateEditedSalaryInfo({
                ...editedSalaryInfo,
                healthInsurancePremium: value || 0,
              });
            }}
            error={
              updateSalaryInfoMutation.error?.data?.zodError &&
              updateSalaryInfoMutation.error.data.zodError.fieldErrors
                .healthInsurancePremium
            }
            hideControls
          />

          <NumberInput
            label="年金保険料"
            value={editedSalaryInfo.annuityPrice}
            onChange={(value) => {
              updateEditedSalaryInfo({
                ...editedSalaryInfo,
                annuityPrice: value || 0,
              });
            }}
            error={
              updateSalaryInfoMutation.error?.data?.zodError &&
              updateSalaryInfoMutation.error.data.zodError.fieldErrors
                .annuityPrice
            }
            hideControls
          />

          <NumberInput
            label="雇用保険料"
            value={editedSalaryInfo.employmentInsurancePremium}
            onChange={(value) => {
              updateEditedSalaryInfo({
                ...editedSalaryInfo,
                employmentInsurancePremium: value || 0,
              });
            }}
            error={
              updateSalaryInfoMutation.error?.data?.zodError &&
              updateSalaryInfoMutation.error.data.zodError.fieldErrors
                .employmentInsurancePremium
            }
            hideControls
          />

          <NumberInput
            label="労働組合費"
            value={editedSalaryInfo.federalLawPermits}
            onChange={(value) => {
              updateEditedSalaryInfo({
                ...editedSalaryInfo,
                federalLawPermits: value || 0,
              });
            }}
            error={
              updateSalaryInfoMutation.error?.data?.zodError &&
              updateSalaryInfoMutation.error.data.zodError.fieldErrors
                .federalLawPermits
            }
            hideControls
          />

          <NumberInput
            label="その他"
            value={editedSalaryInfo.otherDeductin}
            onChange={(value) => {
              updateEditedSalaryInfo({
                ...editedSalaryInfo,
                otherDeductin: value || 0,
              });
            }}
            error={
              updateSalaryInfoMutation.error?.data?.zodError &&
              updateSalaryInfoMutation.error.data.zodError.fieldErrors
                .otherDeductin
            }
            hideControls
          />

          <Button
            className="mt-6 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            type="submit"
          >
            更新
          </Button>

          {updateSalaryInfoMutation.isLoading && (
            <Text className="mb-2 text-green-500">
              Mutation under process...
            </Text>
          )}
        </form>
      </Modal>
    </>
  );
};
export default UpdateSalalyInfoModal;
