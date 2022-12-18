import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Paper } from "@mantine/core";

import { Auth } from "../components/Auth";
import { Layout } from "../components/Layout";
import { TermItem } from "../components/term/Item";

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
      <Paper className="p-10">
        <TermItem />
      </Paper>
    </Layout>
  );
};

export default Home;
