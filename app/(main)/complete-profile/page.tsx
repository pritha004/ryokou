import { getUserProfileCompleteStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import CompleteProfileForm from "./_components/CompleteProfileForm";

const CompleteProfile = async () => {
  const { isProfileComplete }: any = await getUserProfileCompleteStatus();

  if (isProfileComplete) {
    redirect("/trip-plan");
  }

  return (
    <main>
      <CompleteProfileForm />
    </main>
  );
};

export default CompleteProfile;
