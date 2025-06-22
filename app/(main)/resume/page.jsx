import { getResume } from "../../../action/resume";
import ResumeBuilder from "./_components/resume-builder";

const RasumePage = async () => {
  const resume = await getResume();

  return (
    <div className="container mx-auto py-6 px-10">
      <ResumeBuilder initialContent={resume?.content} />
    </div>
  );
};

export default RasumePage;
