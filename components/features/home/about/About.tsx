import AllQuestions from "./AllQuestions";
import TrainerCard from "./TrainerCard";

const About = () => {
  return (
    <div className="mt-0 m-auto py-16 lg:py-24">
      <div className="w-4/5 m-auto flex flex-col md:flex-row justify-around items-center gap-12 lg:gap-16">
        <div className="flex-shrink-0">
          <TrainerCard />
        </div>
        <div className="w-full md:w-1/2 text-white flex flex-col mt-20 md:mt-0">
          <AllQuestions />
        </div>
      </div>
    </div>
  );
};

export default About;
