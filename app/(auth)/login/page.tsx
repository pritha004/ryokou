import { signIn } from "@/auth";
import LogInComp from "./_components/login-comp";

const signInFn = async () => {
  "use server";
  await signIn("google", { redirectTo: "/home" });
};

export default function LogIn() {
  return (
    <>
      <LogInComp signInFn={signInFn} />
    </>
  );
}
