import { aboutSectionQuestions } from "@/constants";
import Reveal from "@/components/ui/Reveal";
const AllQuestions = () => {
  return (
    <>
      <h2 className="h2-bold mb-10 text-center text-primary">Ako se pitaš :</h2>
      <ul className="list-disc text-white p-5">
        {aboutSectionQuestions.map((question, i) => (
          <Reveal key={i}>
            <li className={`${question.class ? question.class : "our-p-tag"}`}>
              {question.text}
            </li>
          </Reveal>
        ))}
      </ul>
      <p className=" mb-2 p-regular-20 text-center lg:text-[28px] lg:mt-10  text-white">
        Došao si na pravo <span className="text-primary">mesto</span>.
      </p>
      <p className="text-justify tracking-tighter mb-5 lg:p-regular-20 mt-5 lg:text-left text-white">
        Ne moraš se više brinuti oko ovih pitanja i zamarati mišlju: 'Da li sam
        sve dobro napravio ili sam mogao i bolje? .
      </p>
    </>
  );
};

export default AllQuestions;
