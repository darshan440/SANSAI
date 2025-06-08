import { redirect } from "next/navigation";
import { getIndustryInsights } from "../../../action/dashboard";
import { getUserOnboardingStatus } from "../../../action/user";
import DashboardView from "./_components/dashboard-view";

const OnboardingPage = async () => {
  const { isOnboarding } = await getUserOnboardingStatus();
  const insights = await getIndustryInsights();
  // If onboarding is done, send to dashboard
  if (!isOnboarding) {
    redirect("/onboarding");
  }

  return (
    <div>
      <DashboardView insights={insights} />
    </div>
  );
};

export default OnboardingPage;
