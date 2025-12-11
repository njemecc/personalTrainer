"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  UserCheck,
  UserX,
  ClipboardList,
  Dumbbell,
  Utensils,
  TrendingUp,
} from "lucide-react";

interface DashboardStatsProps {
  statistics: {
    overview: {
      totalUsers: number;
      activeUsers: number;
      inactiveUsers: number;
      totalSurveys: number;
      totalWorkoutPlans: number;
      usersWithNutritionPlans: number;
      totalNutritionPlans: number;
      avgVisina: number;
      avgTezina: number;
    };
    registrationsByMonth: Array<{ month: string; count: number }>;
    nutritionPlansByMonth: Array<{ month: string; count: number }>;
    surveyStats: {
      tipOsobe: Array<{ _id: string; count: number }>;
      radniStatus: Array<{ _id: string; count: number }>;
      ranijeTrenirali: Array<{ _id: string; count: number }>;
    };
  };
}

const COLORS = [
  "#D4AF37", // Gold
  "#667eea", // Purple
  "#764ba2", // Dark Purple
  "#f093fb", // Pink
  "#4facfe", // Blue
  "#43e97b", // Green
  "#fa709a", // Rose
  "#fee140", // Yellow
];

export default function DashboardStats({ statistics }: DashboardStatsProps) {
  const { overview, registrationsByMonth, nutritionPlansByMonth, surveyStats } =
    statistics;

  // Priprema podataka za pie chart - aktivni vs neaktivni
  const activeStatusData = [
    { name: "Aktivni", value: overview.activeUsers },
    { name: "Neaktivni", value: overview.inactiveUsers },
  ];

  // Priprema podataka za tip osobe
  const tipOsobeData = surveyStats.tipOsobe.map((item) => ({
    name: item._id || "Nije unet",
    value: item.count,
  }));

  // Priprema podataka za radni status
  const radniStatusData = surveyStats.radniStatus.map((item) => ({
    name: item._id || "Nije unet",
    value: item.count,
  }));

  // Priprema podataka za ranije trenirali
  const ranijeTreniraliData = surveyStats.ranijeTrenirali.map((item) => ({
    name: item._id || "Nije unet",
    value: item.count,
  }));

  const statCards = [
    {
      title: "Ukupno Klijenata",
      value: overview.totalUsers,
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      title: "Aktivni Klijenti",
      value: overview.activeUsers,
      icon: UserCheck,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      title: "Neaktivni Klijenti",
      value: overview.inactiveUsers,
      icon: UserX,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
    },
    {
      title: "Popunjene Ankete",
      value: overview.totalSurveys,
      icon: ClipboardList,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      title: "Trening Planovi",
      value: overview.totalWorkoutPlans,
      icon: Dumbbell,
      color: "text-gold",
      bgColor: "bg-gold/10",
    },
    {
      title: "Planovi Ishrane",
      value: overview.usersWithNutritionPlans,
      icon: Utensils,
      color: "text-amber-400",
      bgColor: "bg-amber-400/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="relative bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700/50 hover:border-gold/50 transition-all duration-300 hover:shadow-xl hover:shadow-gold/10 group overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-2 font-medium">
                    {stat.title}
                  </p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`${stat.bgColor} p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`${stat.color} w-7 h-7`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prosečne vrednosti */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-purple-900/30 via-gray-800 to-gray-900 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full" />
            Prosečne Vrednosti
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg backdrop-blur-sm">
              <span className="text-gray-300 font-medium">
                Prosečna visina:
              </span>
              <span className="text-white font-bold text-lg bg-gradient-to-r from-purple-300 to-purple-100 bg-clip-text text-transparent">
                {overview.avgVisina
                  ? `${overview.avgVisina.toFixed(1)} cm`
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg backdrop-blur-sm">
              <span className="text-gray-300 font-medium">
                Prosečna težina:
              </span>
              <span className="text-white font-bold text-lg bg-gradient-to-r from-purple-300 to-purple-100 bg-clip-text text-transparent">
                {overview.avgTezina
                  ? `${overview.avgTezina.toFixed(1)} kg`
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/30 via-gray-800 to-gray-900 rounded-xl p-6 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full" />
            Pokrivenost Planovima
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg backdrop-blur-sm">
              <span className="text-gray-300 font-medium">
                Klijenti sa planom ishrane:
              </span>
              <span className="text-white font-bold text-lg bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent">
                {overview.usersWithNutritionPlans} / {overview.totalUsers}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg backdrop-blur-sm">
              <span className="text-gray-300 font-medium">
                Klijenti sa trening planom:
              </span>
              <span className="text-white font-bold text-lg bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent">
                {overview.totalWorkoutPlans} / {overview.totalUsers}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grafikon - Registracije po mesecima */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700/50 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-gold/20 to-gold/10 rounded-lg">
            <TrendingUp className="w-6 h-6 text-gold" />
          </div>
          Registracije po Mesecima (Poslednjih 6 meseci)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={registrationsByMonth}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#4B5563"
              opacity={0.3}
            />
            <XAxis
              dataKey="month"
              stroke="#9CA3AF"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            />
            <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #D4AF37",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(212, 175, 55, 0.2)",
              }}
              labelStyle={{ color: "#D4AF37", fontWeight: "bold" }}
            />
            <Legend wrapperStyle={{ color: "#9CA3AF" }} />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#D4AF37"
              strokeWidth={3}
              name="Broj registracija"
              dot={{ fill: "#D4AF37", r: 5 }}
              activeDot={{ r: 7, fill: "#D4AF37" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Grafikon - Planovi ishrane po mesecima */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700/50 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-amber-500/20 to-amber-500/10 rounded-lg">
            <Utensils className="w-6 h-6 text-amber-400" />
          </div>
          Dodeljeni Planovi Ishrane po Mesecima
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={nutritionPlansByMonth}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#4B5563"
              opacity={0.3}
            />
            <XAxis
              dataKey="month"
              stroke="#9CA3AF"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            />
            <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #F59E0B",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(245, 158, 11, 0.2)",
              }}
              labelStyle={{ color: "#F59E0B", fontWeight: "bold" }}
            />
            <Legend wrapperStyle={{ color: "#9CA3AF" }} />
            <Bar
              dataKey="count"
              fill="url(#colorGradient)"
              name="Broj planova"
              radius={[8, 8, 0, 0]}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity={1} />
                <stop offset="100%" stopColor="#D97706" stopOpacity={1} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Charts - Statistike iz anketa */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tip osobe */}
        <div className="bg-gradient-to-br from-blue-900/30 via-gray-800 to-gray-900 rounded-xl p-6 border border-blue-500/20 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
            Tip Osobe
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={tipOsobeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                }
                outerRadius={85}
                fill="#8884d8"
                dataKey="value"
                stroke="#1F2937"
                strokeWidth={2}
              >
                {tipOsobeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #3B82F6",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)",
                }}
                labelStyle={{ color: "#3B82F6", fontWeight: "bold" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Radni status */}
        <div className="bg-gradient-to-br from-green-900/30 via-gray-800 to-gray-900 rounded-xl p-6 border border-green-500/20 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-green-400 to-green-600 rounded-full" />
            Radni Status
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={radniStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                }
                outerRadius={85}
                fill="#8884d8"
                dataKey="value"
                stroke="#1F2937"
                strokeWidth={2}
              >
                {radniStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #10B981",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(16, 185, 129, 0.2)",
                }}
                labelStyle={{ color: "#10B981", fontWeight: "bold" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Ranije trenirali */}
        <div className="bg-gradient-to-br from-pink-900/30 via-gray-800 to-gray-900 rounded-xl p-6 border border-pink-500/20 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-pink-400 to-pink-600 rounded-full" />
            Ranije Trenirali
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={ranijeTreniraliData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                }
                outerRadius={85}
                fill="#8884d8"
                dataKey="value"
                stroke="#1F2937"
                strokeWidth={2}
              >
                {ranijeTreniraliData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #EC4899",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(236, 72, 153, 0.2)",
                }}
                labelStyle={{ color: "#EC4899", fontWeight: "bold" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Aktivni vs Neaktivni */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700/50 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-red-500/20 rounded-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          Status Klijenata
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={activeStatusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
              }
              outerRadius={110}
              fill="#8884d8"
              dataKey="value"
              stroke="#1F2937"
              strokeWidth={3}
            >
              {activeStatusData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? "#10B981" : "#EF4444"}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #D4AF37",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(212, 175, 55, 0.2)",
              }}
              labelStyle={{ color: "#D4AF37", fontWeight: "bold" }}
            />
            <Legend wrapperStyle={{ color: "#9CA3AF" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
