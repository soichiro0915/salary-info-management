import { Text, Paper } from "@mantine/core";

import { TermItem } from "./Item";
import useTermStore from "../../store/term";
import useSalaryInfoStore from "../../store/salaryInfo";
import { trpc } from "../../utils/trpc";

export const TermSelect = () => {
  const { data, isLoading, error } =
    trpc.term.getTermsIncludeSalalyInfos.useQuery();
  const { selectedTerm } = useTermStore();
  const selectTerm = useTermStore((state) => state.updateSelectedTerm);
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
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        onChange={(e) => {
          selectTerm({
            ...selectedTerm,
            year: parseInt(e.target.value),
            termId:
              data?.find((term) => term.year === parseInt(e.target.value))
                ?.id || "",
          });
          selectSalaryInfos(
            data?.find((term) => term.year === parseInt(e.target.value))
              .salaryInfo
          );
        }}
        defaultValue={selectedTerm.year}
      >
        <option disabled value="0">
          年度を選択してください
        </option>
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
