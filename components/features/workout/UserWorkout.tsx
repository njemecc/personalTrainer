"use client";

import { UserWorkoutParams, WorkoutPlan } from "@/types/workoutPlan";
import { WorkoutDay } from "./WorkoutDay";
import { Tabs } from "../../ui/tabs";

function UserWorkout({ workoutPlan }: { workoutPlan: UserWorkoutParams }) {
  const tabs = workoutPlan.days.map((day) => {
    return {
      title: day.dayName,
      value: day.dayName.toLowerCase(),
      content: (
        <div className="w-full  relative  rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br bg-gray-400">
          <div className="flex justify-center items-center w-3/4 m-auto">
            <p className="text-center">{day.workoutName}</p>
          </div>
          <WorkoutDay exercises={day.exercises} />
        </div>
      ),
    };
  });

  return (
    <div className="md:h-full max-w-[90rem] [perspective:1000px] relative b flex flex-col  mx-auto mt-1 w-full   items-start justify-start my-40">
      <Tabs tabs={tabs} />
    </div>
  );
}

export default UserWorkout;
