import { signIn } from "next-auth/react";
import { Button } from "@mantine/core";

export const Auth = () => {
  return (
    <div>
      <Button variant="default" color="gray" onClick={() => signIn()}>
        Google
      </Button>
    </div>
  );
};
