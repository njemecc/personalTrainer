"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ProgressEntry } from "@/types/progress";
import { format } from "date-fns";
import { sr } from "date-fns/locale";
import { TrendingUp, Weight, Ruler } from "lucide-react";

interface ProgressChartsProps {
  progressEntries: ProgressEntry[];
}

export default function ProgressCharts({ progressEntries }: ProgressChartsProps) {
  // Priprema podataka za grafike - sortirano po datumu
  const sortedEntries = [...progressEntries].sort(
    (a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Podaci za težinu
  const weightData = sortedEntries
    .filter((entry) => entry.weight)
    .map((entry) => ({
      date: format(new Date(entry.date), "dd.MM", { locale: sr }),
      fullDate: format(new Date(entry.date), "PPP", { locale: sr }),
      weight: entry.weight,
    }));

  // Podaci za merenja
  const measurementsData = sortedEntries
    .filter(
      (entry) =>
        entry.measurements &&
        (entry.measurements.chest ||
          entry.measurements.waist ||
          entry.measurements.hips ||
          entry.measurements.arm ||
          entry.measurements.thigh)
    )
    .map((entry) => ({
      date: format(new Date(entry.date), "dd.MM", { locale: sr }),
      fullDate: format(new Date(entry.date), "PPP", { locale: sr }),
      chest: entry.measurements?.chest,
      waist: entry.measurements?.waist,
      hips: entry.measurements?.hips,
      arm: entry.measurements?.arm,
      thigh: entry.measurements?.thigh,
    }));

  // Izračunaj promene
  const calculateChange = (current: number | undefined, previous: number | undefined) => {
    if (!current || !previous) return null;
    const change = current - previous;
    const percent = ((change / previous) * 100).toFixed(1);
    return { change, percent };
  };

  const latestEntry = sortedEntries[sortedEntries.length - 1];
  const previousEntry =
    sortedEntries.length > 1 ? sortedEntries[sortedEntries.length - 2] : null;

  const weightChange =
    latestEntry?.weight && previousEntry?.weight
      ? calculateChange(latestEntry.weight, previousEntry.weight)
      : null;

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {latestEntry?.weight && (
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-between mb-2">
              <Weight className="w-8 h-8 text-blue-500" />
              {weightChange && (
                <span
                  className={`text-sm font-semibold ${
                    weightChange.change < 0
                      ? "text-green-500"
                      : weightChange.change > 0
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {weightChange.change > 0 ? "+" : ""}
                  {weightChange.change.toFixed(1)} kg ({weightChange.percent}%)
                </span>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
              Trenutna težina
            </p>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              {latestEntry.weight} kg
            </p>
          </div>
        )}

        {latestEntry?.measurements?.waist && (
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-2">
              <Ruler className="w-8 h-8 text-purple-500" />
              {previousEntry?.measurements?.waist && (
                <span
                  className={`text-sm font-semibold ${
                    latestEntry.measurements.waist < previousEntry.measurements.waist
                      ? "text-green-500"
                      : latestEntry.measurements.waist > previousEntry.measurements.waist
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {latestEntry.measurements.waist < previousEntry.measurements.waist
                    ? "↓"
                    : latestEntry.measurements.waist > previousEntry.measurements.waist
                    ? "↑"
                    : "→"}{" "}
                  {Math.abs(
                    latestEntry.measurements.waist - previousEntry.measurements.waist
                  ).toFixed(1)} cm
                </span>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
              Obim struka
            </p>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              {latestEntry.measurements.waist} cm
            </p>
          </div>
        )}

        <div className="bg-gradient-to-br from-gold/10 to-amber-500/5 rounded-xl p-6 border border-gold/20">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-gold" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
            Ukupno unosa
          </p>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            {progressEntries.length}
          </p>
        </div>
      </div>

      {/* Weight Chart */}
      {weightData.length > 0 && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
            <Weight className="w-6 h-6 text-gold" />
            Grafik Težine
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" opacity={0.3} />
              <XAxis
                dataKey="date"
                stroke="#9CA3AF"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />
              <YAxis
                stroke="#9CA3AF"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                label={{
                  value: "Težina (kg)",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fill: "#9CA3AF" },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #D4AF37",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(212, 175, 55, 0.2)",
                }}
                labelStyle={{ color: "#D4AF37", fontWeight: "bold" }}
                formatter={(value: number) => [`${value} kg`, "Težina"]}
              />
              <Legend wrapperStyle={{ color: "#9CA3AF" }} />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#D4AF37"
                strokeWidth={3}
                name="Težina"
                dot={{ fill: "#D4AF37", r: 5 }}
                activeDot={{ r: 7, fill: "#D4AF37" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Measurements Chart */}
      {measurementsData.length > 0 && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
            <Ruler className="w-6 h-6 text-gold" />
            Grafik Merenja
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={measurementsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" opacity={0.3} />
              <XAxis
                dataKey="date"
                stroke="#9CA3AF"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />
              <YAxis
                stroke="#9CA3AF"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                label={{
                  value: "Obim (cm)",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fill: "#9CA3AF" },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #D4AF37",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(212, 175, 55, 0.2)",
                }}
                labelStyle={{ color: "#D4AF37", fontWeight: "bold" }}
                formatter={(value: number) => (value ? [`${value} cm`, ""] : null)}
              />
              <Legend wrapperStyle={{ color: "#9CA3AF" }} />
              {measurementsData.some((d) => d.chest) && (
                <Line
                  type="monotone"
                  dataKey="chest"
                  stroke="#667eea"
                  strokeWidth={2}
                  name="Grudi"
                  dot={{ fill: "#667eea", r: 4 }}
                />
              )}
              {measurementsData.some((d) => d.waist) && (
                <Line
                  type="monotone"
                  dataKey="waist"
                  stroke="#f093fb"
                  strokeWidth={2}
                  name="Struk"
                  dot={{ fill: "#f093fb", r: 4 }}
                />
              )}
              {measurementsData.some((d) => d.hips) && (
                <Line
                  type="monotone"
                  dataKey="hips"
                  stroke="#4facfe"
                  strokeWidth={2}
                  name="Kukovi"
                  dot={{ fill: "#4facfe", r: 4 }}
                />
              )}
              {measurementsData.some((d) => d.arm) && (
                <Line
                  type="monotone"
                  dataKey="arm"
                  stroke="#43e97b"
                  strokeWidth={2}
                  name="Ruka"
                  dot={{ fill: "#43e97b", r: 4 }}
                />
              )}
              {measurementsData.some((d) => d.thigh) && (
                <Line
                  type="monotone"
                  dataKey="thigh"
                  stroke="#fa709a"
                  strokeWidth={2}
                  name="Butina"
                  dot={{ fill: "#fa709a", r: 4 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

