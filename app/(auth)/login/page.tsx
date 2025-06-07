import { signIn } from "@/auth";
import LogInComp from "./_components/LoginComp";

const signInFn = async () => {
  "use server";
  await signIn("google", { redirectTo: "/dashboard" });
};

export default function LogIn() {
  return (
    <>
      <LogInComp signInFn={signInFn} />
    </>
  );
}
