import { aboutSectionQuestions } from "@/constants";
import Reveal from "@/components/ui/Reveal";
const AllQuestions = () => {
  return (
    <>
      <p className="text-justify tracking-tighter mb-8 lg:p-regular-20 mt-5 lg:text-left text-white text-lg lg:text-xl leading-relaxed drop-shadow-lg">
        Kao profesionalni fitnes trener sa više godina iskustva, posvećen sam
        tome da vam pomognem da postignete svoje ciljeve.
      </p>
      <h2 className="h2-bold mb-10 text-center lg:text-left text-primary text-3xl lg:text-4xl font-bold drop-shadow-lg">
        Ako želiš da:
      </h2>
      <ul className="list-none text-white space-y-4 lg:space-y-5">
        {aboutSectionQuestions.map((question, i) => (
          <Reveal key={i}>
            <li
              className={`flex items-start gap-3 ${
                question.class ? question.class : "our-p-tag"
              }`}
            >
              <span className="text-gold text-xl lg:text-2xl mt-1 flex-shrink-0">
                ✓
              </span>
              <span className="text-base lg:text-lg leading-relaxed">
                {question.text}
              </span>
            </li>
          </Reveal>
        ))}
      </ul>
      <p className="mb-2 p-regular-20 text-center lg:text-left text-xl md:text-2xl lg:text-[32px] lg:mt-12 text-white font-bold drop-shadow-lg">
        Došao si na pravo <span className="text-gold">mesto</span>.
      </p>
    </>
  );
};

export default AllQuestions;
