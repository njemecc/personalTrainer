import AllQuestions from "./AllQuestions";
import TrainerCard from "./TrainerCard";

const About = () => {
  return (
    <div className="mt-0  m-auto">
      <div className="w-4/5 m-auto flex flex-col md:flex-row  justify-around items-center">
        <TrainerCard />
        <div className="w-full md:w-1/2 text-white flex flex-col  mt-20 md:mt-0">
          <AllQuestions />
        </div>
      </div>
    </div>
  );
};

export default About;
