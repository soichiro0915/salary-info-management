import type { FC } from "react";
import Link from "next/link";
import useStore from "../../store/salaryInfo";
import type { updateSalaryInfoInput } from "../../schema/salaryInfo";
import { useMutateSalaryInfo } from "../../hooks/useMutateSalaryInfo";

export const SalaryInfoItem: FC<updateSalaryInfoInput> = ({
  salaryInfoId,
  year,
  month,
  basicSalary,
  overtimePay,
  allowances,
  bonus,
  otherSalary,
  incomeTax,
  residentTax,
  healthInsurancePremium,
  annuityPrice,
  employmentInsurancePremium,
  federalLawPermits,
  otherDeductin,
}) => {
  const update = useStore((state) => state.updateEditedSalaryInfo);
  const { deleteSalaryInfoMutation } = useMutateSalaryInfo();
  return (
    <li>
      <div className="flex justify-between">
        <Link href={`/salaryInfo/${salaryInfoId}`} className="cursor-pointer">
          <p className="text-red-600 hover:text-opacity-50">
            {year + "/" + month}
          </p>
        </Link>

        <div className="ml-10">
          <button
            className="mx-1 h-5 cursor-pointer text-blue-600 hover:text-opacity-50"
            onClick={() => {
              update({
                salaryInfoId,
                year,
                month,
                basicSalary,
                overtimePay,
                allowances,
                bonus,
                otherSalary,
                incomeTax,
                residentTax,
                healthInsurancePremium,
                annuityPrice,
                employmentInsurancePremium,
                federalLawPermits,
                otherDeductin,
              });
            }}
          >
            更新
          </button>
          <button
            className="mx-1 h-5 cursor-pointer text-blue-600 hover:text-opacity-50"
            onClick={() => {
              deleteSalaryInfoMutation.mutate({ salaryInfoId });
            }}
          >
            削除
          </button>
        </div>
      </div>
      {deleteSalaryInfoMutation.isLoading && (
        <p className="mb-2 text-green-500">Mutation under process...</p>
      )}
    </li>
  );
};
