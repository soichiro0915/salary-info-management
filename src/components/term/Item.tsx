import type { FC } from "react";
import Link from "next/link";
import useTermStore from "../../store/term";
import useSalaryInfoStore from "../../store/salaryInfo";

export const TermItem: FC = () => {
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

  return (
    <>
      <div className="flex w-full justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div>
          <p>収入</p>
          <p>{salary?.toLocaleString()}円</p>
        </div>
        <div>
          <p>控除</p>
          <p>{deduction?.toLocaleString()}円</p>
        </div>
        <div>
          <p>手取り</p>
          <p>{netIncome.toLocaleString()}円</p>
        </div>
      </div>

      <div className="flex">
        <p className="text-blue-500">月</p>
        <p>収入</p>
        <p>控除</p>
        <p>手取り</p>
      </div>

      {[...Array(12)]
        .map((_, i) => i + 1)
        .map((month) => {
          return selectedSalaryInfos?.map((salaryInfo) => {
            return (
              salaryInfo.month === month && (
                <Link
                  key={month}
                  href={"/" + selectedTerm.year + "/" + salaryInfo.id}
                  className="flex cursor-pointer"
                >
                  <p className="text-red-600 hover:text-opacity-50">
                    {month}月
                  </p>
                  <p>
                    {(
                      salaryInfo.basicSalary +
                      salaryInfo.overtimePay +
                      salaryInfo.allowances +
                      salaryInfo.bonus +
                      salaryInfo.otherSalary
                    ).toLocaleString()}
                    円
                  </p>
                  <p>
                    {(
                      salaryInfo.incomeTax +
                      salaryInfo.residentTax +
                      salaryInfo.healthInsurancePremium +
                      salaryInfo.annuityPrice +
                      salaryInfo.employmentInsurancePremium +
                      salaryInfo.federalLawPermits +
                      salaryInfo.otherDeductin
                    ).toLocaleString()}
                    円
                  </p>
                  <p>
                    {(
                      salaryInfo.basicSalary +
                      salaryInfo.overtimePay +
                      salaryInfo.allowances +
                      salaryInfo.bonus +
                      salaryInfo.otherSalary -
                      (salaryInfo.incomeTax +
                        salaryInfo.residentTax +
                        salaryInfo.healthInsurancePremium +
                        salaryInfo.annuityPrice +
                        salaryInfo.employmentInsurancePremium +
                        salaryInfo.federalLawPermits +
                        salaryInfo.otherDeductin)
                    ).toLocaleString()}
                    円
                  </p>
                </Link>
              )
            );
          });
        })}
    </>
  );
};
