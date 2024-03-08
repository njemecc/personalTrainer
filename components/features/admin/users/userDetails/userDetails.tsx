import { UserSurveyDTO } from "@/types/survey";
import React from "react";
import Tag from "../../../../ui/Tag";
const UserDetails = ({
  email,
  firstName,
  lastName,
  isActive,
  photo,
  telefon,
  visina,
  tezina,
  datumRodjenja,
  radniStatus,
  brojObroka,
  satiSpavanja,
  tipOsobe,
  zdravstveniProblem,
  dodatno,
  razlogPrestanka,
  imaliTrenera,
  ocekivanja,
  ranijeTrenirali,
}: UserSurveyDTO) => {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-md">
      <div className="flex justify-center">
        <h2 className="text-xl font-semibold">O klijentu</h2>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 p-4">
          <img
            src={photo}
            alt="User"
            className="rounded-full w-32 h-32 mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-center">
            {firstName} {lastName}
          </h3>
          <p className="text-center">{email}</p>
          <p
            className={`text-center text-[0.9rem] font-bold w-1/2 mx-auto mt-4 text-white py-[0.3rem] rounded ${
              isActive ? "bg-gold" : "bg-red-600"
            }`}
          >
            {isActive ? "Akitvan" : "Neaktivan"}
          </p>
        </div>
        <div className="md:w-2/3 p-4">
          <div className=" border-b-2 pb-4">
            <h3 className="text-lg font-semibold">Ostale informacije</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <p>
              <span className="font-semibold">Telefon:</span> {telefon}
            </p>
            <p>
              <span className="font-semibold">Visina:</span> {visina} cm
            </p>
            <p>
              <span className="font-semibold">Težina:</span> {tezina} kg
            </p>
            <p>
              <span className="font-semibold">Datum rodjenja:</span>{" "}
              {new Date(datumRodjenja).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Status zaposlenja:</span>{" "}
              {radniStatus}
            </p>
            <p>
              <span className="font-semibold">Broj obroka u toku dana:</span>{" "}
              {brojObroka}
            </p>
            <p>
              <span className="font-semibold">Broj sati spavanja:</span>{" "}
              {satiSpavanja}
            </p>
            <p>
              <span className="font-semibold">Tip osobe:</span> {tipOsobe}
            </p>
            <p>
              <span className="font-semibold">Zdravstveni problemi:</span>{" "}
              {zdravstveniProblem}
            </p>
            <p>
              <span className="font-semibold">Dodatno:</span> {dodatno}
            </p>
            <p>
              <span className="font-semibold">
                Razlog prestanka sa treningom:
              </span>{" "}
              {razlogPrestanka}
            </p>
            <p>
              <span className="font-semibold">Da li je imao trenera:</span>{" "}
              {imaliTrenera}
            </p>
            <p>
              <span className="font-semibold">Očekivanja od programa:</span>{" "}
              {ocekivanja}
            </p>
            <p>
              <span className="font-semibold">Ranije trenirao:</span>{" "}
              {ranijeTrenirali}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
