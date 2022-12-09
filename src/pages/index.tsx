import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { Auth } from "../components/Auth";
import { Layout } from "../components/Layout";
import { SalaryInfoForm } from "../components/salaryInfo/Form";
import { SalaryInfoList } from "../components/salaryInfo/List";

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
      <button
        className="rounded bg-blue-600 py-2 px-4 font-bold text-white hover:bg-blue-800"
        onClick={() => signOut()}
      >
        SignOut
      </button>
      <p>{session?.user?.name}</p>
      <SalaryInfoForm />
      <SalaryInfoList />
    </Layout>
  );
};

export default Home;
