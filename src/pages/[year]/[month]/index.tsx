import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Text, Paper, Table, Flex } from "@mantine/core";
import dayjs from "dayjs";

import { trpc } from "../../../utils/trpc";
import { Layout } from "../../../components/Layout";
import useSalalyInfoStore from "../../../store/salaryInfo";
import useTermStore from "../../../store/term";

import type { NextPage } from "next";

import UpdateSalalyInfoModal from "../../../components/salaryInfo/UpdateModal";

const SingleSalaryInfoPage: NextPage = () => {
  const router = useRouter();
  const { year, month } = router.query;
  const { selectedTerm } = useTermStore();
  const { data, isLoading, error } =
    trpc.salaryInfo.getSingleSalalyInfoByTermIdAndMonth.useQuery({
      termId: selectedTerm.termId as cuid,
      month: parseInt(month) as number,
    });
  const { diplaySalalyInfo } = useSalalyInfoStore();
  const updateEditedSalaryInfo = useSalalyInfoStore(
    (state) => state.updateEditedSalaryInfo
  );
  const updateDisplaySalaryInfo = useSalalyInfoStore(
    (state) => state.updateDisplaySalaryInfo
  );

  useEffect(() => {
    if (!isLoading && data) {
      updateEditedSalaryInfo({
        ...data,
      });
      updateDisplaySalaryInfo({
        ...data,
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
    { title: "労働組合費", value: diplaySalalyInfo.federalLawPermits },
    { title: "その他控除", value: diplaySalalyInfo.otherDeductin },
  ];

  if (isLoading) {
    return <Layout title="Task Detail">Loading single task...</Layout>;
  }
  if (error) {
    return (
      <Layout title="Task Detail">
        <Text>情報取得に失敗しました。</Text>
        <Link href={`/`}>
          <Text className="text-blue-400 hover:text-blue-700">Home</Text>
        </Link>
      </Layout>
    );
  }
  return (
    <Layout title="salalyInfo Detail">
      <Paper className="p-5 text-center">
        <Flex gap="md" justify="center" align="center">
          <Text className="text-xl font-bold text-blue-600">
            {year + "/" + month}
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
          <Text className="text-blue-400 hover:text-blue-700">Home</Text>
        </Link>
      </Paper>
    </Layout>
  );
};
export default SingleSalaryInfoPage;
