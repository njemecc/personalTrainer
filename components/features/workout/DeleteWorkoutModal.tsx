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

const DeleteWorkoutModal = ({ name, id }: { name: string; id: string }) => {
  const deleteExercise = async () => {
    await deleteSingleExercise(id);
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
          <Button onClick={deleteExercise} variant="destructive">
            Obriši
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWorkoutModal;
