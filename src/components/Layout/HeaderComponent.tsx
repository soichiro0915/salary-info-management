import { Header, MediaQuery, Burger, Text } from "@mantine/core";

export const HeaderComponent = ({ navbarOpened, setNavbarOpened }) => {
  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={navbarOpened}
            onClick={() => setNavbarOpened(!navbarOpened)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>

        <Text>Application header</Text>
      </div>
    </Header>
  );
};
