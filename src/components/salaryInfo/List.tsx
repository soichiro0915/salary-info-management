import { trpc } from "../../utils/trpc";
import { SalaryInfoItem } from "./Item";

export const SalaryInfoList = () => {
  const { data, isLoading, error } = trpc.salaryInfo.getSalaryInfos.useQuery();
  
  if (isLoading) {
    return <p>Loading task list...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <ul>
      {data?.map((salaryInfo) => (
        <SalaryInfoItem
          key={salaryInfo.id}
          salaryInfoId={salaryInfo.id}
          month={salaryInfo.month}
          basicSalary={salaryInfo.basicSalary || 0}
          overtimePay={salaryInfo.overtimePay || 0}
          allowances={salaryInfo.allowances || 0}
          bonus={salaryInfo.bonus || 0}
          otherSalary={salaryInfo.otherSalary || 0}
          incomeTax={salaryInfo.incomeTax || 0}
          residentTax={salaryInfo.residentTax || 0}
          healthInsurancePremium={salaryInfo.healthInsurancePremium || 0}
          annuityPrice={salaryInfo.annuityPrice || 0}
          employmentInsurancePremium={salaryInfo.employmentInsurancePremium || 0}
          federalLawPermits={salaryInfo.federalLawPermits || 0}
          otherDeductin={salaryInfo.otherDeductin || 0}
        />
      ))}
    </ul>
  );
};
