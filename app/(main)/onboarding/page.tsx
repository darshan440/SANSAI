
import { redirect } from "next/navigation";
import { getUserOnboardingStatus } from "../../../action/user";
import { industries } from "../../../data/industries";
import OnboradingForm from "./_components/onboarding-form";
const OnboradingPage = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();
  if (isOnboarded) {
    redirect("/dashboard");
  }
  // check if user is already onboarded
  return (
    <main>
      <OnboradingForm industries={industries} />
    </main>
  );
};

export default OnboradingPage;
