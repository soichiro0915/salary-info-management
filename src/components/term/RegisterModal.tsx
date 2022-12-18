import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import useTermStore from "../../store/term";
import { useMutateSalaryInfo } from "../../hooks/useMutateSalaryInfo";
import { useMutateTerm } from "../../hooks/useMutateTerm";
import { Button, Text, Modal } from "@mantine/core";

const nowYear = dayjs().year();

export const TermRegisterModal = () => {
  const [createSalaryInfoFlag, setCreateSalaryInfoFlag] = useState(false);
  const [termCreateModalOpen, setTermCreateModalOpen] = useState(false);

  const { createTermMutation } = useMutateTerm();
  const { createSalaryInfoMutation } = useMutateSalaryInfo();
  const { editedTerm, selectedTerm } = useTermStore();

  const update = useTermStore((state) => state.updateEditedTerm);
  const resetSelectedTerm = useTermStore((state) => state.resetSelectedTerm);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setCreateSalaryInfoFlag(true);
    e.preventDefault();
    createTermMutation.mutate({
      year: editedTerm.year,
    });
  };

  useEffect(() => {
    if (selectedTerm.termId && createSalaryInfoFlag) {
      [...Array(12)]
        .map((_, i) => i + 1)
        .map((month) => {
          createSalaryInfoMutation.mutate({
            month: month,
            termId: selectedTerm.termId || "",
          });
        });
      resetSelectedTerm();
      setCreateSalaryInfoFlag(false);
      setTermCreateModalOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTerm.termId]);

  return (
    <>
      <Button
        className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700 w-full"
        onClick={() => setTermCreateModalOpen(true)}
      >
        +年度追加
      </Button>
      <Modal
        opened={termCreateModalOpen}
        onClose={() => setTermCreateModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="mb-5 text-center">
          {(createTermMutation.isLoading ||
            createSalaryInfoMutation.isLoading) && (
            <Text className="mb-2 text-green-500">
              Mutation under process...
            </Text>
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
          <Text className="mb-3 text-red-500">
            {createTermMutation.error?.data?.zodError &&
              createTermMutation.error.data.zodError.fieldErrors.yea &&
              createSalaryInfoMutation.error?.data?.zodError &&
              createSalaryInfoMutation.error.data.zodError.fieldErrors.yearr}
          </Text>
          {(createTermMutation.error?.data?.httpStatus === 500 ||
            createSalaryInfoMutation.error?.data?.httpStatus === 500) && (
            <Text className="mb-3 text-red-500"> 追加できませんでした。</Text>
          )}
          <Text className="text-gray-500">注意　</Text>
          <Text className="mb-3 text-sm text-gray-500">
            重複する年度は追加することができません。
          </Text>
          <Button
            type="submit"
            className="rounded bg-indigo-600 py-1 px-3 text-white hover:bg-opacity-80 focus:outline-none"
          >
            追加
          </Button>
        </form>
      </Modal>
    </>
  );
};
