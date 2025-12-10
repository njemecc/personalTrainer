import { getDashboardStatistics } from "@/lib/actions/statistics.actions";
import DashboardStats from "@/components/features/admin/dashboard/DashboardStats";

const DashboardPage = async () => {
  const statistics = await getDashboardStatistics();

  return (
    <div className="w-full p-6 space-y-6 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-gold/20 to-gold/10 rounded-xl border border-gold/30">
            <svg
              className="w-8 h-8 text-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Dashboard <span className="bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">Statistika</span>
            </h1>
            <p className="text-gray-400 mt-2">
              Pregled svih važnih metrika i statistika vašeg personalnog trenerskog biznisa
            </p>
          </div>
        </div>
      </div>

      <DashboardStats statistics={statistics} />
    </div>
  );
};

export default DashboardPage;

