import type { FC } from "react";
import Link from "next/link";
import type { updateTermInput } from "../../schema/term";
import { useMutateTerm } from "../../hooks/useMutateTerm";

export const TermItem: FC<updateTermInput> = ({ termId, year }) => {
  const { deleteTermMutation } = useMutateTerm();
  return (
    <li>
      <div className="flex justify-between">
        <Link href={`/term/${termId}`} className="cursor-pointer">
          <p className="text-red-600 hover:text-opacity-50">{year}年度</p>
        </Link>

        <div className="ml-10">
          <button
            className="mx-1 h-5 cursor-pointer text-blue-600 hover:text-opacity-50"
            onClick={() => {
              deleteTermMutation.mutate({ termId });
            }}
          >
            削除
          </button>
        </div>
      </div>
      {deleteTermMutation.isLoading && (
        <p className="mb-2 text-green-500">Mutation under process...</p>
      )}
    </li>
  );
};
