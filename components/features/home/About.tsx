import TrainerCard from "./TrainerCard";

const About = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)),url(/assets/images/tiangle.jpg)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="mt-0 border-2 border-black  m-auto"
    >
      <div className="w-4/5 m-auto flex flex-col md:flex-row  justify-around items-center">
        <TrainerCard />
        <div className="w-full md:w-1/2 text-white flex flex-col mb-auto mt-20  md:mt-0">
          <h1 className="h1-bold mb-5">Nešto O Programu</h1>
          <ul className="list-disc text-white mb-5">
            <li className="h2-bold mb-5">Ako se pitaš:</li>
            <li className="p-regular-18 mb-1">
              Da li si dobro sastavio svoj plan treninga?
            </li>
            <li className="p-regular-18 mb-1">
              Da li ti je dovoljno da treniraš 3 puta nedeljno ili ti je to
              malo?
            </li>
            <li className="p-regular-18 mb-1">
              Da li ti je izbor namirnica adekvatan za ono što želiš postići?
            </li>
            <li className="p-regular-18 mb-1">Da li pravilno izvodiš vežbe?</li>

            <li className="p-regular-18 mb-1">Da li jedeš dovoljno hrane?</li>

            <li className="p-bold-20 text-primary mb-1">
              {" "}
              Došao si na pravo mesto.
            </li>

            <li>
              Ne moraš se više brinuti oko ovih pitanja i zamarati mišlju:{" "}
              <span className="text-primary p-regular-18">
                "Da li sam sve dobro napravilo ili sam mogao i bolje?"{" "}
              </span>
              .
            </li>
          </ul>
          <p className="p-regular-18 mb-5">
            Taj posao je u potpunosti na meni, a tvoje je samo da se opustiš i
            uživaš na putu do postizanja svog željenog rezultata! Program je
            napravljen tako da dobijaš plan treninga i ishrane za svaki mesec.
            Ishranu i trening dobijaš u PDF formatu, s tim što vežbe pratiš
            preko svog naloga na mojoj online aplikaciji u kojoj je sve detaljno
            objašnjeno.
          </p>
          <p className="p-regular-18 mb-5">
            Na tebi je kojim danima i u koje vreme ćeš trenirati, ali bih ti
            najviše preporučio da se pridržavaš pisanog plana jer ćes tako
            najbrže doći do željenog cilja. Takođe, tu sam za tebe u bilo koje
            doba dana ili noći ako imaš neku nedoumicu slobodno pitaj, a ja ću
            ti rado odgovoriti u najkraćem vremenskom roku.
          </p>

          <p className="p-regular-18 mb-5">
            Pitanja mi možeš postaviti u WhatsApp grupi polaznika ili direktno
            meni u poruci.
          </p>
          <p className=" mb-5 p-bold-20 text-primary ">
            Očekujem te da zajedno rušimo barijere i postižemo ciljeve!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
