import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { Auth } from "../components/Auth";
import { Layout } from "../components/Layout";
import { TermRegisterModal } from "../components/term/RegisterModal";
import { TermSelect } from "../components/term/Select";
import { trpc } from "../utils/trpc";
import { Text, Button } from "@mantine/core";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data } = trpc.salaryInfo.getSalaryInfos.useQuery();

  if (!session) {
    return (
      <Layout title="Login">
        <Auth />
      </Layout>
    );
  }
  return (
    <Layout title="Salary Info Management App">
      <div className="flex items-center justify-between my-4 px-3">
        <Text>{session?.user?.name}</Text>
        <Button
          className="rounded bg-blue-600 py-2 px-4 font-bold text-white hover:bg-blue-800 mx-4"
          onClick={() => signOut()}
        >
          SignOut
        </Button>
        <TermRegisterModal />
      </div>

      <TermSelect salalyInfos={data} />
    </Layout>
  );
};

export default Home;
