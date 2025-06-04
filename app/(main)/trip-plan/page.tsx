import { getUserProfileCompleteStatus } from "@/actions/user";
import { redirect } from "next/navigation";

const TripPlan = async () => {
  const { isProfileComplete }: any = await getUserProfileCompleteStatus();

  if (!isProfileComplete) {
    redirect("/complete-profile");
  }
  return <div>TripPlan</div>;
};

export default TripPlan;
