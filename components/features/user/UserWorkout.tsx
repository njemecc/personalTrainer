"use client";

import { WorkoutDay } from "./WorkoutDay";
import { Tabs } from "./tabs";

const tabs = [
  {
    title: "Ponedeljak",
    value: "pon",
    content: (
      <div className="w-full overflow-hidden  relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gold"></div>
    ),
  },
  {
    title: "Utorak",
    value: "uto",
    content: (
      <div className="w-full  relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br bg-gold"></div>
    ),
  },
  {
    title: "Sreda",
    value: "sre",
    content: (
      <div className="w-full  relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br bg-gold">
        <WorkoutDay />
      </div>
    ),
  },
  {
    title: "Četvrtak",
    value: "cet",
    content: (
      <div className="w-full  relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br bg-gold">
        <WorkoutDay />
      </div>
    ),
  },
  {
    title: "Petak",
    value: "pet",
    content: (
      <div className="w-full relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br bg-gold">
        <WorkoutDay />
      </div>
    ),
  },
  {
    title: "Subota",
    value: "sub",
    content: (
      <div className="w-full  relative rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br bg-gray-300">
        <div className="flex justify-center items-center w-3/4 m-auto">
          <p className="text-center">Grudi Ramena</p>
        </div>
        <WorkoutDay />
      </div>
    ),
  },
  {
    title: "Nedelja",
    value: "ned",
    content: (
      <div className="w-full  relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br bg-gold">
        <WorkoutDay />
      </div>
    ),
  },
];

function UserWorkout() {
  return (
    <div className="md:h-full max-w-[90rem] [perspective:1000px] relative b flex flex-col  mx-auto w-full   items-start justify-start my-40">
      <Tabs tabs={tabs} />
    </div>
  );
}

export default UserWorkout;
