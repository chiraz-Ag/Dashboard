import { signIn, useSession } from "next-auth/react";
import Button from "@mui/material/Button";

const Login = () => {
  const { data: session } = useSession();

  return (
    <>
      <Button variant={"contained"} color={"success"} onClick={() => signIn()}>
        Sign in
      </Button>
    </>
  );
};

export default Login;
