import type { VFC } from "react";
import { Navbar, Text } from "@mantine/core";
import Link from "next/link";

interface Props {
  navbarOpened: boolean;
}

export const NavbarComponent: VFC<Props> = ({ navbarOpened }) => {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!navbarOpened}
      width={{ sm: 200, lg: 300 }}
    >
      <Link href={`/`}>
        <Text className="text-blue-400 hover:text-blue-700">Home</Text>
      </Link>
    </Navbar>
  );
};
