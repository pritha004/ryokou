import { getUserProfileCompleteStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import CompleteProfileForm from "./_components/profile-form";

const CompleteProfile = async () => {
  const { isProfileComplete }: any = await getUserProfileCompleteStatus();

  if (isProfileComplete) {
    redirect("/home");
  }

  return <CompleteProfileForm />;
};

export default CompleteProfile;
