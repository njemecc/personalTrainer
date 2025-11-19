import UserWorkout from "@/components/features/workout/UserWorkout";
import { getWorkoutplanByUserId } from "@/lib/actions/workoutplan.actions";
import { UserDetailsPageParams } from "@/types/users";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/lib/actions/user.actions";

const Page = async ({ params }: UserDetailsPageParams) => {
  console.log("Učitavanje stranice za korisnika:", params.userId);

  const user = await getUserById(params.userId);
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-20">
        <h1 className="text-xl md:text-3xl font-semibold text-center">
          Korisnik ne postoji ili je obrisan.
        </h1>
        <Button asChild>
          <Link href="/">Vrati se na početnu</Link>
        </Button>
      </div>
    );
  }

  if (!user.is_active) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-20">
        <h1 className="text-xl md:text-3xl font-semibold text-center">
          ❌ Pristup trening planu je trenutno onemogućen.
        </h1>
        <p className="text-center text-base text-muted-foreground max-w-xl">
          Za aktiviranje kontaktiraj svog personalnog trenera.
        </p>
        <Button asChild variant="gold">
          <Link href="/">Vrati se na početnu</Link>
        </Button>
      </div>
    );
  }

  const workoutPlan = await getWorkoutplanByUserId(params.userId);
  console.log("Workout plan učitan:", workoutPlan ? "Da" : "Ne");

  return (
    <div className="flex flex-col">
      {params.userId ? (
        <>
          <section className="workout-section w-full mb-10">
            {workoutPlan ? (
              <UserWorkout userId={params.userId} workoutPlan={workoutPlan} />
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
