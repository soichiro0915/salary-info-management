import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { Auth } from "../components/Auth";
import { Layout } from "../components/Layout";
import { TermRegister } from "../components/term/Register";
import { TermSelect } from "../components/term/Select";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data, isLoading, error } = trpc.salaryInfo.getSalaryInfos.useQuery();
  
  if (isLoading) {
    return <p>Loading task list...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if (!session) {
    return (
      <Layout title="Login">
        <Auth />
      </Layout>
    );
  }
  return (
    <Layout title="Salary Info Management App">
      <button
        className="rounded bg-blue-600 py-2 px-4 font-bold text-white hover:bg-blue-800"
        onClick={() => signOut()}
      >
        SignOut
      </button>
      <p>{session?.user?.name}</p>
      <TermRegister />
      <TermSelect salalyInfos={data} />
    </Layout>
  );
};

export default Home;
