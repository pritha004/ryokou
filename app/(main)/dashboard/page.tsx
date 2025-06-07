import { getUserProfileCompleteStatus } from "@/actions/user";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const { isProfileComplete }: any = await getUserProfileCompleteStatus();

  if (!isProfileComplete) {
    redirect("/complete-profile");
  }
  return <div>Dashboard</div>;
};

export default Dashboard;
