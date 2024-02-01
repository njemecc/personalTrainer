import SurveyForm from "@/components/features/survey/SurveyForm";
import Survey from "@/components/features/survey/SurveyForm";

const SurveyPage = () => {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Anketa</h3>
      </section>
      <div className="wrapper my-8 border-2">
        <SurveyForm />
      </div>
    </>
  );
};

export default SurveyPage;
