"use client";

import UserWorkout from "@/components/features/workout/UserWorkout";
import { getWorkoutplanByUserId } from "@/lib/actions/workoutplan.actions";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Page = () => {
  const { user } = useUser();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [workoutPlan, setWorkoutPlan] = useState<any>(undefined);

  useEffect(() => {
    if (user && user.publicMetadata) {
      const { userId } = user.publicMetadata;
      //@ts-ignore
      setUserId(userId);
    }
  }, [user]);

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      if (userId) {
        const plan = await getWorkoutplanByUserId(userId);
        setWorkoutPlan(plan);
      }
    };

    fetchWorkoutPlan();
  }, [userId]);

  return (
    <div>
      {userId && workoutPlan ? (
        <UserWorkout userId={userId} workoutPlan={workoutPlan} />
      ) : (
        <h1 className="text-lg md:text-3xl text-center mt-10 ">
          ⏳ Tvoj trening je još uvek u procesu izrade.
        </h1>
      )}
    </div>
  );
};

export default Page;
