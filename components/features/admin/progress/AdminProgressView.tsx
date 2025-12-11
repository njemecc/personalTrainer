"use client";

import { ProgressEntry } from "@/types/progress";
import { format } from "date-fns";
import { sr } from "date-fns/locale";
import ProgressCharts from "@/components/features/progress/ProgressCharts";
import { TrendingUp, Weight, Ruler, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface AdminProgressViewProps {
  userId: string;
  progressEntries: ProgressEntry[];
}

export default function AdminProgressView({
  userId,
  progressEntries,
}: AdminProgressViewProps) {
  if (progressEntries.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          Klijent još nije uneo podatke o napretku.
        </p>
      </div>
    );
  }

  // Sortiraj po datumu
  const sortedEntries = [...progressEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const latestEntry = sortedEntries[0];

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {latestEntry?.weight && (
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-2">
              <Weight className="w-6 h-6 text-blue-500" />
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Trenutna težina
              </p>
            </div>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {latestEntry.weight} kg
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {format(new Date(latestEntry.date), "PPP", { locale: sr })}
            </p>
          </div>
        )}

        {latestEntry?.measurements?.waist && (
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-2">
              <Ruler className="w-6 h-6 text-purple-500" />
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Obim struka
              </p>
            </div>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {latestEntry.measurements.waist} cm
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {format(new Date(latestEntry.date), "PPP", { locale: sr })}
            </p>
          </div>
        )}

        <div className="bg-gradient-to-br from-gold/10 to-amber-500/5 rounded-xl p-6 border border-gold/20">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-gold" />
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Ukupno unosa
            </p>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            {progressEntries.length}
          </p>
        </div>

        {sortedEntries.filter((e) => e.photos && e.photos.length > 0).length > 0 && (
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl p-6 border border-green-500/20">
            <div className="flex items-center gap-3 mb-2">
              <ImageIcon className="w-6 h-6 text-green-500" />
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Unosa sa slikama
              </p>
            </div>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {
                sortedEntries.filter((e) => e.photos && e.photos.length > 0)
                  .length
              }
            </p>
          </div>
        )}
      </div>

      {/* Charts */}
      <ProgressCharts progressEntries={progressEntries} />

      {/* Latest Entries */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Poslednji Unosi
        </h3>
        <div className="space-y-4">
          {sortedEntries.slice(0, 5).map((entry) => (
            <div
              key={entry._id}
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {format(new Date(entry.date), "PPP", { locale: sr })}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(entry.createdAt), "PPp", { locale: sr })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Težina i merenja */}
                <div className="space-y-3">
                  {entry.weight && (
                    <div className="flex items-center gap-2">
                      <Weight className="w-5 h-5 text-gold" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Težina:
                      </span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {entry.weight} kg
                      </span>
                    </div>
                  )}

                  {entry.measurements && (
                    <div className="space-y-2">
                      <Ruler className="w-5 h-5 text-gold" />
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {entry.measurements.chest && (
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">
                              Grudi:{" "}
                            </span>
                            <span className="font-semibold">
                              {entry.measurements.chest} cm
                            </span>
                          </div>
                        )}
                        {entry.measurements.waist && (
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">
                              Struk:{" "}
                            </span>
                            <span className="font-semibold">
                              {entry.measurements.waist} cm
                            </span>
                          </div>
                        )}
                        {entry.measurements.hips && (
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">
                              Kukovi:{" "}
                            </span>
                            <span className="font-semibold">
                              {entry.measurements.hips} cm
                            </span>
                          </div>
                        )}
                        {entry.measurements.arm && (
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">
                              Ruka:{" "}
                            </span>
                            <span className="font-semibold">
                              {entry.measurements.arm} cm
                            </span>
                          </div>
                        )}
                        {entry.measurements.thigh && (
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">
                              Butina:{" "}
                            </span>
                            <span className="font-semibold">
                              {entry.measurements.thigh} cm
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Slike i napomene */}
                <div className="space-y-3">
                  {entry.photos && entry.photos.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Slike:
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {entry.photos.map((photo, index) => (
                          <div key={index} className="relative group">
                            <Image
                              src={photo.url}
                              alt={`Progress photo ${index + 1}`}
                              width={100}
                              height={100}
                              className="rounded-lg object-cover w-full h-24 border border-gray-300 dark:border-gray-600"
                            />
                            <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {photo.type}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {entry.notes && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Napomene:
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-3 rounded-lg">
                        {entry.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

