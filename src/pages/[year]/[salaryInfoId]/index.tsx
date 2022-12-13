import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Text, Paper, Table, Flex, Grid } from "@mantine/core";
import dayjs from "dayjs";

import { trpc } from "../../../utils/trpc";
import { Layout } from "../../../components/Layout";
import useStore from "../../../store/salaryInfo";

import type { NextPage } from "next";

import UpdateSalalyInfoModal from "../../../components/salaryInfo/UpdateModal";

const SingleSalaryInfoPage: NextPage = () => {
  const router = useRouter();
  const { year, salaryInfoId } = router.query;
  const { data, isLoading, error } =
    trpc.salaryInfo.getSingleSalaryInfo.useQuery({
      salaryInfoId: salaryInfoId as string,
    });
  const { diplaySalalyInfo } = useStore();
  const updateEditedSalaryInfo = useStore(
    (state) => state.updateEditedSalaryInfo
  );
  const updateDisplaySalaryInfo = useStore(
    (state) => state.updateDisplaySalaryInfo
  );

  useEffect(() => {
    if (!isLoading && data) {
      updateEditedSalaryInfo({
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
      updateDisplaySalaryInfo({
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const salary =
    diplaySalalyInfo.basicSalary +
    diplaySalalyInfo.overtimePay +
    diplaySalalyInfo.allowances +
    diplaySalalyInfo.bonus +
    diplaySalalyInfo.otherSalary;
  const deduction =
    diplaySalalyInfo.incomeTax +
    diplaySalalyInfo.residentTax +
    diplaySalalyInfo.healthInsurancePremium +
    diplaySalalyInfo.annuityPrice +
    diplaySalalyInfo.employmentInsurancePremium +
    diplaySalalyInfo.federalLawPermits +
    diplaySalalyInfo.otherDeductin;
  const netIncome = salary - deduction;

  const salaryList = [
    { title: "基本給", value: diplaySalalyInfo.basicSalary },
    { title: "残業代", value: diplaySalalyInfo.overtimePay },
    { title: "手当", value: diplaySalalyInfo.allowances },
    { title: "賞与", value: diplaySalalyInfo.bonus },
    { title: "その他", value: diplaySalalyInfo.otherSalary },
  ];

  const deductionList = [
    { title: "所得税", value: diplaySalalyInfo.incomeTax },
    { title: "住民税", value: diplaySalalyInfo.residentTax },
    { title: "健康保険料", value: diplaySalalyInfo.healthInsurancePremium },
    { title: "年金料", value: diplaySalalyInfo.annuityPrice },
    {
      title: "雇用保険料",
      value: diplaySalalyInfo.employmentInsurancePremium,
    },
    { title: "法定手当", value: diplaySalalyInfo.federalLawPermits },
    { title: "その他控除", value: diplaySalalyInfo.otherDeductin },
  ];

  if (isLoading) {
    return <Layout title="Task Detail">Loading single task...</Layout>;
  }
  if (error) {
    return <Layout title="Task Detail">{error.message}</Layout>;
  }
  return (
    <Layout title="salalyInfo Detail">
      <Paper className="p-5 text-center">
        <Flex gap="md" justify="center" align="center">
          <Text className="text-xl font-bold text-blue-600">
            {year + "/" + data?.month}
          </Text>
          <UpdateSalalyInfoModal />
        </Flex>

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
          作成日 {data && dayjs(data?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
        </Text>
        <Text className="my-1 text-sm">
          更新日 {data && dayjs(data?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
        </Text>
        <Link href={`/`}>
          <Text className="text-blue-400 hover:text-blue-700">戻る</Text>
        </Link>
      </Paper>
    </Layout>
  );
};
export default SingleSalaryInfoPage;
