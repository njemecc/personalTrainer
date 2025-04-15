"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteSingleExercise } from "@/lib/actions/exercise.actions";

import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { deleteVideoExercise } from "@/lib/actions/exerciseVideo.actions";

const DeleteVideoExerciseModal = ({
  id,
  name,
}: {
  name: string;
  id: string;
}) => {
  const router = useRouter();
  const deleteExercise = async () => {
    await deleteVideoExercise(id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="md:w-1/4" variant="destructive">
          Obriši video
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Obriši video: {name}</DialogTitle>
          <DialogDescription>
            Da li ste sigurni da želite da obrišete ovaj video iz baze podataka?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button onClick={deleteExercise} variant="destructive">
              Obriši
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteVideoExerciseModal;
