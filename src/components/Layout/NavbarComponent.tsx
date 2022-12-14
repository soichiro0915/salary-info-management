import type { VFC } from "react";
import { Navbar, Text } from "@mantine/core";

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
      <Text>Application navbar</Text>
    </Navbar>
  );
};
