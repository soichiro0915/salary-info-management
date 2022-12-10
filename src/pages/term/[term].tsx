import Link from "next/link";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { trpc } from "../../utils/trpc";
import { Layout } from "../../components/Layout";

const SingleTermPage: NextPage = () => {
  const router = useRouter();
  const termId = router.query.termId as string;
  const { data, isLoading, error } = trpc.salaryInfo.getSalaryInfos.useQuery();
  const salalyInfoList = data?.filter(
    (salaryInfo) => salaryInfo.termId === termId
  );

  if (isLoading) {
    return <Layout title="Term Detail">Loading single term...</Layout>;
  }
  if (error) {
    return <Layout title="Term Detail">{error.message}</Layout>;
  }
  return (
    <Layout title="Task Detail">
      {[...Array(12)]
        .map((_, i) => i + 1)
        .map((month) =>
          salalyInfoList?.find((salaryInfo) => salaryInfo.month === month) ? (
            <p key={month} className="text-red-500">
              {month}月
            </p>
          ) : (
            <p key={month} className="text-blue-500">
              {month}月
            </p>
          )
        )}

      <Link href={`/`}>
        <p className="text-blue-400 hover:text-blue-700">戻る</p>
      </Link>
    </Layout>
  );
};
export default SingleTermPage;
