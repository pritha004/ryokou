import { getUserProfileCompleteStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import CompleteProfileForm from "./_components/CompleteProfileForm";

const CompleteProfile = async () => {
  const { isProfileComplete }: any = await getUserProfileCompleteStatus();

  if (isProfileComplete) {
    redirect("/dashboard");
  }

  return (
    // <div className="flex justify-center items-center">
    <CompleteProfileForm />
    // {/* </div> */}
  );
};

export default CompleteProfile;
