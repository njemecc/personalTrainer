"use client";

import { UserWorkoutParams, WorkoutPlan } from "@/types/workoutPlan";
import { WorkoutDay } from "./WorkoutDay";
import { Tabs } from "../../ui/tabs";
import CreateUpdateExerciseModal from "./CreateUpdateExerciseModal";
import { Protect, useUser } from "@clerk/nextjs";
import DeleteEntireWorkoutModal from "./DeleteEntireWorkoutModal";

function UserWorkout({
  workoutPlan,
  userId,
}: {
  workoutPlan: UserWorkoutParams;
  userId: string;
}) {
  const tabs = workoutPlan?.days?.map((day) => {
    return {
      title: day.dayName,
      value: day.dayName.toLowerCase(),
      content: (
        <div className="w-full  relative  rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br border-2 bg-neutral-900 border-primary">
          <div className="flex justify-center items-center w-3/4 m-auto">
            <p className="text-center">{day.workoutName}</p>
          </div>
          <WorkoutDay
            dayId={day._id}
            userId={userId}
            exercises={day.exercises}
          />
          <Protect role="org:king">
            <div className="flex justify-between items-center">
              <CreateUpdateExerciseModal
                userId={userId}
                dayId={day._id}
                variant="create"
              />

              <DeleteEntireWorkoutModal
                userId={userId}
                id={day._id}
                name={day.dayName}
              />
            </div>
          </Protect>
        </div>
      ),
    };
  });

  return (
    <div className="md:h-full max-w-[90rem] [perspective:1000px] flex flex-col mx-auto mt-1 w-full items-start justify-start">
      <Tabs tabs={tabs} />
      <div className="clear-both h-10"></div>
    </div>
  );
}

export default UserWorkout;
