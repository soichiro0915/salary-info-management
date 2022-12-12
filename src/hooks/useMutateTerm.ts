import useStore from "../store/term";
import { trpc } from "../utils/trpc";

export const useMutateTerm = () => {
  // this is the trpc server context
  const utils = trpc.useContext();

  const reset = useStore((state) => state.resetEditedTerm);
  const updateSelectedTerm = useStore((state) => state.updateSelectedTerm);

  const createTermMutation = trpc.term.createTerm.useMutation({
    //成功時にキャッシュを更新する
    onSuccess: (res) => {
      const previousTerms = utils.term.getTerms.getData();
      if (previousTerms) {
        utils.term.getTerms.setData(undefined, [res, ...previousTerms]);
      }
      //編集中のデータをリセットする
      reset();
      updateSelectedTerm({ termId: res.id, year: res.year });
    },
  });

  const updateTermMutation = trpc.term.updateTerm.useMutation({
    //成功時にキャッシュを更新する
    onSuccess: (res) => {
      const previousTerms = utils.term.getTerms.getData();
      if (previousTerms) {
        utils.term.getTerms.setData(
          undefined,
          previousTerms.map((term) => (term.id === res.id ? res : term))
        );
      }
      //編集中のデータをリセットする
      reset();
    },
  });

  const deleteTermMutation = trpc.term.deleteTerm.useMutation({
    //成功時にキャッシュを更新する
    onSuccess: (_, variables) => {
      const previousTerms = utils.term.getTerms.getData();
      if (previousTerms) {
        utils.term.getTerms.setData(
          undefined,
          previousTerms.filter((term) => term.id !== variables.termId)
        );
      }
      //編集中のデータをリセットする
      reset();
    },
  });

  return {
    createTermMutation,
    updateTermMutation,
    deleteTermMutation,
  };
};
