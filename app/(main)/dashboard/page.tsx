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
      <div className="mt-4 p-4">
        <h1 className="text-[calc(1rem+2vw)] font-playfair">
          Hi <span className="">{session?.user?.name?.split(" ")[0]}</span>!
        </h1>
        <p className="text-[calc(1rem+0.5vw)] mt-4 font-lato ">
          Ready to switch on your <span className="italic">out-of-office</span>{" "}
          ? Let's plan your getaway without the guesswork.
        </p>
        <TripForm />
      </div>
    </div>
  );
};

export default Dashboard;
