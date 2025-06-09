import { getUserProfileCompleteStatus } from "@/actions/user";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import TripForm from "./_components/trip-form";

const Dashboard = async () => {
  const { isProfileComplete }: any = await getUserProfileCompleteStatus();

  if (!isProfileComplete) {
    redirect("/complete-profile");
  }

  const session = await auth();

  return (
    <div className="w-full min-h-screen p-4 border-2 border-red-400">
      <div>
        <h1>
          Hi {session?.user?.name?.split(" ")[0]}! Ready to switch on your
          out-of-office?
        </h1>
        <p>Plan your getaway without the guesswork.</p>
      </div>
      <TripForm />
    </div>
  );
};

export default Dashboard;
