import type { FC } from "react";
import { useRouter } from "next/router";
import useTermStore from "../../store/term";
import useSalaryInfoStore from "../../store/salaryInfo";
import { Text, Button, Table } from "@mantine/core";

export const TermItem: FC = () => {
  const router = useRouter();
  const { selectedTerm } = useTermStore();
  const { selectedSalaryInfos } = useSalaryInfoStore();

  const salary = selectedSalaryInfos?.reduce(
    (previous, current) =>
      previous +
      current.basicSalary +
      current.overtimePay +
      current.allowances +
      current.bonus +
      current.otherSalary,
    0
  );
  const deduction = selectedSalaryInfos?.reduce(
    (previous, current) =>
      previous +
      current.incomeTax +
      current.residentTax +
      current.healthInsurancePremium +
      current.annuityPrice +
      current.employmentInsurancePremium +
      current.federalLawPermits +
      current.otherDeductin,
    0
  );
  const netIncome = salary - deduction;

  const list = [...Array(12)]
    .map((_, i) => i + 1)
    .map((month) => {
      return selectedSalaryInfos?.find(
        (salaryInfo) => salaryInfo.month === month
      );
    })
    .map((salaryInfo) => {
      if (!salaryInfo) {
        return;
      }
      return {
        salaryInfoId: salaryInfo?.id || "",
        month: salaryInfo?.month || 0,
        salary: (
          (salaryInfo?.basicSalary || 0) +
          (salaryInfo?.overtimePay || 0) +
          (salaryInfo?.allowances || 0) +
          (salaryInfo?.bonus || 0) +
          (salaryInfo?.otherSalary || 0)
        ).toLocaleString(),
        deduction: (
          (salaryInfo?.incomeTax || 0) +
          (salaryInfo?.residentTax || 0) +
          (salaryInfo?.healthInsurancePremium || 0) +
          (salaryInfo?.annuityPrice || 0) +
          (salaryInfo?.employmentInsurancePremium || 0) +
          (salaryInfo?.federalLawPermits || 0) +
          (salaryInfo?.otherDeductin || 0)
        ).toLocaleString(),
        netIncome: (
          (salaryInfo?.incomeTax || 0) +
          (salaryInfo?.residentTax || 0) +
          (salaryInfo?.healthInsurancePremium || 0) +
          (salaryInfo?.annuityPrice || 0) +
          (salaryInfo?.employmentInsurancePremium || 0) +
          (salaryInfo?.federalLawPermits || 0) +
          (salaryInfo?.otherDeductin || 0) -
          ((salaryInfo?.incomeTax || 0) +
            (salaryInfo?.residentTax || 0) +
            (salaryInfo?.healthInsurancePremium || 0) +
            (salaryInfo?.annuityPrice || 0) +
            (salaryInfo?.employmentInsurancePremium || 0) +
            (salaryInfo?.federalLawPermits || 0) +
            (salaryInfo?.otherDeductin || 0))
        ).toLocaleString(),
      };
    })
    .filter(Boolean);

  return (
    <>
      <div className="flex w-full justify-around rounded-lg border border-gray-200 bg-white py-2 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div>
          <Text>??????</Text>
          <Text>{salary?.toLocaleString()}???</Text>
        </div>
        <div>
          <Text>??????</Text>
          <Text>{deduction?.toLocaleString()}???</Text>
        </div>
        <div>
          <Text>?????????</Text>
          <Text>{netIncome.toLocaleString()}???</Text>
        </div>
      </div>
      {list.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th className="text-center">???</th>
              <th className="text-center">??????</th>
              <th>??????</th>
              <th>?????????</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((element) => (
              <tr key={element?.month}>
                <td className="text-center">{element?.month + "???"}</td>
                <td>{element?.salary.toLocaleString() + "???"}</td>
                <td>{element?.deduction.toLocaleString() + "???"}</td>
                <td>{element?.netIncome.toLocaleString() + "???"}</td>
                <td>
                  <Button
                    className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                    onClick={() =>
                      router.push(`/${selectedTerm.year}/${element?.month}`)
                    }
                    disabled={!element?.salaryInfoId}
                  >
                    ??????
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
