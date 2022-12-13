import { signIn } from "next-auth/react";
import { Button, Center } from "@mantine/core";

export const Auth = () => {
  return (
    <div>
      <Center>
        <Button
          className="rounded bg-blue-600 py-2 px-4 font-bold text-white hover:bg-blue-800"
          onClick={() => signIn()}
        >
          Google Auth
        </Button>
      </Center>
    </div>
  );
};
