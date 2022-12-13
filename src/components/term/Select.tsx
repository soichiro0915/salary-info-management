import { trpc } from "../../utils/trpc";
import useTermStore from "../../store/term";
import useSalaryInfoStore from "../../store/salaryInfo";
import { TermItem } from "./Item";
import { Text, Paper } from "@mantine/core";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TermSelect = (props: any) => {
  const { data, isLoading, error } = trpc.term.getTerms.useQuery();
  const { selectedTerm } = useTermStore();
  const select = useTermStore((state) => state.updateSelectedTerm);
  const selectSalaryInfos = useSalaryInfoStore(
    (state) => state.updateSelectedSalaryInfos
  );

  if (isLoading) {
    return <Text className="text-center">Loading task list...</Text>;
  }
  if (error) {
    return <Text className="text-center">{error.message}</Text>;
  }
  return (
    <Paper className="w-auto p-5 text-center">
      <select
        onChange={(e) => {
          select({
            ...selectedTerm,
            year: parseInt(e.target.value),
            termId:
              data?.find((term) => term.year === parseInt(e.target.value))
                ?.id || "",
          });
          selectSalaryInfos(
            props.salalyInfos.filter(
              (salaryInfo: { termId: string; year: number }) =>
                salaryInfo.termId ===
                data?.find((term) => term.year === parseInt(e.target.value))?.id
            )
          );
        }}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        <option selected>-</option>
        {data?.map((term) => (
          <option value={term.year} key={term.year}>
            {term.year}年
          </option>
        ))}
      </select>

      <TermItem />
    </Paper>
  );
};
