import useStore from "../store/salaryInfo";
import { trpc } from "../utils/trpc";

export const useMutateSalaryInfo = () => {
  // this is the trpc server context
  const utils = trpc.useContext();

  const reset = useStore((state) => state.resetEditedSalaryInfo);

  const createSalaryInfoMutation = trpc.salaryInfo.createSalaryInfo.useMutation(
    {
      //成功時にキャッシュを更新する
      onSuccess: (res) => {
        const previousSalaryInfos = utils.salaryInfo.getSalaryInfos.getData();
        if (previousSalaryInfos) {
          utils.salaryInfo.getSalaryInfos.setData(undefined, [
            res,
            ...previousSalaryInfos,
          ]);
        }
      },
    }
  );

  const updateSalaryInfoMutation = trpc.salaryInfo.updateSalaryInfo.useMutation(
    {
      //成功時にキャッシュを更新する
      onSuccess: (res) => {
        const previousSalaryInfos = utils.salaryInfo.getSalaryInfos.getData();
        if (previousSalaryInfos) {
          utils.salaryInfo.getSalaryInfos.setData(
            undefined,
            previousSalaryInfos.map((salary) =>
              salary.id === res.id ? res : salary
            )
          );
        }
      },
    }
  );

  const deleteSalaryInfoMutation = trpc.salaryInfo.deleteSalaryInfo.useMutation(
    {
      //成功時にキャッシュを更新する
      onSuccess: (_, variables) => {
        const previousSalaryInfos = utils.salaryInfo.getSalaryInfos.getData();
        if (previousSalaryInfos) {
          utils.salaryInfo.getSalaryInfos.setData(
            undefined,
            previousSalaryInfos.filter(
              (salaryInfo) => salaryInfo.id !== variables.salaryInfoId
            )
          );
        }
        //編集中のデータをリセットする
        reset();
      },
    }
  );

  return {
    createSalaryInfoMutation,
    updateSalaryInfoMutation,
    deleteSalaryInfoMutation,
  };
};
