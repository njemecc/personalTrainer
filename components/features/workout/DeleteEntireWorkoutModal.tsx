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

import { DialogClose } from "@radix-ui/react-dialog";
import { deleteWorkoutPlan } from "@/lib/actions/workoutplan.actions";
import { toast } from "@/components/ui/use-toast";

const DeleteEntireWorkoutModal = ({
  name,
  id,
  userId,
}: {
  name: string;
  id: string;
  userId: string;
}) => {

    const deleteWorkout = async () => {
        const response = await deleteWorkoutPlan(userId, id);
      
        if (response == null) {
          toast({
            title: "Greška",
            description: "Došlo je do greške prilikom brisanja treninga.",
            variant: "destructive",
          });
          return;
        }
      
        toast({
          title: "Uspešno obrisano",
          description: `Trening "${name}" je uspešno obrisan.`,
        });


      };
      
    
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="md:w-1/6" variant="destructive">
          Obriši Trening
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Obriši trening: {name}</DialogTitle>
          <DialogDescription>
            Da li si siguran jer će ovaj trening biti trajno obrisan za ovog
            klijenta?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button onClick={deleteWorkout} variant="destructive">
              Obriši
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEntireWorkoutModal;
