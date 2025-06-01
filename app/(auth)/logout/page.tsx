import { signOut } from "@/auth";
import LogoutDialog from "./_components/LogoutDialog";

export default function LogOut() {
  const signOutFn = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };
  return (
    <div>
      <LogoutDialog signOutFn={signOutFn} />
    </div>
  );
}
