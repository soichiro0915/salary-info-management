import { useRouter } from "next/router";
import { Button, Navbar, Text, Center } from "@mantine/core";

import { TermRegisterModal } from "../term/RegisterModal";
import { TermSelect } from "../term/Select";

import type { VFC } from "react";

interface Props {
  navbarOpened: boolean;
}

export const NavbarComponent: VFC<Props> = ({ navbarOpened }) => {
  const router = useRouter();

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!navbarOpened}
      width={{ sm: 200, lg: 300 }}
    >
      <Button
        className="w-full rounded bg-indigo-500 py-2 px-4 font-bold text-white hover:bg-indigo-700"
        onClick={() => router.push("/")}
      >
        <Text className="text-white-400">Home</Text>
      </Button>

      <Center className="mt-5">
        <TermRegisterModal />
      </Center>

      <Center className="mt-5">
        <TermSelect />
      </Center>
    </Navbar>
  );
};
