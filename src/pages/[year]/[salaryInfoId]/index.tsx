import Link from "next/link";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { trpc } from "../../../utils/trpc";
import { Layout } from "../../../components/Layout";
import { Text, Paper, Table } from "@mantine/core";

const SingleSalaryInfoPage: NextPage = () => {
  const router = useRouter();
  const { year, salaryInfoId } = router.query;
  const { data, isLoading, error } =
    trpc.salaryInfo.getSingleSalaryInfo.useQuery({
      salaryInfoId: salaryInfoId as string,
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

  const salaryList = [
    { title: "基本給", value: data?.basicSalary },
    { title: "残業代", value: data?.overtimePay },
    { title: "手当", value: data?.allowances },
    { title: "賞与", value: data?.bonus },
    { title: "その他", value: data?.otherSalary },
  ];

  const deductionList = [
    { title: "所得税", value: data?.incomeTax },
    { title: "住民税", value: data?.residentTax },
    { title: "健康保険料", value: data?.healthInsurancePremium },
    { title: "年金料", value: data?.annuityPrice },
    { title: "雇用保険料", value: data?.employmentInsurancePremium },
    { title: "法定手当", value: data?.federalLawPermits },
    { title: "その他控除", value: data?.otherDeductin },
  ];

  if (isLoading) {
    return <Layout title="Task Detail">Loading single task...</Layout>;
  }
  if (error) {
    return <Layout title="Task Detail">{error.message}</Layout>;
  }
  return (
    <Layout title="Task Detail">
      <Paper className="w-90 p-5 text-center">
        <Text className="mb-3 text-xl font-bold text-blue-600">
          {year + "/" + data?.month}
          <Link href={`/${year}/${data?.id}/edit`}>
            <span className="text-blue-400 hover:text-blue-700">編集</span>
          </Link>
        </Text>
        <Text className="my-1 text-xl font-bold">手取り {netIncome}円</Text>

        <Text className="my-1 text-lg text-red-600">収入 {salary}円</Text>

        <Table>
          <tbody>
            {salaryList.map((element) => (
              <tr key={element.title}>
                <td className="text-left">{element.title}</td>
                <td className="text-right">
                  {element.value?.toLocaleString() + "円"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Text className="my-1  text-lg text-blue-600">控除 {deduction}円</Text>
        <Table>
          <tbody>
            {deductionList.map((element) => (
              <tr key={element.title}>
                <td className="text-left">{element.title}</td>
                <td className="text-right">
                  {element.value?.toLocaleString() + "円"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Text className="my-1 text-sm">
          作成日 {data && dayjs(data.createdAt).format("YYYY-MM-DD HH:mm:ss")}
        </Text>
        <Text className="my-1 text-sm">
          更新日 {data && dayjs(data.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
        </Text>

        <Link href={`/`}>
          <Text className="text-blue-400 hover:text-blue-700">戻る</Text>
        </Link>
      </Paper>
    </Layout>
  );
};
export default SingleSalaryInfoPage;
