import type { FormEvent } from "react";
import dayjs from "dayjs";
import useTermStore from "../../store/term";
import { useMutateSalaryInfo } from "../../hooks/useMutateSalaryInfo";
import { useMutateTerm } from "../../hooks/useMutateTerm";

const nowYear = dayjs().year();

export const TermRegister = () => {
  const { createTermMutation } = useMutateTerm();
  const { createSalaryInfoMutation } = useMutateSalaryInfo();
  const { editedTerm } = useTermStore();

  const update = useTermStore((state) => state.updateEditedTerm);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTermMutation.mutate({
      year: editedTerm.year,
    });
    [...Array(12)]
      .map((_, i) => i + 1)
      .map((month) => {
        createSalaryInfoMutation.mutate({
          month: month,
          termId: createTermMutation.data?.id || "",
        });
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5 text-center">
      {(createTermMutation.isLoading || createSalaryInfoMutation.isLoading) && (
        <p className="mb-2 text-green-500">Mutation under process...</p>
      )}
      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        何年のデータを追加しますか？
      </label>
      <select
        name="year"
        onChange={(e) => {
          update({
            ...editedTerm,
            year: parseInt(e.target.value),
          });
        }}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        <option selected>-</option>
        {[...Array(50)]
          .map((_, i) => nowYear - i)
          .map((year) => (
            <option value={year} key={year}>
              {year}年
            </option>
          ))}
      </select>
      <p className="mb-3 text-red-500">
        {createTermMutation.error?.data?.zodError &&
          createTermMutation.error.data.zodError.fieldErrors.yea &&
          createSalaryInfoMutation.error?.data?.zodError &&
          createSalaryInfoMutation.error.data.zodError.fieldErrors.yearr}
      </p>
      {(createTermMutation.error?.data?.httpStatus === 500 ||
        createSalaryInfoMutation.error?.data?.httpStatus === 500) && (
        <p className="mb-3 text-red-500"> 追加できませんでした。</p>
      )}
      <p className="text-gray-500">注意　</p>
      <p className="mb-3 text-sm text-gray-500">
        重複する年度は追加することができません。
      </p>
      <button className="rounded bg-indigo-600 py-1 px-3 text-white hover:bg-opacity-80 focus:outline-none">
        追加
      </button>
    </form>
  );
};
