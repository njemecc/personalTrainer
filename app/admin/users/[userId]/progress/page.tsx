import { getUserById } from "@/lib/actions/user.actions";
import { getProgressByUserId } from "@/lib/actions/progress.actions";
import { UserDetailsPageParams } from "@/types/users";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AdminProgressView from "@/components/features/admin/progress/AdminProgressView";
import { ArrowLeft, TrendingUp } from "lucide-react";

const ProgressPage = async ({ params }: UserDetailsPageParams) => {
  const user = await getUserById(params.userId);
  const progressEntries = await getProgressByUserId(params.userId);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-20">
        <h1 className="text-xl md:text-3xl font-semibold text-center">
          Korisnik ne postoji ili je obrisan.
        </h1>
        <Button asChild>
          <Link href="/admin/users">Vrati se na listu klijenata</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/users">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Nazad
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-gold/20 to-gold/10 rounded-lg">
                <TrendingUp className="w-8 h-8 text-gold" />
              </div>
              Napredak Klijenta
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {user.first_name} {user.last_name} ({user.email})
            </p>
          </div>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/admin/users/${params.userId}`}>
            📁 Detalji Klijenta
          </Link>
        </Button>
      </div>

      {/* Progress View */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 p-6">
        <AdminProgressView
          userId={params.userId}
          progressEntries={progressEntries || []}
        />
      </div>
    </div>
  );
};

export default ProgressPage;

