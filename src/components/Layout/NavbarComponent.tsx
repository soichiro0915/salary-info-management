import { Navbar, Text } from "@mantine/core";

export const NavbarComponent = ({ navbarOpened }) => {
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
