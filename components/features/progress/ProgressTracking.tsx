"use client";

import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import {
  createProgress,
  getProgressByUserId,
  deleteProgress,
  type CreateProgressParams,
} from "@/lib/actions/progress.actions";
import { ProgressEntry } from "@/types/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  Plus,
  Trash2,
  TrendingUp,
  Weight,
  Ruler,
} from "lucide-react";
import { format } from "date-fns";
import { sr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import ProgressCharts from "./ProgressCharts";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";

interface ProgressTrackingProps {
  userId: string;
}

export default function ProgressTracking({ userId }: ProgressTrackingProps) {
  const { user } = useUser();
  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [formData, setFormData] = useState<CreateProgressParams>({
    userId,
    weight: undefined,
    measurements: {},
    photos: [],
    notes: "",
  });
  const [uploadedPhotos, setUploadedPhotos] = useState<
    Array<{ url: string; type: "front" | "side" | "back" | "other" }>
  >([]);
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);
  const uploadButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadProgress();
  }, [userId]);

  // Promena teksta na dugmetu za upload
  useEffect(() => {
    if (uploadButtonRef.current) {
      const button = uploadButtonRef.current.querySelector(
        '[data-ut-element="button"]'
      ) as HTMLElement;
      if (button) {
        // Sakrij originalni tekst
        const spans = button.querySelectorAll("span");
        spans.forEach((span) => {
          span.style.display = "none";
          span.style.visibility = "hidden";
          span.style.opacity = "0";
        });

        // Dodaj srpski tekst ako već ne postoji
        if (!button.querySelector(".custom-upload-text")) {
          const customText = document.createElement("span");
          customText.className = "custom-upload-text";
          customText.textContent = "Izaberi Slike";
          customText.style.color = "#000";
          customText.style.fontWeight = "600";
          customText.style.position = "absolute";
          customText.style.left = "50%";
          customText.style.top = "50%";
          customText.style.transform = "translate(-50%, -50%)";
          customText.style.pointerEvents = "none";
          customText.style.zIndex = "10";
          button.style.position = "relative";
          button.appendChild(customText);

          // Hover efekat - zlatna boja
          button.addEventListener("mouseenter", () => {
            customText.style.color = "#D4AF37";
          });
          button.addEventListener("mouseleave", () => {
            customText.style.color = "#000";
          });
        }
      }
    }
  }, [showForm]);

  const loadProgress = async () => {
    try {
      setIsLoading(true);
      const data = await getProgressByUserId(userId);
      setProgressEntries(data || []);
    } catch (error) {
      console.error("Greška pri učitavanju napretka:", error);
      toast({
        variant: "destructive",
        title: "Greška",
        description: "Nije moguće učitati podatke o napretku.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createProgress({
        ...formData,
        userId,
        date: selectedDate,
        photos: uploadedPhotos,
      });

      toast({
        title: "Uspešno!",
        description: "Podaci o napretku su sačuvani.",
      });

      // Reset form
      setFormData({
        userId,
        weight: undefined,
        measurements: {},
        photos: [],
        notes: "",
      });
      setUploadedPhotos([]);
      setSelectedDate(new Date());
      setShowForm(false);

      // Reload progress
      await loadProgress();
    } catch (error) {
      console.error("Greška pri čuvanju napretka:", error);
      toast({
        variant: "destructive",
        title: "Greška",
        description: "Nije moguće sačuvati podatke o napretku.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (entryId: string) => {
    if (!confirm("Da li ste sigurni da želite da obrišete ovaj unos?")) {
      return;
    }

    try {
      await deleteProgress(entryId);
      toast({
        title: "Uspešno!",
        description: "Unos je obrisan.",
      });
      await loadProgress();
    } catch (error) {
      console.error("Greška pri brisanju:", error);
      toast({
        variant: "destructive",
        title: "Greška",
        description: "Nije moguće obrisati unos.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Praćenje Napretka
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Unesite svoju težinu, merenja i slike da biste pratili svoj napredak
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gold hover:bg-gold/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          {showForm ? "Otkaži" : "Novi Unos"}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Datum */}
            <div>
              <Label className="text-gray-700 dark:text-gray-300 mb-2 block">
                Datum
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP", { locale: sr })
                    ) : (
                      <span>Izaberi datum</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Težina */}
            <div>
              <Label
                htmlFor="weight"
                className="text-gray-700 dark:text-gray-300 mb-2 block"
              >
                <Weight className="w-4 h-4 inline mr-2" />
                Težina (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="npr. 75.5"
                value={formData.weight || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    weight: e.target.value
                      ? parseFloat(e.target.value)
                      : undefined,
                  })
                }
                className="bg-white dark:bg-gray-800"
              />
            </div>

            {/* Merenja */}
            <div className="md:col-span-2">
              <Label className="text-gray-700 dark:text-gray-300 mb-3 block">
                <Ruler className="w-4 h-4 inline mr-2" />
                Merenja (cm)
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <Label
                    htmlFor="chest"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Grudi
                  </Label>
                  <Input
                    id="chest"
                    type="number"
                    step="0.1"
                    placeholder="cm"
                    value={formData.measurements?.chest || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        measurements: {
                          ...formData.measurements,
                          chest: e.target.value
                            ? parseFloat(e.target.value)
                            : undefined,
                        },
                      })
                    }
                    className="bg-white dark:bg-gray-800"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="waist"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Struk
                  </Label>
                  <Input
                    id="waist"
                    type="number"
                    step="0.1"
                    placeholder="cm"
                    value={formData.measurements?.waist || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        measurements: {
                          ...formData.measurements,
                          waist: e.target.value
                            ? parseFloat(e.target.value)
                            : undefined,
                        },
                      })
                    }
                    className="bg-white dark:bg-gray-800"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="hips"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Kukovi
                  </Label>
                  <Input
                    id="hips"
                    type="number"
                    step="0.1"
                    placeholder="cm"
                    value={formData.measurements?.hips || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        measurements: {
                          ...formData.measurements,
                          hips: e.target.value
                            ? parseFloat(e.target.value)
                            : undefined,
                        },
                      })
                    }
                    className="bg-white dark:bg-gray-800"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="arm"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Ruka
                  </Label>
                  <Input
                    id="arm"
                    type="number"
                    step="0.1"
                    placeholder="cm"
                    value={formData.measurements?.arm || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        measurements: {
                          ...formData.measurements,
                          arm: e.target.value
                            ? parseFloat(e.target.value)
                            : undefined,
                        },
                      })
                    }
                    className="bg-white dark:bg-gray-800"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="thigh"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Butina
                  </Label>
                  <Input
                    id="thigh"
                    type="number"
                    step="0.1"
                    placeholder="cm"
                    value={formData.measurements?.thigh || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        measurements: {
                          ...formData.measurements,
                          thigh: e.target.value
                            ? parseFloat(e.target.value)
                            : undefined,
                        },
                      })
                    }
                    className="bg-white dark:bg-gray-800"
                  />
                </div>
              </div>
            </div>

            {/* Upload slika */}
            <div className="md:col-span-2">
              <Label className="text-gray-700 dark:text-gray-300 mb-3 block">
                Slike Napretka
              </Label>
              <div className="space-y-4">
                <div className="relative" ref={uploadButtonRef}>
                  <UploadButton<OurFileRouter, "progressPhotoUploader">
                    endpoint="progressPhotoUploader"
                    onBeforeUploadBegin={(files) => {
                      setIsUploadingPhotos(true);
                      return files;
                    }}
                    onClientUploadComplete={(res) => {
                      setIsUploadingPhotos(false);
                      if (res && res.length > 0) {
                        const newPhotos = res.map((file) => ({
                          url: file.ufsUrl || file.url,
                          type: "front" as const,
                        }));
                        setUploadedPhotos([...uploadedPhotos, ...newPhotos]);
                        toast({
                          title: "Uspešno!",
                          description: "Slike su uspešno učitane.",
                        });
                      }
                    }}
                    onUploadError={(error) => {
                      setIsUploadingPhotos(false);
                      toast({
                        variant: "destructive",
                        title: "Greška",
                        description: "Nije moguće učitati slike.",
                      });
                    }}
                    className="ut-button:bg-gradient-to-r ut-button:from-gray-800 ut-button:to-gray-900 ut-button:hover:from-gray-700 ut-button:hover:to-gray-800 ut-button:px-6 ut-button:py-3 ut-button:rounded-lg ut-button:font-semibold ut-button:shadow-lg ut-button:hover:shadow-xl ut-button:transition-all ut-button:duration-300 ut-button:border ut-button:border-gray-700 ut-allowed-content:text-gray-600 dark:ut-allowed-content:text-gray-400 ut-allowed-content:text-sm ut-allowed-content:mt-2 progress-upload-button"
                  />

                  {isUploadingPhotos && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className="flex flex-col items-center gap-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-2xl border border-gold/30">
                        {/* Moderni spinner sa gradijentnim efektom */}
                        <div className="relative">
                          {/* Glavni spinner */}
                          <div className="relative w-16 h-16">
                            <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gold border-r-gold animate-spin"></div>
                            {/* Gradijentni efekat */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-transparent animate-pulse"></div>
                            {/* Centar sa pulsiranjem */}
                            <div className="absolute inset-4 rounded-full bg-gold/10 animate-ping"></div>
                          </div>

                          {/* Rotirajuće tačkice oko spinnera */}
                          <div
                            className="absolute inset-0 animate-spin"
                            style={{ animationDuration: "3s" }}
                          >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gold rounded-full"></div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gold/60 rounded-full"></div>
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-gold/40 rounded-full"></div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-gold/80 rounded-full"></div>
                          </div>
                        </div>

                        {/* Tekst sa animacijom */}
                        <div className="flex flex-col items-center gap-2">
                          <p className="text-gray-800 dark:text-gray-200 text-lg font-bold text-center">
                            Učitavanje slika...
                          </p>
                          {/* Progress bar animacija */}
                          <div className="w-48 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-gold via-amber-400 to-gold rounded-full animate-progress"
                              style={{
                                width: "100%",
                                animation: "progress 2s ease-in-out infinite",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {uploadedPhotos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {uploadedPhotos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={photo.url}
                          alt={`Progress photo ${index + 1}`}
                          width={200}
                          height={200}
                          className="rounded-lg object-cover w-full h-32"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => {
                            setUploadedPhotos(
                              uploadedPhotos.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Napomene */}
            <div className="md:col-span-2">
              <Label
                htmlFor="notes"
                className="text-gray-700 dark:text-gray-300 mb-2 block"
              >
                Napomene
              </Label>
              <Textarea
                id="notes"
                placeholder="Dodatne napomene o napretku..."
                value={formData.notes || ""}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="bg-white dark:bg-gray-800 min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowForm(false);
                setFormData({
                  userId,
                  weight: undefined,
                  measurements: {},
                  photos: [],
                  notes: "",
                });
                setUploadedPhotos([]);
              }}
            >
              Otkaži
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gold hover:bg-gold/90"
            >
              {isSubmitting ? "Čuvanje..." : "Sačuvaj"}
            </Button>
          </div>
        </form>
      )}

      {/* Charts */}
      {progressEntries.length > 0 && (
        <ProgressCharts progressEntries={progressEntries} />
      )}

      {/* Progress Entries List */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Istorija Unosa
        </h3>
        {progressEntries.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Još nema unosa. Klikni na "Novi Unos" da počneš da pratiš svoj
              napredak!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {progressEntries.map((entry) => (
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(entry._id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
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
                        <Label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
                          Slike:
                        </Label>
                        <div className="grid grid-cols-3 gap-2">
                          {entry.photos.map((photo, index) => (
                            <div key={index} className="relative">
                              <Image
                                src={photo.url}
                                alt={`Progress photo ${index + 1}`}
                                width={100}
                                height={100}
                                className="rounded-lg object-cover w-full h-24 border border-gray-300 dark:border-gray-600"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {entry.notes && (
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
                          Napomene:
                        </Label>
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
        )}
      </div>
    </div>
  );
}
