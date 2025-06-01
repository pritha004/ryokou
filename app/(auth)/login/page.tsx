import { signIn } from "@/auth";
import LogInComp from "./_components/LoginComp";

const signInFn = async () => {
  "use server";
  await signIn("google", { redirectTo: "/trip-plan" });
};

export default function LogIn() {
  return (
    <>
      <LogInComp signInFn={signInFn} />
    </>
  );
}
