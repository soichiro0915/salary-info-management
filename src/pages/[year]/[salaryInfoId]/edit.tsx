import { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import { Layout } from "../../../components/Layout";
import type { FormEvent } from "react";
import useStore from "../../../store/salaryInfo";
import { useMutateSalaryInfo } from "../../../hooks/useMutateSalaryInfo";

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
    updateSalaryInfoMutation.mutate({
      id: editedSalaryInfo.id,
      salaryInfoId: editedSalaryInfo.id,
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
      <p>
        {year}/{data?.month}
      </p>
      <form onSubmit={handleSubmit} className="mb-5 text-center">
        <p className="mb-3 text-pink-500">
          {updateSalaryInfoMutation.error?.data?.zodError &&
            updateSalaryInfoMutation.error.data.zodError.fieldErrors.year &&
            updateSalaryInfoMutation.error.data.zodError.fieldErrors.month}
        </p>

        <h1>手取り {netIncome}円</h1>

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
          {updateSalaryInfoMutation.error?.data?.zodError &&
            updateSalaryInfoMutation.error.data.zodError.fieldErrors
              .basicSalary}
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
          {updateSalaryInfoMutation.error?.data?.zodError &&
            updateSalaryInfoMutation.error.data.zodError.fieldErrors
              .overtimePay}
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
          {updateSalaryInfoMutation.error?.data?.zodError &&
            updateSalaryInfoMutation.error.data.zodError.fieldErrors.allowances}
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
          {updateSalaryInfoMutation.error?.data?.zodError &&
            updateSalaryInfoMutation.error.data.zodError.fieldErrors.bonus}
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
          {updateSalaryInfoMutation.error?.data?.zodError &&
            updateSalaryInfoMutation.error.data.zodError.fieldErrors
              .otherSalary}
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
          {updateSalaryInfoMutation.error?.data?.zodError &&
            updateSalaryInfoMutation.error.data.zodError.fieldErrors.incomeTax}
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
          {updateSalaryInfoMutation.error?.data?.zodError &&
            updateSalaryInfoMutation.error.data.zodError.fieldErrors
              .residentTax}
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
          {updateSalaryInfoMutation.error?.data?.zodError &&
            updateSalaryInfoMutation.error.data.zodError.fieldErrors
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
          {updateSalaryInfoMutation.error?.data?.zodError &&
            updateSalaryInfoMutation.error.data.zodError.fieldErrors
              .annuityPrice}
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
          {updateSalaryInfoMutation.error?.data?.zodError &&
            updateSalaryInfoMutation.error.data.zodError.fieldErrors
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
          {updateSalaryInfoMutation.error?.data?.zodError &&
            updateSalaryInfoMutation.error.data.zodError.fieldErrors
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
          {updateSalaryInfoMutation.error?.data?.zodError &&
            updateSalaryInfoMutation.error.data.zodError.fieldErrors
              .otherDeductin}
        </p>

        <button className="rounded bg-indigo-600 py-1 px-3 text-white hover:bg-opacity-80 focus:outline-none">
          更新
        </button>

        {updateSalaryInfoMutation.isLoading && (
          <p className="mb-2 text-green-500">Mutation under process...</p>
        )}
      </form>
    </Layout>
  );
};
export default SingleSalaryInfoPage;
