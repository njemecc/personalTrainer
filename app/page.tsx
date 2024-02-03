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
        <div className="m-auto w-4/5 lg:w-3/5 flex justify-center my-8rounded shadow-lg bg-gradient-to-bl opacity-90   from-black  via-[#6d671b] via-50%  rounded-lg py-10 ">
          <SurveyForm />
        </div>
        <div className="mt-5">
          <SurveyPagination />
        </div>
        <div className="flex justify-center mt-5">
          <Button className="bg-gradient-to-bl from-black  via-[#6d671b] via-50% w-24 h-14 uppercase text-white p-regular-16 p-5">
            Pošalji
          </Button>
        </div>
      </Provider>
    </>
  );
};

export default SurveyPage;
