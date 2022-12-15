import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Paper, Center } from "@mantine/core";

import { Auth } from "../components/Auth";
import { Layout } from "../components/Layout";
import { TermRegisterModal } from "../components/term/RegisterModal";
import { TermSelect } from "../components/term/Select";
import { trpc } from "../utils/trpc";

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
      <Paper className='pt-4'>
        <Center>
          <TermRegisterModal />
        </Center>

        <TermSelect salalyInfos={data} />
      </Paper>
    </Layout>
  );
};

export default Home;
