import { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import { Layout } from "../../../components/Layout";
import type { FormEvent } from "react";
import useStore from "../../../store/salaryInfo";
import { useMutateSalaryInfo } from "../../../hooks/useMutateSalaryInfo";
import { NumberInput, Button, Text, Paper } from "@mantine/core";

const SingleSalaryInfoPage: NextPage = () => {
  const router = useRouter();
  const { year, salaryInfoId } = router.query;
  const { data, isLoading, error } =
    trpc.salaryInfo.getSingleSalaryInfo.useQuery({
      salaryInfoId: salaryInfoId as string,
    });
  const { updateSalaryInfoMutation } = useMutateSalaryInfo();
  const { editedSalaryInfo } = useStore();
  const update = useStore((state) => state.updateEditedSalaryInfo);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSalaryInfoMutation.mutate(editedSalaryInfo);
  };

  useEffect(() => {
    update({
      id: data?.id || "",
      salaryInfoId: data?.id || "",
      month: data?.month || 0,
      basicSalary: data?.basicSalary || 0,
      overtimePay: data?.overtimePay || 0,
      allowances: data?.allowances || 0,
      bonus: data?.bonus || 0,
      otherSalary: data?.otherSalary || 0,
      incomeTax: data?.incomeTax || 0,
      residentTax: data?.residentTax || 0,
      healthInsurancePremium: data?.healthInsurancePremium || 0,
      annuityPrice: data?.annuityPrice || 0,
      employmentInsurancePremium: data?.employmentInsurancePremium || 0,
      federalLawPermits: data?.federalLawPermits || 0,
      otherDeductin: data?.otherDeductin || 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (updateSalaryInfoMutation.isSuccess) {
      router.push(`/${year}/${salaryInfoId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSalaryInfoMutation.isSuccess]);

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

  if (isLoading) {
    return <Layout title="Task Detail">Loading single task...</Layout>;
  }
  if (error) {
    return <Layout title="Task Detail">{error.message}</Layout>;
  }

  return (
    <Layout title="Task Detail">
      <Paper className="w-90 p-5 text-center">
        <Text>
          {year}/{data?.month}
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
              update({
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
              update({
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
              update({
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
              update({
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
              update({
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

          <Text>控除　{deduction}円</Text>

          <NumberInput
            label="所得税"
            value={editedSalaryInfo.incomeTax}
            onChange={(value) => {
              update({
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
              update({
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
              update({
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
              update({
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
              update({
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
              update({
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
              update({
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
      </Paper>
    </Layout>
  );
};
export default SingleSalaryInfoPage;
