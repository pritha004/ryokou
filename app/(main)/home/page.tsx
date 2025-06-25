import { getRecommendedTrips } from "@/actions/trip";
import { checkUser, getUserProfileCompleteStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import Recommendations from "./_components/recommendations";

const Home = async () => {
  const user = await checkUser();

  const { isProfileComplete }: any = await getUserProfileCompleteStatus();

  if (!isProfileComplete) {
    redirect("/complete-profile");
  }

  const recommendations:
    | { success: boolean; tripRecommendation: any }
    | undefined = await getRecommendedTrips();

  return (
    <div className="w-full min-h-screen mb-16 md:mb-0">
      <Recommendations
        username={user?.name}
        recommendations={recommendations}
      />
    </div>
  );
};

export default Home;
