import { trpc } from "../../utils/trpc";
import { TermItem } from "./Item";

export const TermList = () => {
  const { data, isLoading, error } = trpc.term.getTerms.useQuery();
  
  if (isLoading) {
    return <p>Loading task list...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <ul>
      {data?.map((term) => (
        <TermItem key={term.id} termId={term.id} year={term.year} />
      ))}
    </ul>
  );
};
