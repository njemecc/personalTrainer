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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">
            <div className="backdrop-blur-sm bg-white/30 dark:bg-black/30 p-2 rounded-full inline-flex items-center mb-8 shadow-sm transition-all hover:bg-white/50 dark:hover:bg-black/50">
              <Link
                href={`/ishrana/${params.userId}`}
                className="flex items-center gap-2 px-4 py-2"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-white/80 dark:bg-black/80 shadow-sm rounded-full transition-transform hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-utensils"
                  >
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 2 0 0 0 2-2V2" />
                    <path d="M7 2v20" />
                    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3v0" />
                    <path d="M21 15v7" />
                  </svg>
                  <span>Plan Ishrane</span>
                </Button>
              </Link>
            </div>
          </div>
          <section className="workout-section w-full mb-10">
            {workoutPlan ? (
              <UserWorkout userId={params.userId} workoutPlan={workoutPlan} />
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-10 px-4">
                <h1 className="text-lg md:text-3xl text-center font-semibold">
                  ⏳ Tvoj trening je još uvek u procesu izrade.
                </h1>
                <p className="text-base md:text-lg text-center text-muted-foreground max-w-2xl">
                  Tvoj personalni trener je kontaktiran sa svim podacima.
                  Trening plan će biti dostupan za najkasnije 24 sata.
                </p>
              </div>
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
