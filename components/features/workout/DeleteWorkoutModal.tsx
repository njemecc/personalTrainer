"use client"

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

const DeleteWorkoutModal = ({
  name,
  id,
  userId,
}: {
  name: string;
  id: string;
  userId: string;
}) => {


  const router = useRouter();

  const deleteExercise = async () => {
    await deleteSingleExercise(id,userId);
    window.location.reload()
    //  router.refresh();
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
          <DialogTitle>Obriši vezbu {name}</DialogTitle>
          <DialogDescription>
            Da li si siguran jer ce video vezba biti trajno obrisana za ovog
            klijenta?
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

export default DeleteWorkoutModal;
