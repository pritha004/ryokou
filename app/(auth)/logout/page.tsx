import { signOut } from "@/auth";
import LogoutDialog from "./_components/logout-dialog";

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
