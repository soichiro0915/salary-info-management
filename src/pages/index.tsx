import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { Auth } from "../components/Auth";
import { Layout } from "../components/Layout";
import { TermRegister } from "../components/term/Register";
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
      <Button
        className="rounded bg-blue-600 py-2 px-4 font-bold text-white hover:bg-blue-800"
        onClick={() => signOut()}
      >
        SignOut
      </Button>
      <Text>{session?.user?.name}</Text>
      <TermRegister />
      <TermSelect salalyInfos={data} />
    </Layout>
  );
};

export default Home;
