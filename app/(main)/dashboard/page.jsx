import { getUserOnboardingStatus } from "../../../action/user";

const IndustryInsightsPage =  async () => {
    const {isOnboarding} = await getUserOnboardingStatus
  return <div className=""> IndustryInsightsPage</div>;
};
export default IndustryInsightsPage;
