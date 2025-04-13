"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { createVideoExercise } from "@/lib/actions/exerciseVideo.actions";

const videoSchema = z.object({
  name: z.string().min(2, "Naziv mora imati bar 2 karaktera"),
  url: z
    .string()
    .url("Unesite validan URL")
    .refine(
      (val) =>
        val.includes("youtube.com/watch?v=") || val.includes("youtu.be/"),
      {
        message: "Unesite validan YouTube link",
      }
    ),
});

type VideoFormType = z.infer<typeof videoSchema>;

const VideoAddModal = () => {
  const [open, setOpen] = useState(false);

  const methods = useForm<VideoFormType>({
    resolver: zodResolver(videoSchema),
  });

  const onSubmit = async (data: VideoFormType) => {
    console.log("📹 Video dodat:", data);
    setOpen(false);
    await createVideoExercise(data);
  };

  return (
    <FormProvider {...methods}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="gold">Dodaj Video</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dodaj novi video</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={methods.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm font-medium">Naziv videa</label>
                  <FormControl>
                    <Input placeholder="Npr. Čučanj sa šipkom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm font-medium">Video URL</label>
                  <FormControl>
                    <Input placeholder="https://youtube.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end gap-3 pt-4">
              <DialogClose asChild>
                <Button variant="outline">Otkaži</Button>
              </DialogClose>
              <Button type="submit" variant="gold">
                Sačuvaj
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};

export default VideoAddModal;
