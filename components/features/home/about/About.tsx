import TrainerCard from "../testimonials/TrainerCard";

const About = () => {
  return (
    <div className="mt-0  m-auto">
      <div className="w-4/5 m-auto flex flex-col md:flex-row  justify-around items-center">
        <TrainerCard />
        <div className="w-full md:w-1/2 text-white flex flex-col  mt-20 md:mt-0">
          <h1 className=" mt-5 h1-bold mb-5">Nešto O Programu</h1>
          <ul className="list-disc text-white mb-5">
            <li className="h2-bold mb-5">Ako se pitaš:</li>
            <li className="our-p-tag">
              Da li si dobro sastavio svoj plan treninga?
            </li>
            <li className="our-p-tag">
              Da li ti je dovoljno da treniraš 3 puta nedeljno ili ti je to
              malo?
            </li>
            <li className="our-p-tag">
              Da li ti je izbor namirnica adekvatan za ono što želiš postići?
            </li>
            <li className="our-p-tag">Da li pravilno izvodiš vežbe?</li>

            <li className="our-p-tag">Da li jedeš dovoljno hrane?</li>

            <li className="p-bold-20 text-primary mb-1">
              {" "}
              Došao si na pravo mesto.
            </li>

            <li className="our-p-tag">
              Ne moraš se više brinuti oko ovih pitanja i zamarati mišlju:{" "}
              <span className="text-primary p-regular-20">
                "Da li sam sve dobro napravio ili sam mogao i bolje?"{" "}
              </span>
              .
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
