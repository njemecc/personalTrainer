import { getUserById } from "@/lib/actions/user.actions";
import { UserDetailsPageParams } from "@/types/users";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProgressTracking from "@/components/features/progress/ProgressTracking";

const ProgressPage = async ({ params }: UserDetailsPageParams) => {
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
          ❌ Pristup praćenju napretka je trenutno onemogućen.
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-12 relative z-10">
      <div className="backdrop-blur-sm bg-white/30 dark:bg-black/30 p-2 rounded-full inline-flex items-center mb-8 shadow-sm transition-all hover:bg-white/50 dark:hover:bg-black/50 gap-4">
        <Link href={`/plan/${params.userId}`} className="flex items-center gap-2 px-4 py-2">
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
              className="lucide lucide-dumbbell"
            >
              <path d="m6.5 6.5 11 11" />
              <path d="m21 21-1-1" />
              <path d="m3 3 1 1" />
              <path d="m18 22 4-4" />
              <path d="m2 6 4-4" />
              <path d="m3 10 7-7" />
              <path d="m14 21 7-7" />
            </svg>
            <span>Plan Treninga</span>
          </Button>
        </Link>
        <Link href={`/ishrana/${params.userId}`} className="flex items-center gap-2 px-4 py-2">
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

      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 transition-all hover:shadow-xl">
        <div className="p-6 md:p-8">
          <ProgressTracking userId={params.userId} />
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;

