import UserDetails from "@/components/features/admin/users/userDetails/userDetails";
import { CreateWorkoutModal } from "@/components/features/workout/CreateWorkoutModal";
import UserWorkout from "@/components/features/workout/UserWorkout";
import { getUserAndSurveyInfo } from "@/lib/actions/survey.actions";
import { generateSasToken } from "@/lib/actions/token.actions";
import { getWorkoutplanByUserId } from "@/lib/actions/workoutplan.actions";
import { getProgressByUserId } from "@/lib/actions/progress.actions";
import { Exercise } from "@/types/exercise";
import { UserDetailsPageParams } from "@/types/users";
import AdminProgressView from "@/components/features/admin/progress/AdminProgressView";

const page = async ({ params }: UserDetailsPageParams) => {
  const user = await getUserAndSurveyInfo(params.userId);

  const workoutPlan = await getWorkoutplanByUserId(params.userId);
  const progressEntries = await getProgressByUserId(params.userId);

  // Generate SAS tokens for each exercise URL
  // const workoutPlanWithSasUrls = {
  //   ...workoutPlan,
  //   days: workoutPlan?.days.map((day: any) => ({
  //     ...day,
  //     exercises: day.exercises.map((exercise: Exercise) => ({
  //       ...exercise,
  //       url: generateSasToken(exercise.url), // Generate SAS token
  //     })),
  //   })),
  // };

  if (!user)
    return (
      <h1 className="text-xl">
        Korisnik sa ovim identifikatorom ne postoji u bazi podataka ili nije
        popunio anketu.
      </h1>
    );
  return (
    <>
      <UserDetails _id={params.userId} {...user} />

      {/* Progress Section */}
      <div className="mt-20">
        <h1 className="text-2xl text-center font-semibold mb-8">
          <span className="text-gold">Klijentov </span> Napredak
        </h1>
        <AdminProgressView
          userId={params.userId}
          progressEntries={progressEntries || []}
        />
      </div>

      {/* Workout Plan Section */}
      <div className="mt-20">
        <h1 className="text-2xl text-center font-semibold mb-8">
          <span className="text-gold">Klijentov </span> program
        </h1>
        <CreateWorkoutModal userId={params.userId} />
        {workoutPlan ? (
          <UserWorkout userId={params.userId} workoutPlan={workoutPlan} />
        ) : (
          <h1>❌ Ne postoji trening plan za ovog klijenta još uvek.</h1>
        )}
      </div>
    </>
  );
};

export default page;
