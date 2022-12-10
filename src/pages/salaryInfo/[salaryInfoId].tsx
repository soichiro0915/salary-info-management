import Link from "next/link";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { trpc } from "../../utils/trpc";
import { Layout } from "../../components/Layout";

const SingleSalaryInfoPage: NextPage = () => {
  const router = useRouter();
  const salaryInfoId = router.query.salaryInfoId as string;
  const { data, isLoading, error } =
    trpc.salaryInfo.getSingleSalaryInfo.useQuery({
      salaryInfoId,
    });
  const salary =
    (data?.basicSalary || 0) +
    (data?.overtimePay || 0) +
    (data?.allowances || 0) +
    (data?.bonus || 0) +
    (data?.otherSalary || 0);
  const deduction =
    (data?.incomeTax || 0) +
    (data?.residentTax || 0) +
    (data?.healthInsurancePremium || 0) +
    (data?.annuityPrice || 0) +
    (data?.employmentInsurancePremium || 0) +
    (data?.federalLawPermits || 0) +
    (data?.otherDeductin || 0);
  const netIncome = salary - deduction;

  if (isLoading) {
    return <Layout title="Task Detail">Loading single task...</Layout>;
  }
  if (error) {
    return <Layout title="Task Detail">{error.message}</Layout>;
  }
  return (
    <Layout title="Task Detail">
      <p className="mb-3 text-xl font-bold text-blue-600">
        {data?.year + "/" + data?.month}
      </p>
      <p className="my-1 text-xl font-bold">手取り {netIncome}円</p>
      <p className="my-1 text-lg text-red-600">収入 {salary}円</p>
      <p className="my-1">基本給 {data?.basicSalary}円</p>
      <p className="my-1">残業代 {data?.overtimePay}円</p>
      <p className="my-1">各種手当 {data?.allowances}円</p>
      <p className="my-1">ボーナス {data?.bonus}円</p>
      <p className="my-1">その他 {data?.otherSalary}円</p>

      <p className="my-1  text-lg text-blue-600">控除 {deduction}円</p>
      <p className="my-1">所得税 {data?.incomeTax}円</p>
      <p className="my-1">住民税 {data?.residentTax}円</p>
      <p className="my-1">健康保険料 {data?.healthInsurancePremium}円</p>
      <p className="my-1">年金保険料 {data?.annuityPrice}円</p>
      <p className="my-1">雇用保険料 {data?.employmentInsurancePremium}円</p>
      <p className="my-1">労働組合費 {data?.federalLawPermits}円</p>
      <p className="my-1">その他 {data?.otherDeductin}円</p>
      <p className="my-1 text-sm">
        作成日  {data && dayjs(data.createdAt).format("YYYY-MM-DD HH:mm:ss")}
      </p>
      <p className="my-1 text-sm">
        更新日  {data && dayjs(data.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
      </p>
      <Link href={`/`}>
        <p className="text-blue-400 hover:text-blue-700">戻る</p>
      </Link>
    </Layout>
  );
};
export default SingleSalaryInfoPage;
