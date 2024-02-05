"use client";

import SurveyForm from "@/components/features/survey/SurveyForm";
import SurveyPagination from "@/components/features/survey/SurveyPagination";

//redux
import { Provider } from "react-redux";
import store from "@/store/store";
import { Button } from "@/components/ui/button";

const SurveyPage = () => {
  return (
    <>
      <section className="py-5 md:py-10  ">
        <h3 className="wrapper text-primary h1-bold text-center ">
          Nešto o vama
        </h3>
        <p className="text-center text-bela p-regular-20">
          Odgovorite na sledeća pitanja i trening skrojen za{" "}
          <span className="text-primary font-bold">Vas</span> će biti dostupan
          za najkasnije <span className="text-primary font-bold">24h</span>
        </p>
      </section>
      <Provider store={store}>
        <>
          <SurveyForm />
        </>
      </Provider>
    </>
  );
};

export default SurveyPage;
