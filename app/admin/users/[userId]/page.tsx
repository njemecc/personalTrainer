import UserDetails from "@/components/features/admin/users/userDetails/userDetails";
import { CreateWorkoutModal } from "@/components/features/workout/CreateWorkoutModal";
import UserWorkout from "@/components/features/workout/UserWorkout";
import { getUserAndSurveyInfo } from "@/lib/actions/survey.actions";
import { generateSasToken } from "@/lib/actions/token.actions";
import { getWorkoutplanByUserId } from "@/lib/actions/workoutplan.actions";
import { Exercise } from "@/types/exercise";
import { UserDetailsPageParams } from "@/types/users";
import { Day } from "@/types/workoutPlan";

const page = async ({ params }: UserDetailsPageParams) => {
  const user = await getUserAndSurveyInfo(params.userId);

  const workoutPlan = await getWorkoutplanByUserId(params.userId);

  // Generate SAS tokens for each exercise URL
  const workoutPlanWithSasUrls = {
    ...workoutPlan,
    days: workoutPlan?.days.map((day: Day) => ({
      ...day,
      exercises: day.exercises.map((exercise: Exercise) => ({
        ...exercise,
        url: generateSasToken(exercise.url), // Generate SAS token
      })),
    })),
  };

  if (!user)
    return (
      <h1 className="text-xl">
        Korisnik sa ovim identifikatorom ne postoji u bazi podataka ili nije
        popunio anketu.
      </h1>
    );
  return (
    <>
      <UserDetails {...user} />
      <h1 className="text-2xl text-center mt-20 font-semibold">
        <span className="text-gold">Klijentov </span> program
      </h1>
      <CreateWorkoutModal userId={params.userId} />
      {workoutPlanWithSasUrls ? (
        <UserWorkout
          userId={params.userId}
          workoutPlan={workoutPlanWithSasUrls}
        />
      ) : (
        <h1>❌ Ne postoji trening plan za ovog klijenta još uvek.</h1>
      )}
    </>
  );
};

export default page;
