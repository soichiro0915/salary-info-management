import type { VFC } from "react";
import { signOut, useSession } from "next-auth/react";
import { Header, MediaQuery, Burger, Text, Button, Flex } from "@mantine/core";

interface Props {
  navbarOpened: boolean;
  setNavbarOpened: (navbarOpened: boolean) => void;
}

export const HeaderComponent: VFC<Props> = ({
  navbarOpened,
  setNavbarOpened,
}) => {
  const { data: session } = useSession();

  return (
    <Header className="flex items-center" height={60} p="xs">
      <Flex>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={navbarOpened}
            onClick={() => setNavbarOpened(!navbarOpened)}
            size="sm"
            mr='xs'
          />
        </MediaQuery>

        <Text >給与情報管理</Text>
      </Flex>

      {session && (
        <Flex
          className="ml-auto"
          justify="between"
          align="center"
          direction="row"
          gap='xs'
         
        >
          <Text>{session?.user?.name}</Text>
          <Button
            className="rounded bg-blue-600 font-bold text-white hover:bg-blue-800"
            onClick={() => signOut()}
          >
            SignOut
          </Button>
        </Flex>
      )}
    </Header>
  );
};
