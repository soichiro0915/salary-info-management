import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Paper, Center } from "@mantine/core";

import { Auth } from "../components/Auth";
import { Layout } from "../components/Layout";
import { TermRegisterModal } from "../components/term/RegisterModal";
import { TermSelect } from "../components/term/Select";

const Home: NextPage = () => {
  const { data: session } = useSession();

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

        <TermSelect />
      </Paper>
    </Layout>
  );
};

export default Home;
