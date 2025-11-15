import UserWorkout from "@/components/features/workout/UserWorkout";
import { getWorkoutplanByUserId } from "@/lib/actions/workoutplan.actions";
import { UserDetailsPageParams } from "@/types/users";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = async ({ params }: UserDetailsPageParams) => {
  console.log("Učitavanje stranice za korisnika:", params.userId);
  
  const workoutPlan = await getWorkoutplanByUserId(params.userId);
  console.log("Workout plan učitan:", workoutPlan ? "Da" : "Ne");

  return (
    <div className="flex flex-col">
      {params.userId ? (
        <>
          <section className="workout-section w-full mb-10"> 
            {workoutPlan ? (
              <UserWorkout
                userId={params.userId}
                workoutPlan={workoutPlan}
              />
            ) : (
              <h1 className="text-lg md:text-3xl text-center mt-10 mb-10">
                ⏳ Tvoj trening je još uvek u procesu izrade.
              </h1>
            )}
          </section>
        </>
      ) : (
        <h1 className="text-lg md:text-3xl text-center mt-10">
          Greška pri učitavanju korisničkih podataka.
        </h1>
      )}
    </div>
  );
};

export default Page;
