import UserWorkout from "@/components/features/workout/UserWorkout";
import { generateSasToken } from "@/lib/actions/token.actions";
import { getWorkoutplanByUserId } from "@/lib/actions/workoutplan.actions";
import { Exercise } from "@/types/exercise";
import { UserDetailsPageParams } from "@/types/users";

const Page = async ({ params }: UserDetailsPageParams) => {
  const workoutPlan = await getWorkoutplanByUserId(params.userId);

  // Generate SAS tokens for each exercise URL
  const workoutPlanWithSasUrls = {
    ...workoutPlan,
    days: workoutPlan?.days.map((day) => ({
      ...day,
      exercises: day.exercises.map((exercise: Exercise) => ({
        ...exercise,
        url: generateSasToken(exercise.url), // Generate SAS token
      })),
    })),
  };

  return (
    <div>
      {params.userId && workoutPlan ? (
        <UserWorkout
          userId={params.userId}
          workoutPlan={workoutPlanWithSasUrls}
        />
      ) : (
        <h1 className="text-lg md:text-3xl text-center mt-10 ">
          ⏳ Tvoj trening je još uvek u procesu izrade.
        </h1>
      )}
    </div>
  );
};

export default Page;
