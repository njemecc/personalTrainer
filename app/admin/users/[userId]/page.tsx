import UserDetails from "@/components/features/admin/users/userDetails/userDetails";
import { CreateWorkoutModal } from "@/components/features/workout/CreateWorkoutModal";
import UserWorkout from "@/components/features/workout/UserWorkout";
import { getUserAndSurveyInfo } from "@/lib/actions/survey.actions";
import { getWorkoutplanByUserId } from "@/lib/actions/workoutplan.actions";
import { UserDetailsPageParams } from "@/types/users";

const page = async ({ params }: UserDetailsPageParams) => {
  const user = await getUserAndSurveyInfo(params.userId);

  const workoutPlan = await getWorkoutplanByUserId(params.userId);

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
      {workoutPlan ? (
        <UserWorkout userId={params.userId} workoutPlan={workoutPlan} />
      ) : (
        <h1>❌ Ne postoji trening plan za ovog klijenta jos uvek</h1>
      )}
    </>
  );
};

export default page;
